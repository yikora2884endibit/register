const t = require("ava");
const fs = require("fs-extra");
const path = require("path");

const domainsPath = path.resolve("domains");
const reservedPath = path.join(domainsPath, "reserved");
const files = fs.readdirSync(domainsPath);
const reservedFiles = fs.existsSync(reservedPath) ? fs.readdirSync(reservedPath) : [];

// Arrays to store issues for each test
const noParentIssues = [];
const nsRecordIssues = [];

// Helper function to check if a file exists in either domains or reserved directory
function findParentFile(parentFileName) {
    // Check in main domains directory
    if (files.includes(parentFileName)) {
        return path.join(domainsPath, parentFileName);
    }
    // Check in reserved directory
    if (reservedFiles.includes(parentFileName)) {
        return path.join(reservedPath, parentFileName);
    }
    return null;
}

t("Nested subdomains should not exist without a valid parent domain", (t) => {
    files.forEach((file) => {
        // Skip directories and process only .json files
        const filePath = path.join(domainsPath, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            return; // Skip directories
        }

        const subdomain = file.replace(/\.json$/, "");

        // Skip first-level subdomains (e.g., "banana.is-cool.dev")
        // First-level subdomains have no immediate parent to check
        if (subdomain.split(".").length > 3) {
            // Get the immediate parent domain (remove the first subdomain part)
            const parentSubdomain = subdomain.split(".").slice(-3).join(".");
            const parentFileName = `${parentSubdomain}.json`;

            // Check both domains and reserved directories
            const parentFilePath = findParentFile(parentFileName);
            if (!parentFilePath) {
                noParentIssues.push(`${file}: Parent domain ${parentFileName} does not exist`);
            }
        }
    });

    if (noParentIssues.length > 0) {
        t.fail("Issues found (no parent domain):\n" + noParentIssues.join("\n"));
    } else {
        t.pass();
    }
});

t("Nested subdomains should not exist if the parent domain has NS records", (t) => {
    files.forEach((file) => {
        // Skip directories and process only .json files
        const filePath = path.join(domainsPath, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            return; // Skip directories
        }

        const subdomain = file.replace(/\.json$/, "");

        // Skip first-level subdomains (e.g., "banana.is-cool.dev")
        // First-level subdomains have no immediate parent to check
        if (subdomain.split(".").length > 3) {
            // Get the immediate parent domain, by getting the last 3 parts.
            const parentSubdomain = subdomain.split(".").slice(-3).join(".");
            const parentFileName = `${parentSubdomain}.json`;

            // Check both domains and reserved directories
            const parentFilePath = findParentFile(parentFileName);
            
            // Check if the parent file exists before attempting to read it
            if (parentFilePath) {
                const parentDomain = fs.readJsonSync(parentFilePath);

                // Check if the parent has NS records
                if (parentDomain.record.NS !== undefined) {
                    nsRecordIssues.push(`${file}: Parent domain ${parentSubdomain} has NS records`);
                }
            } else {
                nsRecordIssues.push(`${parentFileName} file does not exist`);
            }
        }
    });

    if (nsRecordIssues.length > 0) {
        t.fail("Issues found (NS records):\n" + nsRecordIssues.join("\n"));
    } else {
        t.pass();
    }
});

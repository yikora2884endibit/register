const t = require("ava");
const fs = require("fs-extra");
const path = require("path");

const requiredRecordsToProxy = ["A", "AAAA", "CAA", "CNAME", "MX", "NS", "SRV"];

function validateProxiedRecords(t, data, file) {
    if (data.proxied) {
        const hasProxiedRecord = Object.keys(data.record || {}).some((key) => requiredRecordsToProxy.includes(key));
        t.true(hasProxiedRecord, `${file}: Proxied is true but there are no records that can be proxied`);
        return true;
    }
    return false;
}

const domainsPath = path.resolve("domains");
const reservedPath = path.join(domainsPath, "reserved");

// Helper function to get all JSON files from a directory
function getJsonFiles(dirPath) {
    if (!fs.existsSync(dirPath)) return [];
    return fs.readdirSync(dirPath)
        .filter(file => {
            const filePath = path.join(dirPath, file);
            return fs.lstatSync(filePath).isFile() && file.endsWith('.json');
        });
}

t("Domains with proxy enabled should have at least one record that can be proxied", (t) => {
    // Get files from both directories
    const mainFiles = getJsonFiles(domainsPath);
    const reservedFiles = getJsonFiles(reservedPath);
    
    let foundProxied = false;

    // Process main domain files
    mainFiles.forEach((file) => {
        const filePath = path.join(domainsPath, file);
        const domain = fs.readJsonSync(filePath);
        if (validateProxiedRecords(t, domain, file)) {
            foundProxied = true;
        }
    });

    // Process reserved domain files
    reservedFiles.forEach((file) => {
        const filePath = path.join(reservedPath, file);
        const domain = fs.readJsonSync(filePath);
        if (validateProxiedRecords(t, domain, file)) {
            foundProxied = true;
        }
    });

    // If no proxied domains were found, make a passing assertion
    if (!foundProxied) {
        t.pass("No domains with proxied=true found");
    }
});

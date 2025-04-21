# The Domains Project

<p align="center">
  <img src="media/promo.gif" alt="Demo" width="100%" />
</p>

<p align="center">Free subdomains for developers, personal sites, and open-source projects.</p>

## 🌐 Available Domains

We offer the following domain for registration:

| Domain | Description |
|--------|-------------|
| `*.owns.it.com` | For showcasing your projects and personal sites |

> **Note**: Wildcard subdomains (e.g., `*.example.owns.it.com`) are available but require detailed justification.

## 🚀 How to Register

1. **Fork & Star**: Start by forking and starring this repository
2. **Create Domain File**: Add a new file `your-subdomain.domain.json` in the `/domains` folder
3. **Configure Domain**: Use this template (customize as needed):

```json
{
    "description": "Brief project description",
    "domain": "owns.it.com",
    "subdomain": "your-subdomain",
    
    "owner": {
        "repo": "https://github.com/username/repo",
        "email": "your@email.com"
    },
    
    "record": {
        "A": ["1.1.1.1"],
        "AAAA": ["::1"],
        "CNAME": "your-domain.com",
        "TXT": ["verification=123"]
    },
    
    "proxied": false
}
```

4. **Submit PR**: Create a pull request with your changes
5. **Wait for Review**: We'll review and merge your request
6. **Domain Active**: Allow up to 24 hours for DNS propagation (typically 5-15 minutes)

## ⚙️ Domain Features

All our domains include:

- ✅ DNSSEC Protection
- ✅ Email Support
- ✅ Full SSL/TLS
- ✅ HTTPS Enforcement
- ✅ HSTS Security
- ✅ TLS 1.2+ Required
- ✅ WAF Protection
- ✅ Browser Integrity Checks

## 💝 Support Us

If you find this service valuable:

1. **Donate**: Support our infrastructure costs via [Stripe](https://donate.stripe.com/cN2eYpaDl4NR21qaEE)
2. **Join**: Connect with us on [Discord](https://discord.gg/kVjkg6VBwa)
3. **Share**: Star and share this project

> **Special Note**: NS records are available exclusively for donors.

## ⚠️ Important Notes

- Reserved subdomains (www, api, admin, etc.) are not available
- Domains used for illegal purposes will be permanently banned
- Check `utils/reserved-subdomains.json` for the reserved list

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="left">Looking for similar services? Check out <a href="https://free.hrsn.dev/#/?id=domains">Free For Life</a>.</p>
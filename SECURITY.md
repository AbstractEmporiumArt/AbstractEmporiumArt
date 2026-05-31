# Security Policy

## Supported Versions

We currently support the following version:

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

## Reporting a Vulnerability

We take the security of Abstract Emporium seriously. If you discover a security vulnerability, please follow these steps:

### 1. **Do NOT create a public GitHub issue**
Security vulnerabilities should be reported privately to protect our users.

### 2. **Email us directly**
Send details to: **abstractemporiumart@outlook.com**

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fixes (if available)

### 3. **What to expect**
- **Initial response**: Within 48 hours
- **Status update**: Within 5 business days
- **Resolution timeline**: Varies by severity (1-30 days)

### 4. **Responsible Disclosure**
We request that you:
- Give us reasonable time to fix the issue before public disclosure
- Do not exploit the vulnerability beyond proof-of-concept
- Do not access or modify user data without permission

## Security Measures

This project implements:
- ✅ **CodeQL Analysis** - Automated security scanning (weekly)
- ✅ **Gitleaks** - Secret detection in commits
- ✅ **Dependency Reviews** - Pull request security checks
- ✅ **NPM Audit** - Weekly vulnerability scans

## Scope

**In Scope:**
- Website code (abstractemporium.art)
- API endpoints
- GitHub Actions workflows
- Client-side JavaScript

**Out of Scope:**
- Third-party platforms (Ko-fi, Fine Art America, ArtPal, RedBubble, TheHug.art)
- Social media accounts (managed by respective platforms)
- Email service (Brevo/Sendinblue)

## Acknowledgments

We appreciate security researchers who help keep Abstract Emporium safe. Verified vulnerability reports will be acknowledged in our release notes (with your permission).

---

*Last Updated: May 31, 2026*

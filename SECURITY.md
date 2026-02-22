# Security Documentation

## Overview

This document outlines the comprehensive security measures implemented in websites.build to protect against common web vulnerabilities and attacks.

## Security Features Implemented

### 1. Input Validation & Sanitization

**Location:** `lib/validation.ts`

All user input is validated and sanitized before processing:

- **Email Validation**: RFC 5321 compliant, prevents email injection
- **Name Validation**: Allows only letters, spaces, hyphens, and apostrophes
- **Phone Validation**: International format support, digit count verification
- **Message Validation**: Length limits (10-5000 characters)
- **HTML Escaping**: All user input is escaped to prevent XSS attacks

**Protection Against:**
- Cross-Site Scripting (XSS)
- Email Header Injection
- Buffer Overflow attacks
- Malformed data

### 2. Rate Limiting

**Location:** `lib/rateLimit.ts`

Prevents spam and DOS attacks by limiting requests per IP address:

- **Contact Form**: 5 requests per hour
- **Project Form**: 3 requests per hour
- **General API**: 100 requests per 15 minutes
- **Read-Only**: 300 requests per 15 minutes

**Protection Against:**
- Denial of Service (DOS) attacks
- Spam submissions
- Brute force attacks
- Email flooding

### 3. Security Headers

**Location:** `middleware.ts`

Comprehensive HTTP security headers:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: [Strict CSP]
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000 (production only)
```

**Protection Against:**
- Clickjacking attacks
- MIME-type attacks
- Cross-Site Scripting (XSS)
- Information leakage
- Unauthorized feature access

### 4. CORS Configuration

**Location:** `middleware.ts`

Restricts API access to authorized domains only:

**Allowed Origins:**
- https://websitesbuild.in
- https://www.websitesbuild.in
- Vercel deployment URLs
- localhost:3000 (development only)

**Protection Against:**
- Cross-Origin Request Forgery (CSRF)
- Unauthorized third-party access
- API abuse

### 5. XSS Protection in Emails

**Location:** `lib/email.ts`

All user-generated content in emails is sanitized:

- HTML entity escaping
- Script tag neutralization
- Safe line break handling

**Protection Against:**
- Email-based XSS attacks
- Malicious code injection
- Social engineering attacks

### 6. Environment Variable Security

**Configuration:**
- `.env.local` in `.gitignore`
- Sensitive credentials never committed
- Vercel environment variables for production

**Protection Against:**
- Credential exposure
- API key leakage
- Configuration injection

## API Endpoints Security

### Contact Form API (`/api/contact`)

**Security Measures:**
1. Rate limiting (5 requests/hour)
2. Email validation (RFC 5321)
3. Name validation (2-100 characters, safe characters only)
4. Message validation (10-5000 characters)
5. XSS sanitization
6. HTML escaping

**Error Handling:**
- 400: Invalid input
- 429: Too many requests
- 500: Server error

### Project Form API (`/api/submit-form`)

**Security Measures:**
1. Stricter rate limiting (3 requests/hour)
2. Comprehensive field validation
3. Array input validation
4. XSS sanitization for all fields
5. Type checking for boolean fields

**Validated Fields:**
- Full Name, Email, Phone (required)
- Project Type (required)
- Business Name, Industry (optional)
- Features array (optional, each validated)
- Budget, Timeline (optional)
- Additional Info (optional, 2000 char limit)

## Testing

All security features have been tested:

✅ XSS Attack Prevention
- Script tags in name field: **BLOCKED**
- HTML injection in messages: **SANITIZED**

✅ Email Validation
- Invalid email formats: **REJECTED**
- Email injection attempts: **BLOCKED**

✅ Rate Limiting
- Excessive requests: **BLOCKED** (429 status)
- Clear error messages with retry time

✅ Input Validation
- Short messages (<10 chars): **REJECTED**
- Long inputs (>limits): **REJECTED**
- Special characters in names: **BLOCKED**

✅ Security Headers
- All headers properly set: **VERIFIED**
- CSP policy enforced: **ACTIVE**

## Security Best Practices

### For Developers

1. **Never bypass validation**: Always use validation utilities
2. **Trust no input**: Validate everything from users
3. **Use sanitized data**: Always use the `sanitized` values from validation
4. **Check rate limits**: Implement rate limiting for all user-facing endpoints
5. **Escape output**: Use `sanitizeForEmail()` for email templates
6. **Review dependencies**: Run `npm audit` regularly

### For Deployment

1. **Environment Variables**:
   - Set all SMTP credentials in Vercel
   - Never commit `.env.local`
   - Use strong passwords

2. **DNS Configuration**:
   - SPF record configured
   - DKIM enabled
   - DMARC policy active

3. **HTTPS Only**:
   - Enforced via Vercel
   - HSTS header in production

## Monitoring & Maintenance

### Regular Tasks

- [ ] Run `npm audit` weekly
- [ ] Update dependencies monthly
- [ ] Review rate limit logs
- [ ] Monitor failed validation attempts
- [ ] Check email delivery reports

### Security Logs

All security events are logged:
- Rate limit violations
- Validation failures
- Email sending errors
- Suspicious patterns

Check server logs for:
```
❌ Error sending contact form emails
🚫 Rate limit exceeded
⚠️  Invalid input detected
```

## Incident Response

If you detect a security issue:

1. **Immediate**: Block the attacking IP via rate limit
2. **Short-term**: Review and tighten validation rules
3. **Long-term**: Analyze attack pattern and update defenses

## Compliance

This implementation follows:
- OWASP Top 10 security guidelines
- RFC 5321 (Email)
- W3C Security recommendations
- GDPR data protection principles (minimal data collection)

## Contact

For security concerns:
- Email: info@websitesbuild.in
- Report via: Contact form (rate-limited for security)

---

**Last Updated**: January 2026
**Security Audit**: Passed ✅
**Vulnerability Status**: 0 known vulnerabilities

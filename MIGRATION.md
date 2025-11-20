# Migration to Static Site Hosting

## Decision
Converting Flask application to static site hosted on AWS S3 + CloudFront.

## Rationale
- CV website presentational (no dynamic backend needed)
- S3 + CloudFront provides excellent performance at minimal cost
- Static sites load faster via CDN caching
- Simplifies deployment and maintenance

## Architecture
**CloudFront (CDN)** → **S3 Bucket (Static HTML/CSS/JS)**

## Benefits
- **Cost**: €0.50/month (vs EC2 €8-12/month)
- **Performance**: Global CDN edge locations
- **Security**: HTTPS, DDoS protection, security headers
- **Scalability**: Handles traffic spikes automatically

## Implementation
Flask templates will be pre-rendered to static HTML during CI/CD pipeline using GitHub Actions.
EOF
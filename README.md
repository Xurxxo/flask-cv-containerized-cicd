# 🖥️ Flask Terminal CV - Interactive Portfolio

A modern, terminal-style web portfolio built with Flask and deployed as a static site on AWS. Features a unique CLI aesthetic with animated terminal interactions, dynamic content rendering, and professional presentation.

## 🌐 Live Site

**Visit:** [https://xurxo.cloud](https://xurxo.cloud)

---

## 📑 Table of Contents

- [Overview](#overview)
- [Architecture Evolution](#architecture-evolution)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Local Development](#local-development)
- [GitHub Actions CI/CD](#github-actions-cicd)
- [Deployment](#deployment)
- [Pages Overview](#pages-overview)
- [Troubleshooting](#troubleshooting)
- [Related Repository](#related-repository)
- [License](#license)

---

## 🎯 Overview

This project is a personal CV/portfolio presented as an interactive terminal interface, demonstrating proficiency in:

- **Full-stack web development** - Flask, Jinja2, HTML5, CSS3, JavaScript
- **Static site generation** - Flask → Static HTML for optimal performance
- **Cloud-native deployment** - AWS S3, CloudFront, Route 53
- **CI/CD automation** - GitHub Actions for automated deployments
- **DevOps practices** - Infrastructure as Code, automated workflows

**Key Achievement:** Successfully migrated from dynamic Flask app to static site architecture, reducing costs by ~95% while improving performance and scalability.

---

## 🏗️ Architecture Evolution

### Phase 1: Dockerized Flask on EC2 (Oct 2025 - Deprecated)
```
User → EC2 Instance → Docker Container → Flask App → Dynamic HTML
```

**Stack:**
- Flask application containerized with Docker
- Deployed to EC2 t2.micro instance
- Nginx reverse proxy
- Manual deployments via SSH

**Dockerfile:**
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

**Build and run locally (optional):**
```bash
docker build -t flask-cv .
docker run -p 5000:5000 flask-cv
# Visit: http://localhost:5000
```

**Challenges:**
- ❌ EC2 instance required 24/7 (~$10-20/month)
- ❌ Manual server maintenance
- ❌ No auto-scaling
- ❌ Single point of failure

**Result:** Migrated to static site architecture (see Phase 2)

### Phase 2: Static Site Generation (Current)
```
Developer → Flask (Local) → generate_static.py → Static HTML → S3 + CloudFront → User
```
- Flask serves as **development environment only**
- Static HTML generated from templates
- Deployed to S3 with CloudFront CDN
- No server-side compute required
- **Cost:** ~$1-2/month for storage + data transfer

**Why Static?**
- **95% cost reduction** - No EC2, only S3 storage
- **Better performance** - CDN caching, global edge locations
- **Auto-scaling** - CloudFront handles traffic spikes automatically- **Improved security** - No server-side attack surface
- **Simpler maintenance** - No server updates or patches

See [MIGRATION.md](./MIGRATION.md) for detailed rationale and cost comparison.

---

## ✨ Features

### 🎨 User Experience
- **Terminal aesthetic** - Authentic CLI interface with animated command sequences
- **Responsive design** - Optimized for desktop, tablet, and mobile
- **Interactive navigation** - Smooth page transitions and hover effects
- **Dynamic typing effects** - Realistic terminal command execution
- **Vim-style syntax highlighting** - Color-coded content for readability
- **Contact form** - Integrated with Formspree (50 free submissions/month)

### 🔧 Technical Features
- **Static site generation** - Flask templates compiled to static HTML
- **Automated CI/CD** - GitHub Actions deploys on every push to main
- **Custom domain** - xurxo.cloud with HTTPS via AWS Certificate Manager
- **Global CDN** - CloudFront distribution for worldwide performance
- **Security headers** - CSP (Content Security Policy), HSTS (HTTP Strict Transport Security), X-Frame-Options, X-Content-Type-Options
- **Budget monitoring** - AWS Budget alerts for cost control
- **CloudWatch metrics** - Request monitoring and error tracking

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic markup |
| CSS3 | Styling, animations, grid/flexbox |
| JavaScript (ES6+) | Terminal animations, form handling |
| Font Awesome | Icons | 6.4.0 |
| Google Fonts (Fira Mono) | Terminal-style typography |

### Backend (Development Only)
| Technology | Purpose | Version |
|------------|---------|---------|
| Python | Application runtime | 3.9+ |
| Flask | Web framework | 2.3+ |
| Jinja2 | Template engine | 3.1+ |
| Frozen-Flask | Static site generator | 1.0+ |

### DevOps & Cloud
| Service | Purpose |
|---------|---------|
| **GitHub Actions** | CI/CD automation |
| **AWS S3** | Static file hosting |
| **AWS CloudFront** | CDN for global distribution |
| **AWS Route 53** | DNS management (domain: xurxo.cloud) |
| **AWS Certificate Manager** | SSL/TLS certificates |
| **AWS CloudWatch** | Monitoring and logging |
| **AWS Budgets** | Cost alerts |
| **Terraform** | Infrastructure as Code (see [infra repo](https://github.com/Xurxxo/aws-terraform-flask-infrastructure)) |

### External Services
| Service | Purpose | Free Tier |
|---------|---------|-----------|
| **Formspree** | Contact form backend | 50 submissions/month |

## 🚀 Local Development

### Prerequisites

- **Python 3.9 or higher**
- **pip** (Python package manager)
- **virtualenv** (recommended for isolated environments)
- **Git**

### Initial Setup
```bash
# 1. Clone the repository
git clone https://github.com/Xurxxo/flask-cv-containerized-cicd.git
cd flask-cv-containerized-cicd

# 2. Create virtual environment
python3 -m venv venv

# 3. Activate virtual environment
source venv/bin/activate  # macOS/Linux
# venv\Scripts\activate   # Windows

# 4. Install dependencies
pip install -r requirements.txt

# 5. Run Flask development server
python app.py

# 6. Open browser
# Visit: http://127.0.0.1:5000
```

### Development Server

The Flask app runs on port 5000 by default:
```python
# app.py
if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

    **Features during development:**
    - Hot reload on file changes - changes in code reload the server automatically 
    - Debug mode with error pages
    - All routes accessible at `http://127.0.0.1:5000/`

### Available Routes

| Route | Template | Description |
|-------|----------|-------------|
| `/` | index.html | Home page with hero and projects |
| `/whoami` | whoami.html | Professional profile and background |
| `/ls` | ls.html | GitHub projects showcase |
| `/work` | work.html | Work experience timeline |
| `/studies` | studies.html | Education and certifications |
| `/man` | man.html | Contact form page |

---

## 🏗️ Static Site Generation

The static site generator (`generate_static.py`) converts Flask templates into standalone HTML files.

### How It Works
```python
# generate_static.py workflow:

1. Import Flask app
2. Create test client
3. Define routes to export
4. For each route:
   - Request the page
   - Get rendered HTML
   - Write to dist/ directory
5. Copy static assets (CSS, JS, images, PDFs)
6. Output summary
```

### Generator Script Breakdown
```python
from app import app
import os
import shutil

# Routes to generate
routes = ['/', '/whoami', '/ls', '/work', '/studies', '/man']

# Create dist directory
os.makedirs('dist', exist_ok=True)

# Generate HTML for each route
with app.test_client() as client:
    for route in routes:
        # Request the page
        response = client.get(route)
        
        # Determine output filename
        filename = 'index.html' if route == '/' else route.strip('/') + '.html'
        filepath = os.path.join('dist', filename)
        
        # Write HTML to file
        with open(filepath, 'wb') as f:
            f.write(response.data)
        
        print(f'✓ Generated {filename}')

# Copy static assets
if os.path.exists('static'):
    shutil.copytree('static', 'dist/static', dirs_exist_ok=True)
    print('✓ Copied static files')
```

### Running the Generator
```bash
# Ensure virtual environment is activated
source venv/bin/activate

# Run generator
python generate_static.py

# Expected output:
# ✓ Generated index.html
# ✓ Generated whoami.html
# ✓ Generated ls.html
# ✓ Generated work.html
# ✓ Generated studies.html
# ✓ Generated man.html
# ✓ Copied static files

# Verify output
ls -la dist/
```

---

## 🔄 GitHub Actions CI/CD

### Workflow File

Location: `.github/workflows/deploy.yml`
```yaml
name: Deploy to S3

on:
  push:
    branches:
      - main
  workflow_dispatch:

env:
  AWS_REGION: eu-central-1
  S3_BUCKET: flask-cv-static-site
  CLOUDFRONT_DISTRIBUTION_ID: E1UI2ORYQ3SFQO

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'
      
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
      
      - name: Generate static site
        run: python generate_static.py
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      
      - name: Deploy to S3
        run: |
          aws s3 sync dist/ s3://${{ env.S3_BUCKET }} --delete
      
      - name: Invalidate CloudFront cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ env.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
```

### Workflow Triggers

| Trigger | Description |
|---------|-------------|
| **Push to main** | Automatically deploys when code is merged |
| **workflow_dispatch** | Manual trigger from GitHub Actions UI |

### Pipeline Steps

1. **Checkout code** (30s)
   - Clones repository to GitHub runner
   - Uses `actions/checkout@v3`

2. **Set up Python** (15s)
   - Installs Python 3.9
   - Uses `actions/setup-python@v4`

3. **Install dependencies** (45s)
   - Upgrades pip
   - Installs requirements from `requirements.txt`
   - Creates virtual environment automatically

4. **Generate static site** (10s)
   - Runs `generate_static.py`
   - Creates `dist/` directory with all static files

5. **Configure AWS credentials** (5s)
   - Authenticates with AWS using secrets
   - Sets up AWS CLI environment

6. **Deploy to S3** (30s)
   - Syncs `dist/` to S3 bucket
   - `--delete` flag removes old files

7. **Invalidate CloudFront** (5s)
   - Clears CDN cache
   - Forces CloudFront to fetch updated files

**Total Duration:** ~2-3 minutes

### Required Secrets

Configure in **Settings → Secrets and variables → Actions**:

| Secret | Value | How to get |
|--------|-------|------------|
| `AWS_ACCESS_KEY_ID` | AKIA... | IAM user with S3 + CloudFront permissions |
| `AWS_SECRET_ACCESS_KEY` | Secret key | IAM user credentials |

**IAM Permissions Required:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::flask-cv-static-site",
        "arn:aws:s3:::flask-cv-static-site/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "*"
    }
  ]
}
```

### Monitoring Deployments

1. **GitHub Actions Tab**
   - View real-time logs
   - See each step's duration
   - Debug failures

2. **AWS S3**
   - Verify files uploaded
   - Check file timestamps

3. **AWS CloudFront**
   - Monitor invalidation status
   - View cache statistics

4. **Live Site**
   - Changes visible in 3-5 minutes
   - Test in incognito mode (bypass browser cache)

---

## 📦 Deployment

### Automated Deployment (Recommended)

Simply push to main branch:
```bash
# Make changes
git add .
git commit -m "feat: update portfolio content"
git push origin main

# GitHub Actions automatically:
# 1. Generates static site
# 2. Deploys to S3
# 3. Invalidates CloudFront cache
# 4. Site updated in ~3 minutes
```

### Manual Deployment

For testing or emergency deploys:
```bash
# 1. Activate virtual environment
source venv/bin/activate

# 2. Generate static site
python generate_static.py

# 3. Preview locally (optional)
cd dist && python -m http.server 8000
# Visit http://localhost:8000

# 4. Deploy to S3 (requires AWS CLI configured)
aws s3 sync dist/ s3://flask-cv-static-site --delete

# 5. Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id E1UI2ORYQ3SFQO \
  --paths "/*"

# 6. Wait 3-5 minutes for propagation
```

### AWS CLI Configuration
```bash
# Install AWS CLI
brew install awscli  # macOS

# Configure credentials
aws configure
# AWS Access Key ID: [Enter IAM key]
# AWS Secret Access Key: [Enter secret]
# Default region: eu-central-1
# Default output format: json

# Verify configuration
aws s3 ls s3://flask-cv-static-site
```

---

## 📄 Pages Overview

### Home (`/` → `index.html`)

**Sections:**
- **Hero** - Profile photo, name, title, social links
- **Terminal animation** - AWS CLI aesthetic with EC2 commands
- **Quick actions** - View Profile, View Projects buttons
- **Featured Projects** - Grid of 3 main GitHub repositories

**Key Features:**
- Gradient background with terminal green accents
- Font Awesome icons for social media
- Responsive project cards with hover effects
- Direct links to GitHub, LinkedIn, Credly, CV PDF

### Who Am I (`/whoami` → `whoami.html`)

**Content:**
- ▸ **Professional Background** - 
- ▸ **Cloud & DevOps Journey** - 
- ▸ **Technical Skills** - 
- ▸ **Values, People & Culture** - 
- ▸ **What I'm Looking For** -

### Projects (`/ls` → `ls.html`)

Format:
```
[PROJECT 1] project-name
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Description: [Description text]
Tech Stack: AWS
Repository: github.com/Xurxxo/repo-name
```

**Color Scheme (Vim-style):**
- Yellow: `[PROJECT N]`
- Cyan: Project name
- Gray: Labels (Description, Tech Stack)
- Blue: Technology keywords
- Green: Repository URLs

### Work History (`/work` → `work.html`)

**Positions:**

### Education (`/studies` → `studies.html`)

**Education:**

**Certifications:**

**Languages:**


### 📧 Contact (`/man` → `man.html`)

**Terminal Animation:**

**Contact Form:**
- Email input (required)
- Message textarea (required)
- Submit button with validation
- Success/error messages styled as terminal output

**Formspree Integration:**
```javascript
// static/js/contact.js
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('email', emailInput.value);
    formData.append('message', messageInput.value);
    
    const response = await fetch('https://formspree.io/f/mgvdylbk', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    });
    
    if (response.ok) {
        // Show success message
    }
});
```
---

## 🐛 Troubleshooting

### Issue: Changes not visible on live site

**Symptoms:** Site shows old content after deployment

**Solutions:**

1. **Clear CloudFront cache:**
```bash
aws cloudfront create-invalidation \
  --distribution-id E1UI2ORYQ3SFQO \
  --paths "/*"
```

2. **Wait 3-5 minutes** for propagation

3. **Test in incognito mode** (Cmd+Shift+N) to bypass browser cache

4. **Force refresh:** Cmd+Shift+R (macOS) or Ctrl+Shift+R (Windows)

5. **Check GitHub Actions:**
   - Go to Actions tab
   - Verify workflow completed successfully
   - Check for errors in logs

---

### Issue: CSS/JS not loading

**Symptoms:** Page displays but styling is broken

**Check:**

1. **Browser console** (Cmd+Option+I):
```
   Failed to load resource: net::ERR_BLOCKED_BY_CLIENT
```

2. **Verify files in S3:**
```bash
aws s3 ls s3://flask-cv-static-site/static/ --recursive
```

3. **Check CSP headers:**
   - Ensure CloudFront allows external resources
   - Verify Font Awesome, Google Fonts domains are allowed

4. **Regenerate site:**
```bash
python generate_static.py
aws s3 sync dist/ s3://flask-cv-static-site --delete
```

---

### Issue: Contact form not working

**Symptoms:** Form submission doesn't send email

**Solutions:**

1. **Check Formspree form ID** in `static/js/contact.js`:
```javascript
fetch('https://formspree.io/f/mgvdylbk', { ... })
```

2. **Verify in browser console:**
```javascript
// Should see successful POST request
POST https://formspree.io/f/mgvdylbk 200 OK
```

3. **Check Formspree dashboard:**
   - Login to Formspree
   - Verify submissions are being received
   - Check spam folder in email

4. **Test form locally:**
```bash
python app.py
# Submit form at http://127.0.0.1:5000/man
```

---

### Issue: GitHub Actions failing

**Symptoms:** Deployment workflow fails

**Common causes:**

1. **AWS credentials expired:**
   - Update secrets in repo settings
   - Verify IAM permissions

2. **Python dependencies error:**
```bash
# Fix: Update requirements.txt
pip freeze > requirements.txt
git add requirements.txt
git commit -m "fix: update dependencies"
```

3. **S3 bucket permissions:**
   - Check bucket policy allows uploads
   - Verify IAM role has S3 permissions

4. **CloudFront invalidation fails:**
   - Check distribution ID is correct
   - Verify IAM has `cloudfront:CreateInvalidation` permission

**Debug steps:**
```bash
# View workflow logs
# GitHub → Actions → Failed workflow → Click step to see logs

# Test locally
python generate_static.py
aws s3 sync dist/ s3://flask-cv-static-site --dry-run
```

---

### Issue: Site is slow

**Symptoms:** Pages take >3 seconds to load

**Solutions:**

1. **Check CloudFront cache hit rate:**
```bash
# In AWS Console: CloudFront → Distributions → Monitoring
# Target: >90% cache hit rate
```

2. **Optimize images:**
```bash
# Compress profile.jpg
# Target: <200KB
```

3. **Minify CSS/JS:**
```bash
# Install minifiers
npm install -g csso-cli uglify-js

# Minify
csso static/css/style.css -o static/css/style.min.css
uglifyjs static/js/contact.js -o static/js/contact.min.js
```

4. **Enable Brotli compression** in CloudFront (already enabled in Terraform)

---

### Issue: 404 errors

**Symptoms:** Some pages return 404 Not Found

**Solutions:**

1. **Check S3 bucket files:**
```bash
aws s3 ls s3://flask-cv-static-site/ --recursive
```

2. **Verify CloudFront origin:**
   - Origin should be S3 website endpoint, not bucket endpoint

3. **Check generated files:**
```bash
ls -la dist/
# Should see: index.html, whoami.html, ls.html, work.html, studies.html, man.html
```

4. **Regenerate site:**
```bash
python generate_static.py
```

---

## 🔗 Related Repository

### AWS Infrastructure

**Repository:** [aws-terraform-flask-infrastructure](https://github.com/Xurxxo/aws-terraform-flask-infrastructure)

This repository contains the complete AWS infrastructure provisioned with Terraform:

**Resources managed:**
- S3 bucket for static hosting
- CloudFront distribution with custom domain
- Route 53 hosted zone and DNS records
- ACM SSL certificate
- Security headers (CSP, HSTS, X-Frame-Options)
- CloudWatch alarms and dashboards
- AWS Budget alerts
- IAM roles and policies

**To deploy infrastructure:**
1. Clone the infra repository
2. Configure `terraform.tfvars`
3. Run `terraform init && terraform apply`
4. Infrastructure ready in ~10 minutes

See the [Infrastructure README](https://github.com/Xurxxo/aws-terraform-flask-infrastructure/blob/main/README.md) for detailed setup instructions.

---

## 📊 Project Metrics

### Performance (Lighthouse)
- **Performance Score:** 69/100 (Mobile)
- **Accessibility:** 100/100 ✅
- **Best Practices:** 96/100 ✅
- **SEO:** 91/100 ✅

### Costs (Monthly)
- **S3 Storage:** $0.023 per GB (~$0.05 for 2GB)
- **CloudFront Data Transfer:** $0.085 per GB (1GB free tier = $0)
- **Route 53 Hosted Zone:** $0.50
- **Total:** ~$0.55/month (after free tier)

### Availability
- **Uptime:** 99.9% (CloudFront SLA)
- **Global Edge Locations:** 450+ (CloudFront)
- **Latency:** <100ms worldwide

---

## 📝 License

MIT License

Copyright (c) 2024 Xurxo Astorgano

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 👤 Author

**Xurxo Astorgano**  

- 🌐 Website: [xurxo.cloud](https://xurxo.cloud)
- 💼 LinkedIn: [xurxoastorgano](https://linkedin.com/in/xurxoastorgano)
- 🐙 GitHub: [@Xurxxo](https://github.com/Xurxxo)
- 🏆 Credly: [xurxo-astorgano](https://www.credly.com/users/xurxo-astorgano)
- 📧 Email: xurxo.astorgano@gmail.com

---

## 🙏 Acknowledgments

- **Terminal aesthetic** inspired by classic Unix/Linux terminals
- **Built during** AWS Cloud Engineer training (2025-2026)
- **Special thanks to:**
  - DCI instructors for guidance on cloud architecture
  - DevOps community for best practices
  - Open source projects that made this possible

---

## 🌟 Support

If you found this project useful:

- ⭐ **Star this repository**
- 🍴 **Fork it** for your own portfolio
- 📢 **Share it** with others learning DevOps
- 💬 **Open issues** for questions or suggestions

---

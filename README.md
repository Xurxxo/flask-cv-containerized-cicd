# Terminal CV

[![Deploy Flask CV to AWS](https://github.com/Xurxxo/Flask-website-cv/actions/workflows/deploy.yml/badge.svg)](https://github.com/Xurxxo/Flask-website-cv/actions/workflows/deploy.yml)

A terminal-style portfolio website built with Flask. This project showcases professional experience, projects, and skills in a unique command-line interface theme.

## About

This is a personal CV/portfolio website designed to look like a Linux/AWS terminal. It provides an interactive way to present professional information in a developer-friendly format.

## Tech Stack

- Backend: Flask (Python web framework)
- Frontend: HTML5, CSS3, JavaScript
- Fonts: Fira Mono (monospace)
- Icons: Font Awesome
- Styling: Custom CSS with AWS color palette

## Prerequisites

Before running this project, make sure you have:

- Python 3.7 or higher
- pip (Python package manager)
- Git (for version control)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/terminal-cv.git
cd terminal-cv
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Application

Start the Flask development server:

```bash
python app.py
```

The application will be available at: http://localhost:5051

To stop the server, press `Ctrl+C` in the terminal.

## Project Structure

```
terminal-cv/
├── app.py                      # Main Flask application
├── requirements.txt            # Python dependencies
├── static/
│   ├── css/
│   │   └── style.css          # All CSS styles
│   ├── js/
│   │   ├── contact.js         # Contact form logic
│   │   └── unzip.js           # Animation utilities
│   └── profile.jpg            # Profile photo
└── templates/
    ├── base.html              # Base template with navigation
    ├── index.html             # Home page
    ├── whoami.html            # About page
    ├── ls.html                # Projects page
    ├── work.html              # Work experience
    ├── studies.html           # Education
    └── man.html               # Contact page
```

## Customization

### Update Personal Information

Edit the template files in the `templates/` directory:

- `index.html` - Update name, title, social links, and featured projects
- `whoami.html` - Modify the about section with your information
- `work.html` - Add your work experience
- `studies.html` - Add your education and certifications
- `ls.html` - Update with your real projects
- `man.html` - Change contact information

### Change Profile Photo

Replace `static/profile.jpg` with your own photo. Recommended size: 400x400 pixels.

### Modify Styling

Edit `static/css/style.css` to customize colors, fonts, or layout. The current theme uses AWS colors defined in CSS variables at the top of the file.

## Email Integration

The contact form is currently set up with a placeholder endpoint. To enable actual email sending:

1. Choose an email service (SendGrid, AWS SES, Mailgun, etc.)
2. Get API credentials from your chosen service
3. Update the `/send-email` endpoint in `app.py`
4. Add your API key to environment variables (never commit it to the repository)

Example with environment variables:
```python
import os
email_api_key = os.getenv('EMAIL_API_KEY')
```

## Deployment

This application can be deployed to various platforms:

### Heroku
1. Create a `Procfile` with: `web: python app.py`
2. Update `app.py` to use `PORT` environment variable
3. Deploy using Heroku CLI or GitHub integration

### Railway
1. Connect your GitHub repository
2. Railway will auto-detect Flask and deploy
3. Set environment variables in the dashboard

### PythonAnywhere
1. Upload your code
2. Configure a web app with Flask
3. Set the working directory and virtualenv path

Remember to set `debug=False` in production.

## Development

### Adding New Routes

To add a new page:

1. Create a new template in `templates/`
2. Add a route in `app.py`:
```python
@app.route("/newpage")
def newpage():
    return render_template("newpage.html")
```
3. Add navigation link in `templates/base.html`

### Running in Debug Mode

Debug mode is enabled by default in `app.py`. This provides:
- Auto-reload on code changes
- Detailed error messages
- Interactive debugger

Disable debug mode in production by changing:
```python
app.run(debug=False, port=5051)
```

## Common Issues

### Port Already in Use
If port 5051 is busy, change it in `app.py`:
```python
app.run(debug=True, port=5000)  # Use different port
```

### Module Not Found
Make sure virtual environment is activated and dependencies are installed:
```bash
source venv/bin/activate
pip install -r requirements.txt
```

### Template Not Found
Ensure all HTML files are in the `templates/` directory and Flask is looking in the correct location.

## Contributing

This is a personal portfolio project, but suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.

## Author

Created as a personal portfolio project to showcase development skills in a unique terminal-style interface.

## Acknowledgments

- Design inspired by Linux terminal and AWS console
- Built with Flask web framework
- Icons provided by Font Awesome
- Fonts from Google Fonts (Fira Mono)

## 🚀 Continuous Integration / Continuous Deployment

This project uses **GitHub Actions** for automated deployment to AWS.

### Deployment Workflow

Every `git push` to the `main` branch automatically:

1. ✅ Builds Docker image for `linux/amd64`
2. ✅ Pushes image to Amazon ECR
3. ✅ Deploys to EC2 via SSH
4. ✅ Zero-downtime container replacement

**Deployment time:** ~30-60 seconds

### Architecture

- **Application:** Flask (Python)
- **Containerization:** Docker
- **Registry:** Amazon ECR
- **Hosting:** AWS EC2 (Amazon Linux 2023)
- **Infrastructure:** Terraform
- **CI/CD:** GitHub Actions


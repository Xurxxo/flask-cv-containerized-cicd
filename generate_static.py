"""
Generate static HTML files from Flask templates
"""
from flask import Flask
from app import app
import os
import shutil

def generate_static_site():
    """Generate static HTML files"""
    
    # Create output directory
    output_dir = 'dist'
    if os.path.exists(output_dir):
        shutil.rmtree(output_dir)
    os.makedirs(output_dir)
    
    # Copy static files
    if os.path.exists('static'):
        shutil.copytree('static', os.path.join(output_dir, 'static'))
    
    # Routes to generate
    routes = [
        ('/', 'index.html'),
        ('/whoami', 'whoami.html'),
        ('/ls', 'ls.html'),
        ('/man', 'man.html'),
        ('/work', 'work.html'),
        ('/studies', 'studies.html'),
    ]
    
    # Generate HTML for each route
    with app.test_client() as client:
        for route, filename in routes:
            print(f"Generating {filename}...")
            response = client.get(route)
            
            if response.status_code == 200:
                filepath = os.path.join(output_dir, filename)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(response.data.decode('utf-8'))
                print(f"✓ Created {filepath}")
            else:
                print(f"✗ Failed to generate {filename} (status: {response.status_code})")
    
    print(f"\n✓ Static site generated in '{output_dir}/' directory")

if __name__ == '__main__':
    generate_static_site()

import os, re
from bs4 import BeautifulSoup

html_files = []
for root, _, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root or 'scratch' in root:
        continue
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

html_files.sort()

with open('scratch/image_audit_report.txt', 'w', encoding='utf-8') as report:
    for hf in html_files:
        report.write(f"\n==================================================\n")
        report.write(f"FILE: {hf}\n")
        report.write(f"==================================================\n")
        with open(hf, 'r', encoding='utf-8') as f:
            content = f.read()
        
        soup = BeautifulSoup(content, 'html.parser')
        imgs = soup.find_all('img')
        for idx, img in enumerate(imgs):
            src = img.get('src', '')
            alt = img.get('alt', '')
            # find enclosing card or section
            parent = img.find_parent(['div', 'figure', 'section'])
            parent_text = ""
            if parent:
                # get any h1, h2, h3, h4, or p
                heading = parent.find(['h1', 'h2', 'h3', 'h4', 'h5'])
                if heading:
                    parent_text = heading.get_text(strip=True)
            report.write(f"  [{idx+1}] src='{src}'\n")
            report.write(f"      heading='{parent_text}'\n")
            report.write(f"      alt='{alt[:80]}...'\n")

print("Audit script written.")

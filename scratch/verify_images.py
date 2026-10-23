import os, re

html_files = []
for root, _, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root or 'scratch' in root:
        continue
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

missing = []
total_images = 0
for hf in html_files:
    with open(hf, 'r', encoding='utf-8') as f:
        content = f.read()
    srcs = re.findall(r'<img[^>]+src=[\"\']([^\"\']+)[\"\']', content)
    for s in srcs:
        if s.startswith('http') or s.startswith('data:'):
            continue
        total_images += 1
        base_dir = os.path.dirname(hf)
        target = os.path.normpath(os.path.join(base_dir, s))
        if not os.path.exists(target):
            missing.append((hf, s, target))
    
    srcsets = re.findall(r'srcset=[\"\']([^\"\']+)[\"\']', content)
    for ss in srcsets:
        parts = ss.split(',')
        for p in parts:
            p = p.strip()
            if not p: continue
            url = p.split(' ')[0]
            if url.startswith('http') or url.startswith('data:'): continue
            total_images += 1
            base_dir = os.path.dirname(hf)
            target = os.path.normpath(os.path.join(base_dir, url))
            if not os.path.exists(target):
                missing.append((hf, url, target))

with open('scratch/verify_output.txt', 'w', encoding='utf-8') as out:
    if not missing:
        out.write(f"ALL {total_images} IMAGE/SRCSET LINKS IN ALL {len(html_files)} HTML FILES ARE 100% VALID!\n")
    else:
        out.write(f"FOUND {len(missing)} MISSING IMAGES:\n")
        for hf, s, t in missing:
            out.write(f"  In {hf}: {s} -> {t}\n")

print("Done verifying.")

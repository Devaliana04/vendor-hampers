import os
import re

workspace = r"c:\Users\LENOVO\Downloads\vendor hampers"

# =========================================================================
# 1. Update all HTML files: Google Fonts display=swap -> display=optional
# =========================================================================
all_html = []
for root, dirs, files in os.walk(workspace):
    if any(x in root for x in ["node_modules", ".git", "scratch"]):
        continue
    for f in files:
        if f.endswith(".html"):
            all_html.append(os.path.join(root, f))

for hp in all_html:
    with open(hp, "r", encoding="utf-8") as f:
        content = f.read()

    # Replace Google Fonts display=swap with display=optional to avoid FOUT & CLS
    if "display=swap" in content:
        content = content.replace("display=swap", "display=optional")
        with open(hp, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated font display=optional in {os.path.relpath(hp, workspace)}")

# =========================================================================
# 2. Update paket/*.html hero image inline styles (height:auto; aspect-ratio: 600/448)
# =========================================================================
paket_files = [
    os.path.join(workspace, "paket", "hampers-corporate.html"),
    os.path.join(workspace, "paket", "hampers-hari-raya.html"),
    os.path.join(workspace, "paket", "hampers-custom.html"),
    os.path.join(workspace, "paket", "hampers-premium.html"),
]

for pf in paket_files:
    if os.path.exists(pf):
        with open(pf, "r", encoding="utf-8") as f:
            c = f.read()
        
        # Replace inline style of hero img
        c = re.sub(
            r'style=["\']object-fit:\s*cover;\s*width:\s*100%;?["\']',
            'style="object-fit: cover; width: 100%; height: auto; aspect-ratio: 600/448;"',
            c
        )
        with open(pf, "w", encoding="utf-8") as f:
            f.write(c)
        print(f"Updated hero image sizing in {os.path.relpath(pf, workspace)}")

# =========================================================================
# 3. Update portofolio/index.html modal images
# =========================================================================
proto_path = os.path.join(workspace, "portofolio", "index.html")
if os.path.exists(proto_path):
    with open(proto_path, "r", encoding="utf-8") as f:
        pc = f.read()
    
    # Add width, height and aspect-ratio to modal study case images
    old_modal_img = 'class="rounded-3 w-100 shadow-sm"'
    new_modal_img = 'class="rounded-3 w-100 shadow-sm portfolio-modal-img" width="1000" height="746" style="aspect-ratio: 1000/746; object-fit: cover; height: auto;"'
    pc = pc.replace(old_modal_img, new_modal_img)
    
    with open(proto_path, "w", encoding="utf-8") as f:
        f.write(pc)
    print("Updated modal images in portofolio/index.html")

# =========================================================================
# 4. Update tentang.html custom hampers image
# =========================================================================
tentang_path = os.path.join(workspace, "tentang.html")
if os.path.exists(tentang_path):
    with open(tentang_path, "r", encoding="utf-8") as f:
        tc = f.read()
    
    tc = tc.replace(
        'width="600" height="420" style="width:100%;"',
        'width="1000" height="746" style="width: 100%; height: auto; aspect-ratio: 1000/746; object-fit: cover;"'
    )
    with open(tentang_path, "w", encoding="utf-8") as f:
        f.write(tc)
    print("Updated tentang.html image dimensions")

print("ALL CLS FIXES APPLIED SUCCESSFULLY!")

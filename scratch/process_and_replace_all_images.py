import os
from PIL import Image

uploaded_dir = r"C:\Users\LENOVO\.gemini\antigravity-ide\brain\d9d53add-e1dc-452e-bfcb-8e95b36c10c6\.user_uploaded"
workspace = r"c:\Users\LENOVO\Downloads\vendor hampers"
img_dir = os.path.join(workspace, "assets", "img")

# Map user uploaded images:
# img1 = Pink royal tea set hamper
# img2 = White luxury bespoke hamper (Queen tumbler, perfume)
# img3 = Christmas / Holiday 4-pack hamper
# img4 = Kraft Corporate hamper ("A Thoughtful Gift...", Tea blend, Honey)
# img5 = Lebaran / Idul Fitri hamper (Dates, artisan chocolates, syrup, Eid card)

img1_path = os.path.join(uploaded_dir, "media_1792653131027.jpg")
img2_path = os.path.join(uploaded_dir, "media_1792653131621.jpg")
img3_path = os.path.join(uploaded_dir, "media_1792653132256.jpg")
img4_path = os.path.join(uploaded_dir, "media_1792653133002.jpg")
img5_path = os.path.join(uploaded_dir, "media_1792653133288.jpg")

# Target image definitions
# (source_path, target_rel_path, max_width, max_height)
tasks = [
    # 1. Hampers Corporate
    (img4_path, os.path.join("packages", "hampers-corporate.webp"), 1000, 750),
    (img4_path, os.path.join("packages", "hampers-corporate-sm.webp"), 720, 540),
    (img4_path, os.path.join("blog", "hampers-corporate-detail.webp"), 1000, 750),
    (img4_path, os.path.join("blog", "hampers-corporate-detail-sm.webp"), 720, 540),

    # 2. Hampers Hari Raya
    (img5_path, os.path.join("packages", "hampers-hari-raya.webp"), 1000, 750),
    (img5_path, os.path.join("packages", "hampers-hari-raya-sm.webp"), 720, 540),
    (img5_path, os.path.join("blog", "hampers-lebaran-artisan-detail.webp"), 1000, 750),
    (img5_path, os.path.join("blog", "hampers-lebaran-artisan-detail-sm.webp"), 720, 540),

    # 3. Hampers Custom
    (img2_path, os.path.join("packages", "hampers-custom.webp"), 1000, 750),
    (img2_path, os.path.join("packages", "hampers-custom-sm.webp"), 720, 540),

    # 4. Hampers Premium
    (img1_path, os.path.join("packages", "hampers-premium.webp"), 1000, 750),
    (img1_path, os.path.join("packages", "hampers-premium-sm.webp"), 720, 540),

    # 5. Hero Hampers
    (img1_path, os.path.join("hero", "hero-hampers.webp"), 1100, 825),
    (img1_path, os.path.join("hero", "hero-hampers-sm.webp"), 720, 540),

    # 6. Blog Budget Comparison / Holiday Pack
    (img3_path, os.path.join("blog", "hampers-budget-comparison.webp"), 1000, 750),
    (img3_path, os.path.join("blog", "hampers-budget-comparison-sm.webp"), 720, 540),

    # 7. OpenGraph Image (1200x630 banner)
    (img4_path, "og-image.webp", 1200, 630),
]

def save_under_100kb(im, dest_path, max_w, max_h):
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    
    # Calculate dimensions maintaining aspect ratio or center crop for exact fit
    orig_w, orig_h = im.size
    
    # Resize preserving aspect ratio
    im_copy = im.copy()
    im_copy.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
    
    # If RGB conversion needed
    if im_copy.mode in ("RGBA", "P"):
        im_copy = im_copy.convert("RGB")
    
    quality = 85
    while quality >= 30:
        im_copy.save(dest_path, "WEBP", quality=quality, method=6)
        size = os.path.getsize(dest_path)
        if size < 95 * 1024:  # Under 95KB (safely under 100KB)
            return size, quality, im_copy.size
        quality -= 5
    
    # If still > 95KB, reduce resolution slightly
    im_copy.thumbnail((int(max_w * 0.85), int(max_h * 0.85)), Image.Resampling.LANCZOS)
    im_copy.save(dest_path, "WEBP", quality=75, method=6)
    size = os.path.getsize(dest_path)
    return size, 75, im_copy.size

report = []
for src_p, rel_target, max_w, max_h in tasks:
    target_p = os.path.join(img_dir, rel_target)
    with Image.open(src_p) as im:
        sz, q, dims = save_under_100kb(im, target_p, max_w, max_h)
        status = "OK (<100KB)" if sz < 100 * 1024 else "EXCEEDED!"
        report.append(f"{rel_target}: {sz/1024:.1f} KB (quality={q}, dims={dims[0]}x{dims[1]}) [{status}]")

# Check all files in assets/img to verify ALL are under 100KB
report.append("\n=== FINAL VERIFICATION OF ALL FILES IN assets/img/ ===")
all_under_100k = True
for root, dirs, files in os.walk(img_dir):
    for f in files:
        p = os.path.join(root, f)
        rel = os.path.relpath(p, workspace)
        sz = os.path.getsize(p)
        if sz >= 100 * 1024:
            all_under_100k = False
            report.append(f"WARNING > 100KB: {rel} ({sz/1024:.1f} KB)")
        else:
            report.append(f"PASS (<100KB): {rel} ({sz/1024:.1f} KB)")

report.append(f"\nALL ASSETS UNDER 100KB? {all_under_100k}")

out_report_path = r"C:\Users\LENOVO\.gemini\antigravity-ide\brain\d9d53add-e1dc-452e-bfcb-8e95b36c10c6\scratch\image_replace_report.txt"
with open(out_report_path, "w", encoding="utf-8") as f:
    f.write("\n".join(report))

print("Image processing script finished!")

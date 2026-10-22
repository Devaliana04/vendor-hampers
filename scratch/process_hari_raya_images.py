import os
from PIL import Image

uploaded_dir = r"C:\Users\LENOVO\.gemini\antigravity-ide\brain\d9d53add-e1dc-452e-bfcb-8e95b36c10c6\.user_uploaded"
workspace = r"c:\Users\LENOVO\Downloads\vendor hampers"
img_dir = os.path.join(workspace, "assets", "img")

lebaran_src = os.path.join(uploaded_dir, "media_1792654118335.jpg")
natal_src = os.path.join(uploaded_dir, "media_1792654118818.jpg")

tasks = [
    # Lebaran images
    (lebaran_src, os.path.join("packages", "hampers-hari-raya.webp"), 1000, 750),
    (lebaran_src, os.path.join("packages", "hampers-hari-raya-sm.webp"), 720, 540),
    (lebaran_src, os.path.join("blog", "hampers-lebaran-artisan-detail.webp"), 1000, 750),
    (lebaran_src, os.path.join("blog", "hampers-lebaran-artisan-detail-sm.webp"), 720, 540),

    # Natal / Christmas images
    (natal_src, os.path.join("packages", "hampers-natal.webp"), 1000, 750),
    (natal_src, os.path.join("packages", "hampers-natal-sm.webp"), 720, 540),
    (natal_src, os.path.join("blog", "hampers-budget-comparison.webp"), 1000, 750),
    (natal_src, os.path.join("blog", "hampers-budget-comparison-sm.webp"), 720, 540),
]

def save_under_100kb(im, dest_path, max_w, max_h):
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    im_copy = im.copy()
    im_copy.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
    if im_copy.mode in ("RGBA", "P"):
        im_copy = im_copy.convert("RGB")
    
    quality = 85
    while quality >= 30:
        im_copy.save(dest_path, "WEBP", quality=quality, method=4)
        size = os.path.getsize(dest_path)
        if size < 95 * 1024:
            return size, quality, im_copy.size
        quality -= 5
    
    im_copy.thumbnail((int(max_w * 0.85), int(max_h * 0.85)), Image.Resampling.LANCZOS)
    im_copy.save(dest_path, "WEBP", quality=75, method=4)
    size = os.path.getsize(dest_path)
    return size, 75, im_copy.size

report = []
for src_p, rel_target, max_w, max_h in tasks:
    target_p = os.path.join(img_dir, rel_target)
    with Image.open(src_p) as im:
        sz, q, dims = save_under_100kb(im, target_p, max_w, max_h)
        status = "OK (<100KB)" if sz < 100 * 1024 else "EXCEEDED!"
        report.append(f"{rel_target}: {sz/1024:.1f} KB (quality={q}, dims={dims[0]}x{dims[1]}) [{status}]")

out_report_path = r"C:\Users\LENOVO\.gemini\antigravity-ide\brain\d9d53add-e1dc-452e-bfcb-8e95b36c10c6\scratch\hari_raya_report.txt"
with open(out_report_path, "w", encoding="utf-8") as f:
    f.write("\n".join(report))

print("Hari raya images generated successfully!")

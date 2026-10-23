import os

files_to_remove = [
    "assets/img/portfolio/hampers-corporate-batch.webp",
    "assets/img/portfolio/hampers-lebaran-produksi.webp",
    "assets/img/portfolio/hampers-corporate-delivery.webp",
    "assets/img/portfolio/portfolio-wellness-kit.webp",
    "assets/img/portfolio/portfolio-wellness-kit-sm.webp",
    "assets/img/portfolio/portfolio-luxury-executive.webp",
    "assets/img/portfolio/portfolio-luxury-executive-sm.webp",
    "assets/img/portfolio/portfolio-yearend-appreciation.webp",
    "assets/img/portfolio/portfolio-yearend-appreciation-sm.webp"
]

removed = []
for f in files_to_remove:
    if os.path.exists(f):
        os.remove(f)
        removed.append(f)

print(f"Removed {len(removed)} files:")
for r in removed:
    print(" -", r)

import os
from PIL import Image

brain_dir = r"C:\Users\LENOVO\.gemini\antigravity-ide\brain\d5431f28-3741-49f2-b15a-fe02137fa0fc"

# Find latest files by pattern
def find_latest(pattern):
    matches = [os.path.join(brain_dir, f) for f in os.listdir(brain_dir) if pattern in f and f.endswith('.jpg')]
    if not matches:
        print("Not found:", pattern)
        return None
    matches.sort(key=os.path.getmtime, reverse=True)
    return matches[0]

lebaran_src = find_latest("blog_lebaran_kurma")
budget_src = find_latest("blog_budget_planning")
hari_raya_src = find_latest("pkg_hari_raya")
wellness_src = find_latest("portfolio_wellness_box")
luxury_src = find_latest("portfolio_luxury_vip")
onboarding_src = find_latest("portfolio_onboarding_kit")
yearend_src = find_latest("portfolio_yearend_calendar")

conversions = [
    (lebaran_src, "assets/img/blog/hampers-lebaran-artisan-detail.webp", "assets/img/blog/hampers-lebaran-artisan-detail-sm.webp"),
    (budget_src, "assets/img/blog/hampers-budget-comparison.webp", "assets/img/blog/hampers-budget-comparison-sm.webp"),
    (hari_raya_src, "assets/img/packages/hampers-hari-raya.webp", "assets/img/packages/hampers-hari-raya-sm.webp"),
    (wellness_src, "assets/img/portfolio/portfolio-wellness-kit.webp", "assets/img/portfolio/portfolio-wellness-kit-sm.webp"),
    (luxury_src, "assets/img/portfolio/portfolio-luxury-executive.webp", "assets/img/portfolio/portfolio-luxury-executive-sm.webp"),
    (onboarding_src, "assets/img/portfolio/portfolio-onboarding-kit.webp", "assets/img/portfolio/portfolio-onboarding-kit-sm.webp"),
    (yearend_src, "assets/img/portfolio/portfolio-yearend-appreciation.webp", "assets/img/portfolio/portfolio-yearend-appreciation-sm.webp")
]

for src, dest, dest_sm in conversions:
    if not src or not os.path.exists(src):
        print(f"Skipping {dest}, src not found: {src}")
        continue
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    im = Image.open(src).convert('RGB')
    
    # 1000x746
    im_main = im.resize((1000, 746), Image.Resampling.LANCZOS)
    im_main.save(dest, 'WEBP', quality=84, method=6)
    
    # 500x373
    im_sm = im.resize((500, 373), Image.Resampling.LANCZOS)
    im_sm.save(dest_sm, 'WEBP', quality=80, method=6)
    
    print(f"SUCCESS {dest}: {os.path.getsize(dest)} bytes, sm: {os.path.getsize(dest_sm)} bytes")

# Also ensure hampers-premium-sm.webp is fixed from hampers-premium.webp
if os.path.exists("assets/img/packages/hampers-premium.webp"):
    prem = Image.open("assets/img/packages/hampers-premium.webp").convert('RGB')
    prem_sm = prem.resize((500, 373), Image.Resampling.LANCZOS)
    prem_sm.save("assets/img/packages/hampers-premium-sm.webp", "WEBP", quality=80, method=6)
    print("Fixed hampers-premium-sm.webp")

print("ALL DONE")

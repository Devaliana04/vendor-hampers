import subprocess

res = subprocess.run(['git', 'diff', '0842979..HEAD', 'portofolio.html'], capture_output=True, text=True)
print("=== PORTOFOLIO DIFF ===")
print(res.stdout)

res_blog = subprocess.run(['git', 'diff', '0842979..HEAD', 'blog/tips-anggaran-hampers-perusahaan.html'], capture_output=True, text=True)
print("=== BLOG TIPS DIFF ===")
print(res_blog.stdout)

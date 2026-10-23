import subprocess

with open('scratch/diffs.txt', 'w', encoding='utf-8') as f:
    subprocess.run(['git', 'diff', '0842979..HEAD', 'portofolio.html'], stdout=f, text=True)
    f.write("\n\n=== BLOG TIPS DIFF ===\n")
    subprocess.run(['git', 'diff', '0842979..HEAD', 'blog/tips-anggaran-hampers-perusahaan.html'], stdout=f, text=True)
    f.write("\n\n=== BLOG LEBARAN DIFF ===\n")
    subprocess.run(['git', 'diff', '0842979..HEAD', 'blog/ide-isi-hampers-lebaran.html'], stdout=f, text=True)

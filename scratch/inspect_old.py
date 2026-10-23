import subprocess

res = subprocess.run(['git', 'show', '0842979:portofolio.html'], capture_output=True, text=True)
lines = res.stdout.splitlines()

print("OLD PORTOFOLIO IMAGES:")
for i, line in enumerate(lines):
    if '<img' in line:
        print(f"Line {i+1}: {line.strip()}")

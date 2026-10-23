import subprocess

res = subprocess.run(['git', 'log', '--oneline', '-n', '10'], capture_output=True, text=True)
print("GIT LOG:")
print(res.stdout)

res2 = subprocess.run(['git', 'diff', 'HEAD~1', '--stat'], capture_output=True, text=True)
print("RECENT COMMIT DIFF STAT:")
print(res2.stdout)

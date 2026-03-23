import os
import re

base_dir = r"c:\Users\Austin NAMUYE\OneDrive\Desktop\HPC\HISA-PPLES-CHAIN-DAPP"

for root, dirs, files in os.walk(base_dir):
    # Skip .git directory
    if '.git' in dirs:
        dirs.remove('.git')
        
    for file in files:
        file_path = os.path.join(root, file)
        
        # Only process textual files
        if not file_path.endswith(('.html', '.md', '.css', '.js', '.sol', '.py', '.txt')):
            continue
            
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Remove ""
            new_content = content.replace('', '')
            
            # Remove "" (case-insensitive), handling possible extra spaces
            # Since the user specifically mentioned "", let's do a case-insensitive regex
            # and maybe "". We can just use `re.sub`
            new_content = re.sub(r'(?i)\bbankai\s+labs\b', '', new_content)
            
            if new_content != content:
                print(f"Updating {file_path}")
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
        except Exception as e:
            print(f"Error processing {file_path}: {e}")

print("Removal complete.")

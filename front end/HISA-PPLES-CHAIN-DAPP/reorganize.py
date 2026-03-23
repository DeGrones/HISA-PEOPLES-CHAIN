import os
import shutil
import re

base_dir = r"c:\Users\Austin NAMUYE\OneDrive\Desktop\HPC\HISA-PPLES-CHAIN-DAPP"

directories = [
    "assets/images",
    "assets/css",
    "assets/js",
    "pages",
    "contracts",
    "docs",
    "scripts"
]

images = ["HISA.jpg", "UMOJA LOGO.JPEG.png", "culture.jpg", "jani.png", "sdg.jpg", "umojat.jpg", "umoo.jpg"]
css_files = ["Hisa.css", "chat2.css", "index.css", "jani.css", "umoja.css"]
js_files = ["index.js"]
html_pages = ["Economicmodel.html", "Hisa.html", "amm.html", "chat.html", "chatwpaper.html", "exchange.html", "hisawpaper.html", "jani.html", "janiwpaper.html", "pools.html", "roadmap.html", "sdg.html", "umoja.html", "umojawpaper.html"]
root_html = ["index.html"]
contracts = ["CHAT.sol", "HISA.sol", "janihisa.sol", "umojahisa.sol"]
docs = ["AMMexplain .md", "CHATwhitepaper.md", "HEDERA_TOOL.md", "HISA Overview.md", "HISAPEOPLESCHAINwhitepaper.md", "HISAPOOLS.md", "JANIHISAwhitepaper.md", "Playgroundcode.md", "Roadmap.md", "SDG.md", "blank.md", "illustration _diagram.md", "playground code.md"]
scripts = ["AMM_simulator.py"]
delete_files = ["next.config.ts", "tailwind.config.ts", "components.json", ".gitpod.yml", "package.json", "package-lock.json", "postcss.config.mjs", "tsconfig.json", "apphosting.yaml", "logger.json.sample", ".prettierrc.js", ".rpcrelay.env.sample", ".env", ".env.sample", ".firebaserc"]

# Create directories
for d in directories:
    path = os.path.join(base_dir, d)
    os.makedirs(path, exist_ok=True)

# Helper function to replace links
def update_links(content, is_root):
    # Depending on whether the file is in the root or in pages/, we prepend different paths
    prefix_img = "assets/images/" if is_root else "../assets/images/"
    prefix_css = "assets/css/" if is_root else "../assets/css/"
    prefix_js = "assets/js/" if is_root else "../assets/js/"
    prefix_pages = "pages/" if is_root else ""
    prefix_root = "" if is_root else "../"
    
    # Replace image links (e.g., src="HISA.jpg" -> src="assets/images/HISA.jpg")
    for img in images:
        content = re.sub(rf'((?:src|href)=["\'])(?!{prefix_img}){img}(["\'])', rf'\1{prefix_img}{img}\2', content)

    # Replace css links
    for css in css_files:
        content = re.sub(rf'((?:src|href)=["\'])(?!{prefix_css}){css}(["\'])', rf'\1{prefix_css}{css}\2', content)

    # Replace js links
    for js in js_files:
        content = re.sub(rf'((?:src|href)=["\'])(?!{prefix_js}){js}(["\'])', rf'\1{prefix_js}{js}\2', content)

    # Replace page links
    for hp in html_pages:
        content = re.sub(rf'((?:src|href)=["\'])(?!{prefix_pages}){hp}(["\'])', rf'\1{prefix_pages}{hp}\2', content)

    # Replace root html link (index.html)
    for root in root_html:
        content = re.sub(rf'((?:src|href)=["\'])(?!{prefix_root}){root}(["\'])', rf'\1{prefix_root}{root}\2', content)

    return content

# 1. Update and move HTML files
all_html = root_html + html_pages
for h_file in all_html:
    src_path = os.path.join(base_dir, h_file)
    if not os.path.exists(src_path):
        continue
        
    with open(src_path, 'r', encoding='utf-8') as f:
        content = f.read()

    is_root = (h_file in root_html)
    new_content = update_links(content, is_root)
    
    dest_dir = base_dir if is_root else os.path.join(base_dir, "pages")
    dest_path = os.path.join(dest_dir, h_file)
    
    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    if not is_root and dest_path != src_path:
        os.remove(src_path)

# 2. Move other files
def move_files(file_list, target_folder):
    for f in file_list:
        src = os.path.join(base_dir, f)
        dest = os.path.join(base_dir, target_folder, f)
        if os.path.exists(src) and src != dest:
            shutil.move(src, dest)

move_files(images, "assets/images")
move_files(css_files, "assets/css")
move_files(js_files, "assets/js")
move_files(contracts, "contracts")
move_files(docs, "docs")
move_files(scripts, "scripts")

# 3. Delete unused files
for f in delete_files:
    path = os.path.join(base_dir, f)
    if os.path.exists(path):
        os.remove(path)

print("Reorganization complete.")

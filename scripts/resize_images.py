
import os
import subprocess

assets_dir = "/home/arthurkomatsu/Documents/reflexsom/public/assets"
images_to_resize = [
    "low-fog-maquina.webp",
    "maquina-neve.webp",
    "maquina-bolhas.webp",
    "sky-paper.webp",
    "canhao-seguidor.webp",
    "videoke-equipamento.webp",
    "evento.webp",
    "skywalker-equipamento.webp"
]

# Standard images
for img_name in images_to_resize:
    input_path = os.path.join(assets_dir, img_name)
    
    if os.path.exists(input_path):
        # Generate Small (400px)
        small_name = img_name.replace(".webp", "-small.webp")
        small_path = os.path.join(assets_dir, small_name)
        print(f"Resizing {img_name} to {small_name} (400px)...")
        subprocess.run(["ffmpeg", "-y", "-i", input_path, "-vf", "scale=400:-1", "-c:v", "libwebp", "-quality", "60", small_path], check=True)

        # Generate Large/Intermediate (600px)
        large_name = img_name.replace(".webp", "-large.webp")
        large_path = os.path.join(assets_dir, large_name)
        print(f"Resizing {img_name} to {large_name} (600px)...")
        subprocess.run(["ffmpeg", "-y", "-i", input_path, "-vf", "scale=600:-1", "-c:v", "libwebp", "-quality", "60", large_path], check=True)
        
        # Generate Medium (800px)
        medium_name = img_name.replace(".webp", "-medium.webp")
        medium_path = os.path.join(assets_dir, medium_name)
        print(f"Resizing {img_name} to {medium_name} (800px)...")
        subprocess.run(["ffmpeg", "-y", "-i", input_path, "-vf", "scale=800:-1", "-c:v", "libwebp", "-quality", "60", medium_path], check=True)

    else:
        print(f"Warning: {img_name} not found!")

# Hero Background
hero_bg = "hero-bg.webp"
hero_input_path = os.path.join(assets_dir, hero_bg)
if os.path.exists(hero_input_path):
    # Mobile Portrait (600w - covers most mobile DPRs and heights)
    hero_small = "hero-bg-small.webp"
    hero_small_path = os.path.join(assets_dir, hero_small)
    print(f"Resizing {hero_bg} to {hero_small} (600px)...")
    subprocess.run(["ffmpeg", "-y", "-i", hero_input_path, "-vf", "scale=600:-1", "-c:v", "libwebp", "-quality", "65", hero_small_path], check=True)

    # Tablet/Laptop (1024w)
    hero_medium = "hero-bg-medium.webp"
    hero_medium_path = os.path.join(assets_dir, hero_medium)
    print(f"Resizing {hero_bg} to {hero_medium} (1024px)...")
    subprocess.run(["ffmpeg", "-y", "-i", hero_input_path, "-vf", "scale=1024:-1", "-c:v", "libwebp", "-quality", "65", hero_medium_path], check=True)
else:
    print(f"Warning: {hero_bg} not found!")

# Handle Logo
logo_png = "logo-reflex-som.png"
logo_input_path = os.path.join(assets_dir, logo_png)
if os.path.exists(logo_input_path):
    logo_webp_name = "logo-reflex-som.webp"
    logo_webp_path = os.path.join(assets_dir, logo_webp_name)
    print(f"Resizing {logo_png} to {logo_webp_name} (185px)...")
    subprocess.run(["ffmpeg", "-y", "-i", logo_input_path, "-vf", "scale=185:-1", "-c:v", "libwebp", "-quality", "60", logo_webp_path], check=True)
else:
    print("Logo png not found")

print("Done resizing images.")

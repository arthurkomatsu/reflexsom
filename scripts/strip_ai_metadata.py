#!/usr/bin/env python3
"""
AI Metadata Stripping Script

Finds all images in the project that contain AI/Google metadata markers
and removes them while preserving image quality.

This script detects:
- Software: Google
- Credit: Edited with Google AI
- DigitalSourceType: compositeWithTrainedAlgorithmicMedia
- ICC profiles with Google signatures
"""

import os
import sys
from pathlib import Path

try:
    from PIL import Image
    from PIL.ExifTags import TAGS
except ImportError:
    print("❌ Pillow is not installed. Install it with:")
    print("   pip install Pillow")
    sys.exit(1)

# Configuration
IMAGE_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.webp'}
EXCLUDE_DIRS = {'node_modules', '.git', '.venv', '__pycache__', 'dist', '.reference-repo'}

# AI/Google markers to detect
AI_KEYWORDS = ['google ai', 'google', 'trainedalgorithmic', 'algorithmic', 'compositewithtrained']


def get_project_root():
    """Get the project root directory (where this script's parent is)."""
    return Path(__file__).parent.parent


def find_images(root_dir):
    """Find all image files in the project, excluding certain directories."""
    images = []
    for path in root_dir.rglob('*'):
        if any(excluded in path.parts for excluded in EXCLUDE_DIRS):
            continue
        if path.suffix == '.bk':
            continue
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS:
            images.append(path)
    return images


def check_ai_markers(image_path):
    """
    Check if an image contains AI/Google metadata markers.
    Returns a list of detected markers or empty list if clean.
    """
    markers = []
    try:
        image = Image.open(image_path)
        
        # Check EXIF data
        exif = image._getexif() if hasattr(image, '_getexif') and image._getexif() else {}
        if exif:
            for tag, value in exif.items():
                decoded = TAGS.get(tag, tag)
                value_str = str(value).lower()
                for kw in AI_KEYWORDS:
                    if kw in value_str:
                        markers.append(f"{decoded}: {value}")
                        break
        
        # Check image info (XMP, etc.)
        for key, value in image.info.items():
            val_str = ''
            if isinstance(value, str):
                val_str = value.lower()
            elif isinstance(value, bytes):
                val_str = value.decode('utf-8', errors='ignore').lower()
            
            # Check for AI markers in value
            for kw in AI_KEYWORDS:
                if kw in val_str.replace(' ', ''):
                    # Extract specific marker info
                    if 'digitalsourcetype' in val_str:
                        markers.append(f"{key}: Contains DigitalSourceType (AI composite)")
                    elif 'credit' in val_str and 'google' in val_str:
                        markers.append(f"{key}: Contains 'Edited with Google AI'")
                    else:
                        markers.append(f"{key}: Contains Google/AI metadata")
                    break
        
        image.close()
    except Exception as e:
        markers.append(f"Error reading: {e}")
    
    return markers


def strip_metadata(image_path):
    """
    Strip all metadata from an image while preserving quality.
    Returns True if successful, False otherwise.
    """
    try:
        img = Image.open(image_path)
        suffix = image_path.suffix.lower()
        mode = img.mode
        
        # Create a clean copy without metadata
        if mode == 'RGBA' or (mode == 'P' and 'transparency' in img.info):
            clean_img = Image.new('RGBA', img.size)
            clean_img.paste(img.convert('RGBA'))
        else:
            clean_img = Image.new('RGB', img.size)
            if mode != 'RGB':
                img = img.convert('RGB')
            clean_img.paste(img)
        
        # Save without metadata
        if suffix == '.png':
            if clean_img.mode == 'RGB':
                clean_img = clean_img.convert('RGBA') if mode == 'RGBA' else clean_img
            clean_img.save(image_path, 'PNG', optimize=True)
        elif suffix in ['.jpg', '.jpeg']:
            if clean_img.mode == 'RGBA':
                clean_img = clean_img.convert('RGB')
            clean_img.save(image_path, 'JPEG', quality=95, optimize=True)
        elif suffix == '.webp':
            clean_img.save(image_path, 'WEBP', quality=95, optimize=True)
        else:
            clean_img.save(image_path)
        
        img.close()
        return True
    except Exception as e:
        print(f"   ❌ Error stripping metadata: {e}")
        return False


def main(check_only=False):
    """
    Main function to find and strip AI metadata from images.
    
    Args:
        check_only: If True, only check for AI metadata without stripping.
    """
    root_dir = get_project_root()
    
    if check_only:
        print(f"🔍 Checking for AI metadata in: {root_dir}")
    else:
        print(f"🔍 Scanning for AI metadata in: {root_dir}")
    print("-" * 50)
    
    images = find_images(root_dir)
    flagged = []
    
    for img in images:
        markers = check_ai_markers(img)
        if markers:
            flagged.append((img, markers))
    
    if not flagged:
        print("✅ No images with AI/Google metadata found!")
        return 0
    
    print(f"\n⚠️  Found {len(flagged)} image(s) with AI/Google metadata:\n")
    for img, markers in flagged:
        rel_path = img.relative_to(root_dir)
        print(f"📍 {rel_path}")
        for marker in markers:
            print(f"   • {marker}")
    
    if check_only:
        print("\n" + "=" * 50)
        print("❌ Pre-commit check failed!")
        print("\nRun 'python3 scripts/strip_ai_metadata.py' to remove AI metadata.")
        return 1
    
    # Strip metadata
    print("\n🔧 Stripping AI metadata...")
    
    stripped_count = 0
    failed_count = 0
    
    for img, markers in flagged:
        rel_path = img.relative_to(root_dir)
        print(f"\n📸 Processing: {rel_path}")
        
        if strip_metadata(img):
            # Verify it's clean now
            new_markers = check_ai_markers(img)
            if not new_markers:
                print(f"   ✅ Cleaned successfully")
                stripped_count += 1
            else:
                print(f"   ⚠️  Still has markers: {new_markers}")
                failed_count += 1
        else:
            failed_count += 1
    
    print("\n" + "=" * 50)
    print(f"📊 Results:")
    print(f"   ✅ Cleaned: {stripped_count}")
    if failed_count:
        print(f"   ❌ Failed: {failed_count}")
    
    return 0 if failed_count == 0 else 1


if __name__ == '__main__':
    # Check for --check flag (used by pre-commit)
    check_only = '--check' in sys.argv
    sys.exit(main(check_only=check_only))

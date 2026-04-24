"""
PDF Creator for Abstract Emporium Products
Creates PDFs from image files for coloring books

Requirements: pip install Pillow

Usage: python create-pdfs.py
"""

import os
from PIL import Image
from pathlib import Path

def create_coloring_book_pdf(product_name, cover_path, first_page_path, coloring_pages_folder, output_path):
    """
    Creates a PDF from cover, first page, and coloring pages
    
    Args:
        product_name: Name of the product (for logging)
        cover_path: Path to cover image
        first_page_path: Path to first page image
        coloring_pages_folder: Folder containing coloring page images
        output_path: Where to save the output PDF
    """
    print(f"\n{'='*60}")
    print(f"Creating PDF for: {product_name}")
    print(f"{'='*60}")
    
    try:
        # Collect all images
        images = []
        
        # Add cover
        print(f"Adding cover: {cover_path}")
        if not os.path.exists(cover_path):
            print(f"ERROR: Cover file not found: {cover_path}")
            return False
        images.append(Image.open(cover_path).convert('RGB'))
        
        # Add first page
        print(f"Adding first page: {first_page_path}")
        if not os.path.exists(first_page_path):
            print(f"ERROR: First page file not found: {first_page_path}")
            return False
        images.append(Image.open(first_page_path).convert('RGB'))
        
        # Add all coloring pages (sorted)
        print(f"Adding coloring pages from: {coloring_pages_folder}")
        if not os.path.exists(coloring_pages_folder):
            print(f"ERROR: Coloring pages folder not found: {coloring_pages_folder}")
            return False
            
        coloring_pages = sorted(Path(coloring_pages_folder).glob('*.jpeg'))
        if not coloring_pages:
            coloring_pages = sorted(Path(coloring_pages_folder).glob('*.jpg'))
        if not coloring_pages:
            coloring_pages = sorted(Path(coloring_pages_folder).glob('*.png'))
        
        if not coloring_pages:
            print(f"ERROR: No image files found in {coloring_pages_folder}")
            return False
        
        for i, page in enumerate(coloring_pages, 1):
            print(f"  Adding page {i}/{len(coloring_pages)}: {page.name}")
            images.append(Image.open(page).convert('RGB'))
        
        # Ensure all images are same size (resize if needed)
        print("\nResizing images to consistent size...")
        max_width = max(img.width for img in images)
        max_height = max(img.height for img in images)
        
        resized_images = []
        for img in images:
            if img.width != max_width or img.height != max_height:
                # Resize maintaining aspect ratio
                resized = Image.new('RGB', (max_width, max_height), 'white')
                # Center the image
                x = (max_width - img.width) // 2
                y = (max_height - img.height) // 2
                resized.paste(img, (x, y))
                resized_images.append(resized)
            else:
                resized_images.append(img)
        
        # Create output directory if it doesn't exist
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # Save as PDF
        print(f"\nSaving PDF to: {output_path}")
        resized_images[0].save(
            output_path,
            save_all=True,
            append_images=resized_images[1:],
            resolution=300.0,  # 300 DPI for print quality
            quality=95,
            optimize=False
        )
        
        # Get file size
        file_size_mb = os.path.getsize(output_path) / (1024 * 1024)
        
        print(f"\n✓ SUCCESS!")
        print(f"  Created: {output_path}")
        print(f"  Pages: {len(resized_images)}")
        print(f"  File size: {file_size_mb:.2f} MB")
        
        return True
        
    except Exception as e:
        print(f"\n✗ ERROR creating PDF for {product_name}:")
        print(f"  {str(e)}")
        return False

def main():
    """Main function to create all PDFs"""
    
    print("\n" + "="*60)
    print("ABSTRACT EMPORIUM PDF CREATOR")
    print("="*60)
    
    # Create output folder
    output_folder = 'PDFs'
    os.makedirs(output_folder, exist_ok=True)
    print(f"\nOutput folder: {output_folder}/")
    
    success_count = 0
    fail_count = 0
    
    # Define all products to create
    products = [
        {
            "name": "Chaos & Calm",
            "cover": "Chaos-Calm/Chaos-and-Calm-Cover.png",
            "first_page": "Chaos-Calm/Chaos-and-Calm-First-Page.png",
            "pages_folder": "Chaos-Calm/coloring-pages/",
            "output": f"{output_folder}/Chaos-and-Calm-Coloring-Book.pdf"
        },
        {
            "name": "Invisible Pain",
            "cover": "Invisible-Pain/Invisible-Pain-Cover.png",
            "first_page": "Invisible-Pain/Invisible-Pain-First-Page.png",
            "pages_folder": "Invisible-Pain/coloring-pages/",
            "output": f"{output_folder}/Invisible-Pain-Coloring-Book.pdf"
        },
        {
            "name": "Healing Lines",
            "cover": "Healing-Lines/Healing-Lines-Cover.png",
            "first_page": "Healing-Lines/Healing-Lines-First-Page.png",
            "pages_folder": "Healing-Lines/coloring-pages/",
            "output": f"{output_folder}/Healing-Lines-Coloring-Book.pdf"
        },
        {
            "name": "Abstract Mind Collection",
            "cover": "Abstract-Mind-Collection/Abstract-Mind-Collection-Cover.png",
            "first_page": "Abstract-Mind-Collection/Abstract-Mind-Collection-First-Page.png",
            "pages_folder": "Abstract-Mind-Collection/all-pages/",
            "output": f"{output_folder}/Abstract-Mind-Collection-Complete.pdf"
        }
    ]
    
    # Create each PDF
    for product in products:
        success = create_coloring_book_pdf(
            product_name=product["name"],
            cover_path=product["cover"],
            first_page_path=product["first_page"],
            coloring_pages_folder=product["pages_folder"],
            output_path=product["output"]
        )
        
        if success:
            success_count += 1
        else:
            fail_count += 1
    
    # Final summary
    print("\n" + "="*60)
    print("SUMMARY")
    print("="*60)
    print(f"✓ Success: {success_count} PDFs created")
    print(f"✗ Failed: {fail_count} PDFs")
    
    if success_count > 0:
        print(f"\nYour PDFs are ready in the '{output_folder}/' folder!")
        print("\nNext steps:")
        print("1. Open each PDF and verify all pages are present")
        print("2. Test print 1-2 pages to check quality")
        print("3. Upload to Gumroad/Etsy")
        print("4. LAUNCH! 🚀")
    
    if fail_count > 0:
        print("\n⚠️  Some PDFs failed to create.")
        print("Check that all image files exist in the correct folders.")
        print("See PDF_CREATION_GUIDE.md for folder structure requirements.")

if __name__ == "__main__":
    main()

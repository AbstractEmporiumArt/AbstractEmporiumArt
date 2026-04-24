# Abstract Emporium - Coloring Book PDF Creator (PowerShell)
# Requires: ImageMagick installed
# Install: choco install imagemagick
# Or download from: https://imagemagick.org/script/download.php

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Abstract Emporium - PDF Creator" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Function to create coloring book PDF
function Create-ColoringBookPDF {
    param(
        [string]$ProductName,
        [string]$CoverPath,
        [string]$FirstPagePath,
        [string]$ColoringPagesFolder,
        [string]$OutputPath
    )
    
    Write-Host "Creating PDF for: $ProductName" -ForegroundColor Green
    Write-Host "  Cover: $CoverPath"
    Write-Host "  First Page: $FirstPagePath"
    Write-Host "  Coloring Pages: $ColoringPagesFolder"
    
    # Check if ImageMagick is installed
    try {
        $magickVersion = & magick -version 2>$null
        if (!$?) {
            Write-Host "ERROR: ImageMagick not found. Please install:" -ForegroundColor Red
            Write-Host "  Option 1: choco install imagemagick" -ForegroundColor Yellow
            Write-Host "  Option 2: Download from https://imagemagick.org/script/download.php" -ForegroundColor Yellow
            return $false
        }
    } catch {
        Write-Host "ERROR: ImageMagick not installed. Install it first!" -ForegroundColor Red
        return $false
    }
    
    # Check if files exist
    if (!(Test-Path $CoverPath)) {
        Write-Host "ERROR: Cover file not found: $CoverPath" -ForegroundColor Red
        return $false
    }
    
    if (!(Test-Path $FirstPagePath)) {
        Write-Host "ERROR: First page file not found: $FirstPagePath" -ForegroundColor Red
        return $false
    }
    
    if (!(Test-Path $ColoringPagesFolder)) {
        Write-Host "ERROR: Coloring pages folder not found: $ColoringPagesFolder" -ForegroundColor Red
        return $false
    }
    
    # Get all coloring pages (support .jpeg, .jpg, .png)
    $coloringPages = Get-ChildItem -Path $ColoringPagesFolder -Include *.jpeg,*.jpg,*.png -Recurse | Sort-Object Name
    
    if ($coloringPages.Count -eq 0) {
        Write-Host "ERROR: No image files found in $ColoringPagesFolder" -ForegroundColor Red
        return $false
    }
    
    Write-Host "  Found $($coloringPages.Count) coloring pages"
    
    # Create output directory if it doesn't exist
    $outputDir = Split-Path -Parent $OutputPath
    if (!(Test-Path $outputDir)) {
        New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
        Write-Host "  Created output directory: $outputDir"
    }
    
    # Build list of all images in order
    $allImages = @($CoverPath, $FirstPagePath) + $coloringPages.FullName
    
    Write-Host "  Converting $($allImages.Count) images to PDF..."
    
    # Create PDF with ImageMagick
    try {
        & magick convert $allImages -quality 90 -density 300 $OutputPath 2>$null
        
        if (Test-Path $OutputPath) {
            $fileSize = (Get-Item $OutputPath).Length / 1MB
            Write-Host "SUCCESS: Created $OutputPath" -ForegroundColor Green
            Write-Host "  Pages: $($allImages.Count)" -ForegroundColor Green
            Write-Host "  File size: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Green
            return $true
        } else {
            Write-Host "ERROR: PDF creation failed" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Create PDFs directory
$pdfDir = "PDFs"
if (!(Test-Path $pdfDir)) {
    New-Item -ItemType Directory -Path $pdfDir -Force | Out-Null
}

Write-Host "Output directory: $pdfDir`n" -ForegroundColor Cyan

# Track success/failure
$successful = @()
$failed = @()

# Create Chaos & Calm PDF
Write-Host "`n--- Chaos & Calm Collection ---" -ForegroundColor Cyan
if (Create-ColoringBookPDF `
    -ProductName "Chaos & Calm" `
    -CoverPath "Chaos-Calm\Chaos-and-Calm-Cover.png" `
    -FirstPagePath "Chaos-Calm\Chaos-and-Calm-First-Page.png" `
    -ColoringPagesFolder "Chaos-Calm\coloring-pages\" `
    -OutputPath "PDFs\Chaos-and-Calm-Coloring-Book.pdf") {
    $successful += "Chaos & Calm"
} else {
    $failed += "Chaos & Calm"
}

# Create Invisible Pain PDF
Write-Host "`n--- Invisible Pain Collection ---" -ForegroundColor Cyan
if (Create-ColoringBookPDF `
    -ProductName "Invisible Pain" `
    -CoverPath "Invisible-Pain\Invisible-Pain-Cover.png" `
    -FirstPagePath "Invisible-Pain\Invisible-Pain-First-Page.png" `
    -ColoringPagesFolder "Invisible-Pain\coloring-pages\" `
    -OutputPath "PDFs\Invisible-Pain-Coloring-Book.pdf") {
    $successful += "Invisible Pain"
} else {
    $failed += "Invisible Pain"
}

# Create Healing Lines PDF
Write-Host "`n--- Healing Lines Collection ---" -ForegroundColor Cyan
if (Create-ColoringBookPDF `
    -ProductName "Healing Lines" `
    -CoverPath "Healing-Lines\Healing-Lines-Cover.png" `
    -FirstPagePath "Healing-Lines\Healing-Lines-First-Page.png" `
    -ColoringPagesFolder "Healing-Lines\coloring-pages\" `
    -OutputPath "PDFs\Healing-Lines-Coloring-Book.pdf") {
    $successful += "Healing Lines"
} else {
    $failed += "Healing Lines"
}

# Create Abstract Mind Collection PDF (200 pages)
Write-Host "`n--- Abstract Mind Collection ---" -ForegroundColor Cyan
if (Create-ColoringBookPDF `
    -ProductName "Abstract Mind Collection" `
    -CoverPath "Abstract-Mind-Collection\Abstract-Mind-Collection-Cover.png" `
    -FirstPagePath "Abstract-Mind-Collection\Abstract-Mind-Collection-First-Page.png" `
    -ColoringPagesFolder "Abstract-Mind-Collection\all-pages\" `
    -OutputPath "PDFs\Abstract-Mind-Collection-Complete.pdf") {
    $successful += "Abstract Mind Collection"
} else {
    $failed += "Abstract Mind Collection"
}

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if ($successful.Count -gt 0) {
    Write-Host "`nSUCCESS: $($successful.Count) PDFs created" -ForegroundColor Green
    foreach ($product in $successful) {
        Write-Host "  ✓ $product" -ForegroundColor Green
    }
}

if ($failed.Count -gt 0) {
    Write-Host "`nFAILED: $($failed.Count) PDFs" -ForegroundColor Red
    foreach ($product in $failed) {
        Write-Host "  ✗ $product" -ForegroundColor Red
    }
    Write-Host "`nCommon issues:" -ForegroundColor Yellow
    Write-Host "  1. ImageMagick not installed (run: choco install imagemagick)" -ForegroundColor Yellow
    Write-Host "  2. Image files missing or in wrong folder" -ForegroundColor Yellow
    Write-Host "  3. Folder paths don't match your setup" -ForegroundColor Yellow
}

if ($successful.Count -eq 4) {
    Write-Host "`n🎉 All coloring book PDFs created successfully!" -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Cyan
    Write-Host "  1. Open each PDF in PDFs\ folder and verify pages" -ForegroundColor White
    Write-Host "  2. Print 1-2 test pages to check quality" -ForegroundColor White
    Write-Host "  3. Upload to Ko-fi, Payhip, or your website" -ForegroundColor White
    Write-Host "  4. LAUNCH and make passive income! 🚀" -ForegroundColor White
}

Write-Host "`n"

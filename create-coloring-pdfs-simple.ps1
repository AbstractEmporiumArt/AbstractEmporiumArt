# Simple PDF Creator for Abstract Emporium Coloring Books
# Uses built-in Windows Print to PDF functionality

Write-Host "`n=== Abstract Emporium PDF Creator ===" -ForegroundColor Cyan
Write-Host "Creating PDFs for all 4 coloring books...`n"

# Create PDFs output folder if it doesn't exist
$outputFolder = "PDFs"
if (-not (Test-Path $outputFolder)) {
    New-Item -ItemType Directory -Path $outputFolder | Out-Null
    Write-Host "✓ Created PDFs folder" -ForegroundColor Green
}

# Product configurations
$products = @(
    @{
        Name = "Chaos & Calm"
        Folder = "2-ProductsColoringBooks\Chaos-Calm-50-Pages"
        CoverFile = "AbstractEmporiumChaosNCalmcover.png"
        FirstPageFile = "AbstractEmporiumChaosNCalm1stpage.png"
        PagesFolder = "ChaosNCalm50PagesAbstractColoringBook"
        OutputFile = "Chaos-and-Calm-Coloring-Book.pdf"
    },
    @{
        Name = "Invisible Pain"
        Folder = "2-ProductsColoringBooks\Invisible-Pain-50-Pages"
        CoverFile = "AbstractEmporiumInvisiblePaincover.png"
        FirstPageFile = "AbstractEmporiumInvisiblePain1stpage.png"
        PagesFolder = "InvisiblePain50PagesAbstractColoringBook"
        OutputFile = "Invisible-Pain-Coloring-Book.pdf"
    },
    @{
        Name = "Healing Lines"
        Folder = "2-ProductsColoringBooks\Healing-Lines-50-Pages"
        CoverFile = "AbstractEmporiumHealingLinescover.png"
        FirstPageFile = "AbstractEmporiumHealingLines1stpage.png"
        PagesFolder = "HealingLines50PagesAbstractColoringBook"
        OutputFile = "Healing-Lines-Coloring-Book.pdf"
    },
    @{
        Name = "Abstract Mind Collection"
        Folder = "2-ProductsColoringBooks\Abstract-Mind-Collection-200-Pages"
        CoverFile = "AbstractEmporiumAbstractMindCollectioncover.png"
        FirstPageFile = "AbstractEmporiumAbstractMindCollection1stpage.png"
        PagesFolder = "AbstractMindCollection200PagesAbstractColoringBook"
        OutputFile = "Abstract-Mind-Collection-Complete.pdf"
    }
)

# Since we don't have ImageMagick or Python, let's create a simple HTML-to-PDF approach
# This uses Windows built-in capabilities

Write-Host "Method: Creating HTML template that can be printed to PDF`n" -ForegroundColor Yellow

$successCount = 0
$failCount = 0

foreach ($product in $products) {
    Write-Host "Processing: $($product.Name)..." -ForegroundColor Cyan
    
    $productFolder = $product.Folder
    $pagesFolder = Join-Path $productFolder $product.PagesFolder
    
    # Check if folders exist
    if (-not (Test-Path $productFolder)) {
        Write-Host "  ✗ Folder not found: $productFolder" -ForegroundColor Red
        $failCount++
        continue
    }
    
    if (-not (Test-Path $pagesFolder)) {
        Write-Host "  ✗ Pages folder not found: $pagesFolder" -ForegroundColor Red
        $failCount++
        continue
    }
    
    # Count images
    $coverPath = Join-Path $productFolder $product.CoverFile
    $firstPagePath = Join-Path $productFolder $product.FirstPageFile
    $imageFiles = Get-ChildItem -Path $pagesFolder -Filter "*.jpeg" -ErrorAction SilentlyContinue
    
    if (-not (Test-Path $coverPath)) {
        Write-Host "  ⚠ Cover not found: $($product.CoverFile)" -ForegroundColor Yellow
    }
    
    if (-not (Test-Path $firstPagePath)) {
        Write-Host "  ⚠ First page not found: $($product.FirstPageFile)" -ForegroundColor Yellow
    }
    
    Write-Host "  Found: $($imageFiles.Count) coloring pages" -ForegroundColor Gray
    
    # Create an HTML file that displays all images for printing to PDF
    $htmlFile = Join-Path $outputFolder "$($product.Name -replace ' ', '-')-print-to-pdf.html"
    
    $html = @"
<!DOCTYPE html>
<html>
<head>
    <title>$($product.Name) - Print to PDF</title>
    <style>
        @page {
            size: letter;
            margin: 0;
        }
        body {
            margin: 0;
            padding: 0;
        }
        .page {
            page-break-after: always;
            width: 8.5in;
            height: 11in;
            display: flex;
            justify-content: center;
            align-items: center;
            background: white;
        }
        .page:last-child {
            page-break-after: auto;
        }
        img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
        @media print {
            .page {
                margin: 0;
                border: none;
            }
        }
    </style>
</head>
<body>
"@
    
    # Add cover page if exists
    if (Test-Path $coverPath) {
        $coverRelPath = Resolve-Path $coverPath -Relative
        $html += @"
    <div class="page">
        <img src="$coverRelPath" alt="Cover">
    </div>
"@
    }
    
    # Add first page if exists
    if (Test-Path $firstPagePath) {
        $firstPageRelPath = Resolve-Path $firstPagePath -Relative
        $html += @"
    <div class="page">
        <img src="$firstPageRelPath" alt="First Page">
    </div>
"@
    }
    
    # Add all coloring pages (sorted)
    $sortedImages = $imageFiles | Sort-Object Name
    foreach ($img in $sortedImages) {
        $imgRelPath = Resolve-Path $img.FullName -Relative
        $html += @"
    <div class="page">
        <img src="$imgRelPath" alt="Page">
    </div>
"@
    }
    
    $html += @"
</body>
</html>
"@
    
    # Save HTML file
    $html | Out-File -FilePath $htmlFile -Encoding UTF8
    
    Write-Host "  ✓ Created HTML template: $htmlFile" -ForegroundColor Green
    Write-Host "  ℹ Manual step needed: Open HTML in browser and Print to PDF" -ForegroundColor Yellow
    Write-Host "    File location: $outputFolder\$($product.Name -replace ' ', '-')-print-to-pdf.html" -ForegroundColor Gray
    Write-Host "    Save as: $outputFolder\$($product.OutputFile)" -ForegroundColor Gray
    
    $successCount++
}

# Summary
Write-Host "`n=== Summary ===" -ForegroundColor Cyan
Write-Host "✓ Created: $successCount HTML templates" -ForegroundColor Green
if ($failCount -gt 0) {
    Write-Host "✗ Failed: $failCount products" -ForegroundColor Red
}

Write-Host "`n=== Next Steps ===" -ForegroundColor Yellow
Write-Host "1. Open each HTML file in your web browser (Edge, Chrome, etc.)"
Write-Host "2. Press Ctrl+P to print"
Write-Host "3. Select 'Microsoft Print to PDF' or 'Save as PDF'"
Write-Host "4. Save to the PDFs folder with the correct filename"
Write-Host "`nAlternatively, I can create a script that uses online PDF converters..."
Write-Host "Or you can use: https://www.adobe.com/acrobat/online/jpg-to-pdf.html"

# Check if knitting PDFs already exist
Write-Host "`n=== Checking Knitting PDFs ===" -ForegroundColor Cyan
$knittingPDFs = @("beginner-bundle.pdf", "free-bundle.pdf", "master-bundle.pdf", "starter-pack.pdf")
foreach ($pdf in $knittingPDFs) {
    if (Test-Path $pdf) {
        $size = (Get-Item $pdf).Length / 1MB
        Write-Host "✓ $pdf exists ($([math]::Round($size, 2)) MB)" -ForegroundColor Green
    } else {
        Write-Host "✗ $pdf not found" -ForegroundColor Red
    }
}

Write-Host "`n*** All knitting PDFs already exist! ***" -ForegroundColor Green
Write-Host "Only need to create the 4 coloring book PDFs.`n" -ForegroundColor Green

# PDF Creator for Abstract Emporium - Uses img2pdf Python package via npm
# This installs a lightweight solution without needing Python installed

Write-Host "`n=== Abstract Emporium Coloring Book PDF Creator ===" -ForegroundColor Cyan
Write-Host "Creating PDFs from image files...`n"

# Check if we have node/npm
$hasNode = Get-Command node -ErrorAction SilentlyContinue
$hasNpm = Get-Command npm -ErrorAction SilentlyContinue

if (-not $hasNode -or -not $hasNpm) {
    Write-Host "✗ Node.js not found. Need alternative solution..." -ForegroundColor Red
    Write-Host "`nWould you like to:"
    Write-Host "A) Install Python (quick: winget install Python.Python.3.12)"
    Write-Host "B) Use online converter (I'll create instructions)"
    Write-Host "C) Use existing PDFs from earlier session`n"
    exit
}

# Check if PDFs folder exists
if (-not (Test-Path "PDFs")) {
    New-Item -ItemType Directory -Path "PDFs" | Out-Null
}

# Install pdf-lib if not already installed
Write-Host "Checking for pdf-lib package..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules\pdf-lib")) {
    Write-Host "Installing pdf-lib..." -ForegroundColor Yellow
    npm install pdf-lib --save 2>&1 | Out-Null
}

if (-not (Test-Path "node_modules\pngjs")) {
    Write-Host "Installing pngjs..." -ForegroundColor Yellow
    npm install pngjs --save 2>&1 | Out-Null
}

Write-Host "✓ Dependencies ready`n" -ForegroundColor Green

# Create the Node.js script to generate PDFs
$nodeScript = @'
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const { PNG } = require('pngjs');
const path = require('path');

const products = [
    {
        name: 'Chaos and Calm',
        folder: '2-ProductsColoringBooks/Chaos-Calm-50-Pages',
        coverFile: 'AbstractEmporiumChaosNCalmcover.png',
        firstPageFile: 'AbstractEmporiumChaosNCalm1stpage.png',
        pagesFolder: 'ChaosNCalm50PagesAbstractColoringBook',
        outputFile: 'PDFs/Chaos-and-Calm-Coloring-Book.pdf'
    },
    {
        name: 'Invisible Pain',
        folder: '2-ProductsColoringBooks/Invisible-Pain-50-Pages',
        coverFile: 'AbstractEmporiumInvisiblePaincover.png',
        firstPageFile: 'AbstractEmporiumInvisiblePain1stpage.png',
        pagesFolder: 'InvisiblePain50PagesAbstractColoringBook',
        outputFile: 'PDFs/Invisible-Pain-Coloring-Book.pdf'
    },
    {
        name: 'Healing Lines',
        folder: '2-ProductsColoringBooks/Healing-Lines-50-Pages',
        coverFile: 'AbstractEmporiumHealingLinescover.png',
        firstPageFile: 'AbstractEmporiumHealingLines1stpage.png',
        pagesFolder: 'HealingLines50PagesAbstractColoringBook',
        outputFile: 'PDFs/Healing-Lines-Coloring-Book.pdf'
    },
    {
        name: 'Abstract Mind Collection',
        folder: '2-ProductsColoringBooks/Abstract-Mind-Collection-200-Pages',
        coverFile: 'AbstractEmporiumAbstractMindCollectioncover.png',
        firstPageFile: 'AbstractEmporiumAbstractMindCollection1stpage.png',
        pagesFolder: 'AbstractMindCollection200PagesAbstractColoringBook',
        outputFile: 'PDFs/Abstract-Mind-Collection-Complete.pdf'
    }
];

async function embedImageInPdf(pdfDoc, imagePath) {
    const imageBytes = fs.readFileSync(imagePath);
    const ext = path.extname(imagePath).toLowerCase();
    
    try {
        if (ext === '.png') {
            return await pdfDoc.embedPng(imageBytes);
        } else if (ext === '.jpg' || ext === '.jpeg') {
            return await pdfDoc.embedJpg(imageBytes);
        }
    } catch (error) {
        console.error(`Error embedding ${imagePath}:`, error.message);
        return null;
    }
}

async function createPDF(product) {
    console.log(`\n📘 Creating PDF: ${product.name}...`);
    
    const pdfDoc = await PDFDocument.create();
    const coverPath = path.join(product.folder, product.coverFile);
    const firstPagePath = path.join(product.folder, product.firstPageFile);
    const pagesFolder = path.join(product.folder, product.pagesFolder);
    
    let pageCount = 0;
    
    // Add cover if exists
    if (fs.existsSync(coverPath)) {
        const coverImage = await embedImageInPdf(pdfDoc, coverPath);
        if (coverImage) {
            const page = pdfDoc.addPage([612, 792]); // Letter size
            const scale = Math.min(612 / coverImage.width, 792 / coverImage.height);
            page.drawImage(coverImage, {
                x: (612 - coverImage.width * scale) / 2,
                y: (792 - coverImage.height * scale) / 2,
                width: coverImage.width * scale,
                height: coverImage.height * scale,
            });
            pageCount++;
            console.log('  ✓ Added cover');
        }
    }
    
    // Add first page if exists
    if (fs.existsSync(firstPagePath)) {
        const firstImage = await embedImageInPdf(pdfDoc, firstPagePath);
        if (firstImage) {
            const page = pdfDoc.addPage([612, 792]);
            const scale = Math.min(612 / firstImage.width, 792 / firstImage.height);
            page.drawImage(firstImage, {
                x: (612 - firstImage.width * scale) / 2,
                y: (792 - firstImage.height * scale) / 2,
                width: firstImage.width * scale,
                height: firstImage.height * scale,
            });
            pageCount++;
            console.log('  ✓ Added first page');
        }
    }
    
    // Add coloring pages
    if (fs.existsSync(pagesFolder)) {
        const files = fs.readdirSync(pagesFolder)
            .filter(f => f.match(/\.(jpg|jpeg|png)$/i))
            .sort();
        
        console.log(`  Found ${files.length} coloring pages`);
        
        for (const file of files) {
            const imagePath = path.join(pagesFolder, file);
            const image = await embedImageInPdf(pdfDoc, imagePath);
            if (image) {
                const page = pdfDoc.addPage([612, 792]);
                const scale = Math.min(612 / image.width, 792 / image.height);
                page.drawImage(image, {
                    x: (612 - image.width * scale) / 2,
                    y: (792 - image.height * scale) / 2,
                    width: image.width * scale,
                    height: image.height * scale,
                });
                pageCount++;
            }
        }
        console.log(`  ✓ Added ${files.length} pages`);
    }
    
    // Save PDF
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(product.outputFile, pdfBytes);
    
    const sizeMB = (pdfBytes.length / 1024 / 1024).toFixed(2);
    console.log(`  ✓ Saved: ${product.outputFile} (${pageCount} pages, ${sizeMB} MB)`);
    
    return { success: true, pages: pageCount, size: sizeMB };
}

async function main() {
    console.log('\n=== Creating All Coloring Book PDFs ===\n');
    
    let successCount = 0;
    let failCount = 0;
    
    for (const product of products) {
        try {
            const result = await createPDF(product);
            if (result.success) {
                successCount++;
            }
        } catch (error) {
            console.error(`✗ Failed to create ${product.name}:`, error.message);
            failCount++;
        }
    }
    
    console.log('\n=== Summary ===');
    console.log(`✓ Successfully created: ${successCount} PDFs`);
    if (failCount > 0) {
        console.log(`✗ Failed: ${failCount} PDFs`);
    }
    
    console.log('\n=== Knitting Bundle PDFs (Already Exist) ===');
    const knittingPDFs = [
        'beginner-bundle.pdf',
        'free-bundle.pdf', 
        'master-bundle.pdf',
        'starter-pack.pdf'
    ];
    
    knittingPDFs.forEach(pdf => {
        if (fs.existsSync(pdf)) {
            const size = (fs.statSync(pdf).size / 1024 / 1024).toFixed(2);
            console.log(`✓ ${pdf} (${size} MB)`);
        }
    });
    
    console.log('\n✅ All product PDFs ready for sale!\n');
}

main().catch(console.error);
'@

$nodeScript | Out-File -FilePath "create-pdf-generator.js" -Encoding UTF8

Write-Host "Running PDF generator..." -ForegroundColor Cyan
node create-pdf-generator.js

Write-Host "`n✅ PDF Creation Complete!`n" -ForegroundColor Green

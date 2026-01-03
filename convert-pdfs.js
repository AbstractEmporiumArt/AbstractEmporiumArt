const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Define the files to convert
const files = [
    { input: 'pdf-free-bundle.html', output: 'free-bundle.pdf' },
    { input: 'pdf-beginner-bundle.html', output: 'beginner-bundle.pdf' },
    { input: 'pdf-starter-pack.html', output: 'starter-pack.pdf' },
    { input: 'pdf-master-bundle.html', output: 'master-bundle.pdf' }
];

async function convertHTMLtoPDF() {
    console.log('🧶 Starting PDF conversion...\n');
    
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });

        for (const file of files) {
            const inputPath = path.resolve(__dirname, file.input);
            const outputPath = path.resolve(__dirname, file.output);
            
            console.log(`Converting: ${file.input} → ${file.output}`);
            
            // Check if file exists
            if (!fs.existsSync(inputPath)) {
                console.error(`  ❌ Input file not found: ${inputPath}`);
                continue;
            }
            
            let page;
            try {
                page = await browser.newPage();
                
                // Set viewport for consistent rendering
                await page.setViewport({ width: 1280, height: 1024 });
                
                // Convert file:// URL - use forward slashes
                const fileURL = `file:///${inputPath.replace(/\\/g, '/')}`;
                
                // Load the HTML file
                await page.goto(fileURL, { waitUntil: 'networkidle0', timeout: 30000 });
                
                // Generate PDF
                await page.pdf({
                    path: outputPath,
                    format: 'A4',
                    margin: {
                        top: '0.5in',
                        right: '0.5in',
                        bottom: '0.5in',
                        left: '0.5in'
                    },
                    printBackground: true
                });
                
                console.log(`  ✅ Created: ${file.output}`);
            } catch (pageError) {
                console.error(`  ❌ Failed to convert ${file.input}:`, pageError.message);
            } finally {
                if (page) await page.close();
            }
        }
        
        console.log('\n✅ All PDFs created successfully!\n');
        console.log('📁 Files location:');
        files.forEach(file => {
            const filePath = path.resolve(__dirname, file.output);
            if (fs.existsSync(filePath)) {
                const size = (fs.statSync(filePath).size / 1024).toFixed(2);
                console.log(`   ✓ ${file.output} (${size} KB)`);
            }
        });
        
    } catch (error) {
        console.error('❌ Error during conversion:', error);
    } finally {
        if (browser) await browser.close();
    }
}

// Run the conversion
convertHTMLtoPDF().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});

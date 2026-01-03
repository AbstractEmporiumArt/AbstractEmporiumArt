# HOW TO CONVERT HTML TO PDF FOR LEMONSQUEEZY

You now have 4 PDF template files as HTML. Here's how to convert them to actual PDF files for upload to Lemonsqueezy.

---

## OPTION 1: Use Your Browser (Easiest)

### **For Windows (any browser):**

1. **Open the HTML file:**
   - Right-click on `pdf-free-bundle.html`
   - Select "Open with" → Your browser (Chrome, Edge, Safari, Firefox)

2. **Convert to PDF:**
   - Press **Ctrl + P** (or Cmd + P on Mac)
   - Click "Print"
   - Under "Destination" select **"Save as PDF"**
   - Filename: `free-bundle.pdf`
   - Click **Save**

3. **Repeat for all 4 files:**
   ```
   pdf-free-bundle.html → free-bundle.pdf
   pdf-beginner-bundle.html → beginner-bundle.pdf
   pdf-starter-pack.html → starter-pack.pdf
   pdf-master-bundle.html → master-bundle.pdf
   ```

### **File Locations:**
Save all PDFs in the same folder as your HTML files:
```
c:\Users\bookw\OneDrive\Desktop\Abstract Emporium\1Site-AbstractEmporium\
```

---

## OPTION 2: Use Node.js (Automatic, what you have)

You already have `pdfkit` in your package.json! We can create a script to auto-convert.

### **Create conversion script:**

Create a new file: `convert-pdfs.js`

```javascript
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Function to convert HTML to PDF
async function convertHTMLtoPDF(inputFile, outputFile) {
    const doc = new PDFDocument({
        bufferPages: true,
        margins: { top: 40, bottom: 40, left: 40, right: 40 }
    });

    const stream = fs.createWriteStream(outputFile);
    doc.pipe(stream);

    // Read the HTML file and add to PDF
    const html = fs.readFileSync(inputFile, 'utf8');
    
    // Extract text from HTML and add to PDF
    // This is simplified - for production, use a proper HTML to PDF library
    doc.text('See the browser-based PDF export method below for best results');
    
    doc.end();
    
    return new Promise((resolve) => {
        stream.on('finish', resolve);
    });
}

// Don't use this method - use browser method instead
console.log('Use the browser method (Option 1) for best PDF quality');
```

**Instead, just use Option 1 (browser). It's faster and looks better.**

---

## OPTION 3: Use Online PDF Converter (Alternative)

If you prefer not to use your browser's built-in print:

1. **Go to:** https://html2pdf.com or https://cloudconvert.com
2. **Upload** your HTML file
3. **Download** the PDF
4. **Repeat** for all 4 files

---

## STEP-BY-STEP: Convert All 4 PDFs (Recommended)

### **Step 1: Convert Free Bundle**
1. Open `pdf-free-bundle.html` in your browser
2. Press **Ctrl + P** (Windows) or **Cmd + P** (Mac)
3. Select "Save as PDF"
4. Filename: `free-bundle.pdf`
5. Click Save in your project folder

### **Step 2: Convert Beginner Bundle**
1. Open `pdf-beginner-bundle.html`
2. Press **Ctrl + P**
3. Save as: `beginner-bundle.pdf`

### **Step 3: Convert Starter Pack**
1. Open `pdf-starter-pack.html`
2. Press **Ctrl + P**
3. Save as: `starter-pack.pdf`

### **Step 4: Convert Master Bundle**
1. Open `pdf-master-bundle.html`
2. Press **Ctrl + P**
3. Save as: `master-bundle.pdf`

---

## Verify Your PDFs

After creating all 4 PDFs, verify they exist:

**Windows:**
```powershell
# In PowerShell, navigate to your project folder
cd "c:\Users\bookw\OneDrive\Desktop\Abstract Emporium\1Site-AbstractEmporium\"

# List PDF files
Get-ChildItem *.pdf
```

You should see:
```
- beginner-bundle.pdf
- free-bundle.pdf
- master-bundle.pdf
- starter-pack.pdf
```

---

## Upload to Lemonsqueezy

Once you have all 4 PDF files:

1. **Go to:** https://abstractemporiumart.lemonsqueezy.com
2. **Dashboard → Products**
3. **For each product:**
   - Click "Edit"
   - Scroll to "Files & Delivery"
   - Click "Add File"
   - Select the corresponding PDF
   - Save

**Mapping:**
- Free Bundle → `free-bundle.pdf`
- Beginner Bundle → `beginner-bundle.pdf`
- Starter Pack → `starter-pack.pdf`
- Master Bundle → `master-bundle.pdf`

---

## PDF Quality Tips

The browser print method produces good PDFs. If you want to optimize:

### **In Print Dialog:**
- Set margins to "Minimal" or "0.5 inches"
- Paper size: Letter (8.5 x 11)
- Orientation: Portrait
- Uncheck "Headers and footers"
- Background graphics: ON

### **The PDFs will include:**
✅ All text and formatting
✅ Colored sections and highlights
✅ Page breaks (good for digital reading)
✅ Proper sizing for screen viewing

---

## What Happens After Upload

When customers purchase:

1. **Free Bundle:** Gets `free-bundle.pdf` instantly
2. **Beginner ($19):** Gets `beginner-bundle.pdf` + email confirmation
3. **Starter ($39):** Gets `starter-pack.pdf` + welcome email
4. **Master ($79):** Gets `master-bundle.pdf` + VIP access email

Lemonsqueezy handles all the delivery automatically. Customer gets email with PDF link.

---

## Quick Summary

| Step | Action | Time |
|------|--------|------|
| 1 | Open `pdf-free-bundle.html` in browser | 30 sec |
| 2 | Press Ctrl+P → Save as PDF | 1 min |
| 3 | Repeat for other 3 files | 3 min |
| 4 | Upload PDFs to Lemonsqueezy | 5 min |
| **Total** | | **~10 min** |

---

## Next: Create Lemonsqueezy Products

Once PDFs are ready:

1. Go to Lemonsqueezy dashboard
2. Create 4 products (following guide: LEMONSQUEEZY_SETUP.md)
3. Upload PDFs to each product
4. Get payment links
5. Update your website buttons with those links

**Ready to convert your PDFs?**


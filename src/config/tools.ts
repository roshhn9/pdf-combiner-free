export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolHowToStep {
  name: string;
  text: string;
}

export interface ToolConfig {
  id: string;
  title: string;
  description: string;
  h1: string;
  iconName: string;
  category: 'organize' | 'convert-to' | 'convert-from' | 'optimize' | 'security' | 'advanced';
  popular?: boolean;
  howTo: ToolHowToStep[];
  faqs: ToolFAQ[];
  keywords: string[];
}

export const TOOLS: Record<string, ToolConfig> = {
  'merge-pdf': {
    id: 'merge-pdf',
    title: 'Merge PDF - Combine PDF Files Online for Free',
    description: 'Combine multiple PDF files into a single document in seconds. No registration required. Fast, secure, and 100% free PDF combiner.',
    h1: 'Merge PDF files',
    iconName: 'Merge',
    category: 'organize',
    popular: true,
    keywords: ['merge pdf', 'combine pdf', 'join pdf', 'pdf merger', 'concatenate pdf'],
    howTo: [
      { name: 'Upload Files', text: 'Select and upload multiple PDF files from your device.' },
      { name: 'Reorder Pages', text: 'Drag and drop files to arrange them in the order you want them merged.' },
      { name: 'Merge PDFs', text: 'Click the "Merge PDF" button to combine the files.' },
      { name: 'Download Result', text: 'Save the merged PDF file to your device.' }
    ],
    faqs: [
      { question: 'Is there a limit on how many PDFs I can merge?', answer: 'No, our tool is free and allows you to merge as many files as you need, with no size limits.' },
      { question: 'Are my files safe when using this tool?', answer: 'Absolutely. Your files are processed entirely in your web browser. They are not uploaded to any server, guaranteeing 100% privacy.' }
    ]
  },
  'split-pdf': {
    id: 'split-pdf',
    title: 'Split PDF - Separate PDF Pages Online for Free',
    description: 'Extract specific pages or split a PDF into separate files. Easily separate PDF pages online without software installation.',
    h1: 'Split PDF file',
    iconName: 'Split',
    category: 'organize',
    popular: true,
    keywords: ['split pdf', 'separate pdf pages', 'extract pdf pages', 'pdf splitter', 'cut pdf'],
    howTo: [
      { name: 'Upload PDF', text: 'Select the PDF file you want to split.' },
      { name: 'Configure Split Options', text: 'Choose to extract all pages, select custom page ranges, or split at specific pages.' },
      { name: 'Process File', text: 'Click "Split PDF" to execute the separation.' },
      { name: 'Download Files', text: 'Download the split pages as a ZIP file or individual documents.' }
    ],
    faqs: [
      { question: 'How can I split specific pages from a PDF?', answer: 'After uploading the file, you can type custom ranges (e.g., 1-3, 5) or click on pages to select which ones to extract.' },
      { question: 'Can I split password-protected PDFs?', answer: 'Yes, but you must enter the password first to unlock the file before splitting.' }
    ]
  },
  'compress-pdf': {
    id: 'compress-pdf',
    title: 'Compress PDF - Reduce PDF File Size Online for Free',
    description: 'Reduce the file size of your PDF while maintaining optimal quality. Easy, online, and safe PDF compression tool.',
    h1: 'Compress PDF file',
    iconName: 'Minimize2',
    category: 'optimize',
    popular: true,
    keywords: ['compress pdf', 'reduce pdf size', 'pdf compressor', 'shrink pdf file size', 'make pdf smaller'],
    howTo: [
      { name: 'Select PDF', text: 'Choose the PDF document you want to compress.' },
      { name: 'Select Quality Preset', text: 'Choose from extreme compression (lowest quality), recommended compression (good quality), or low compression (high quality).' },
      { name: 'Compress File', text: 'Click "Compress PDF" to reduce the file size.' },
      { name: 'Save File', text: 'Download the compressed PDF to your device.' }
    ],
    faqs: [
      { question: 'Does compressing a PDF lose quality?', answer: 'Our tool optimizes PDF elements and compresses images inside the PDF. Recommended settings balance file size and visual clarity perfectly.' },
      { question: 'How much can I reduce my PDF size?', answer: 'Depending on the images contained, you can often shrink PDFs by up to 70% to 90% of their original size.' }
    ]
  },
  'pdf-to-jpg': {
    id: 'pdf-to-jpg',
    title: 'PDF to JPG - Convert PDF Pages to Images Online',
    description: 'Convert PDF pages into high-quality JPG images. No installation required, fast conversion, and secure in-browser processing.',
    h1: 'Convert PDF to JPG',
    iconName: 'Image',
    category: 'convert-from',
    popular: true,
    keywords: ['pdf to jpg', 'pdf to image', 'convert pdf to jpg', 'pdf to jpeg converter', 'extract images from pdf'],
    howTo: [
      { name: 'Upload PDF', text: 'Select the PDF file you wish to convert.' },
      { name: 'Choose Export Type', text: 'Select "Convert entire pages" or "Extract single images".' },
      { name: 'Convert File', text: 'Click "Convert to JPG".' },
      { name: 'Download Images', text: 'Download all pages as a ZIP file or select individual images.' }
    ],
    faqs: [
      { question: 'What resolution are the exported JPGs?', answer: 'The images are exported at high-resolution 150 DPI by default, ensuring all text remains crisp and readable.' },
      { question: 'Can I extract only the images embedded in my PDF?', answer: 'Yes! The tool lets you choose between exporting full pages as images or extracting just the standalone images inside.' }
    ]
  },
  'jpg-to-pdf': {
    id: 'jpg-to-pdf',
    title: 'JPG to PDF - Convert JPG Images to PDF Online',
    description: 'Convert JPG, JPEG, and JPE images to PDF in seconds. Easily adjust layout, margins, and paper sizes client-side.',
    h1: 'Convert JPG to PDF',
    iconName: 'FileImage',
    category: 'convert-to',
    popular: true,
    keywords: ['jpg to pdf', 'convert jpg to pdf', 'image to pdf', 'jpeg to pdf', 'combine jpg to pdf'],
    howTo: [
      { name: 'Upload Images', text: 'Select one or more JPG images from your device.' },
      { name: 'Customize Layout', text: 'Adjust orientation, page size (A4, Letter, Auto), and margins.' },
      { name: 'Convert to PDF', text: 'Click "Convert to PDF" to generate the document.' },
      { name: 'Download PDF', text: 'Save the compiled PDF file.' }
    ],
    faqs: [
      { question: 'Can I combine multiple JPG files into one PDF?', answer: 'Yes! You can upload multiple JPGs, reorder them via drag-and-drop, and combine them into a single PDF document.' },
      { question: 'Is there a file size limit for images?', answer: 'No, because the image compilation is done client-side, the only limit is your browser memory.' }
    ]
  },
  'png-to-pdf': {
    id: 'png-to-pdf',
    title: 'PNG to PDF - Convert PNG Images to PDF Online',
    description: 'Convert PNG images to PDF files online for free. Clean layout options, support for transparent backgrounds, and secure browser-native rendering.',
    h1: 'Convert PNG to PDF',
    iconName: 'FileImage',
    category: 'convert-to',
    keywords: ['png to pdf', 'convert png to pdf', 'png to pdf converter', 'transparent png to pdf'],
    howTo: [
      { name: 'Upload PNGs', text: 'Select PNG files from your hard drive or mobile device.' },
      { name: 'Configure Layout', text: 'Arrange order, adjust orientation, margins, and page sizes.' },
      { name: 'Generate PDF', text: 'Click "Convert to PDF" to process the images.' },
      { name: 'Download PDF', text: 'Save your document instantly.' }
    ],
    faqs: [
      { question: 'Will my transparent PNG backgrounds turn black?', answer: 'No. Our converter preserves transparent PNG backgrounds by drawing them correctly onto white PDF canvas pages.' }
    ]
  },
  'word-to-pdf': {
    id: 'word-to-pdf',
    title: 'Word to PDF - Convert DOCX to PDF Online for Free',
    description: 'Convert Microsoft Word (DOCX) files to PDF documents online. High accuracy layout parser running directly in your browser.',
    h1: 'Convert Word to PDF',
    iconName: 'FileText',
    category: 'convert-to',
    popular: true,
    keywords: ['word to pdf', 'docx to pdf', 'convert word to pdf', 'doc to pdf online'],
    howTo: [
      { name: 'Select Word File', text: 'Choose a .docx file from your computer or phone.' },
      { name: 'Parse Layout', text: 'The browser reads the DOCX layout and prepares the document structure.' },
      { name: 'Render PDF', text: 'Click "Convert to PDF" to create the PDF.' },
      { name: 'Download PDF', text: 'Download your formatted PDF file.' }
    ],
    faqs: [
      { question: 'Does this require Microsoft Word?', answer: 'No, this tool uses open-source browser parsers to convert the file without requiring MS Office installed.' }
    ]
  },
  'pdf-to-word': {
    id: 'pdf-to-word',
    title: 'PDF to Word - Convert PDF to Editable DOCX Online',
    description: 'Convert PDF files to editable Word documents (DOCX) online. Extract text and structural layouts securely in your browser.',
    h1: 'Convert PDF to Word',
    iconName: 'FileEdit',
    category: 'convert-from',
    popular: true,
    keywords: ['pdf to word', 'pdf to docx', 'convert pdf to word', 'editable pdf to word'],
    howTo: [
      { name: 'Upload PDF', text: 'Upload the PDF document you want to edit in Word.' },
      { name: 'Extract Layout', text: 'The tool extracts text structures and placement.' },
      { name: 'Convert file', text: 'Click "Convert to Word".' },
      { name: 'Download Word Doc', text: 'Download the generated .docx file.' }
    ],
    faqs: [
      { question: 'Will the text remain editable in Word?', answer: 'Yes! The extracted text is converted into standard DOCX paragraphs, text frames, and tables so you can edit it immediately.' }
    ]
  },
  'excel-to-pdf': {
    id: 'excel-to-pdf',
    title: 'Excel to PDF - Convert Excel Sheets to PDF Online',
    description: 'Convert Excel tables and spreadsheets (.xlsx/.xls) to PDF format. Seamless page formatting, clean tables, and secure processing.',
    h1: 'Convert Excel to PDF',
    iconName: 'FileSpreadsheet',
    category: 'convert-to',
    keywords: ['excel to pdf', 'xlsx to pdf', 'convert spreadsheet to pdf', 'xls to pdf'],
    howTo: [
      { name: 'Select Excel File', text: 'Upload your .xlsx spreadsheet.' },
      { name: 'Preview Sheets', text: 'Choose which worksheets to include in the PDF.' },
      { name: 'Generate PDF', text: 'Click "Convert to PDF" to render spreadsheets into clean tables.' },
      { name: 'Download PDF', text: 'Download your PDF file.' }
    ],
    faqs: [
      { question: 'How are Excel columns fit into a PDF page?', answer: 'Our converter automatically adjusts scaling to fit sheet columns onto A4 or Letter landscape/portrait layouts, avoiding columns being cut off.' }
    ]
  },
  'powerpoint-to-pdf': {
    id: 'powerpoint-to-pdf',
    title: 'PowerPoint to PDF - Convert PPTX to PDF Online',
    description: 'Convert PowerPoint presentations (.pptx/.ppt) to PDF documents. High-quality slides layout preserved and rendered directly in-browser.',
    h1: 'Convert PowerPoint to PDF',
    iconName: 'Presentation',
    category: 'convert-to',
    keywords: ['powerpoint to pdf', 'pptx to pdf', 'convert ppt to pdf', 'slides to pdf'],
    howTo: [
      { name: 'Upload Presentation', text: 'Select the PPTX file you want to convert.' },
      { name: 'Process Slides', text: 'The slides are parsed and formatted into PDF pages.' },
      { name: 'Convert PPTX', text: 'Click "Convert to PDF".' },
      { name: 'Download PDF', text: 'Save the presentation PDF file.' }
    ],
    faqs: [
      { question: 'Will slide layouts and formatting be altered?', answer: 'Most text elements, shapes, and layouts are preserved during client-side slide extraction.' }
    ]
  },
  'rotate-pdf': {
    id: 'rotate-pdf',
    title: 'Rotate PDF - Rotate PDF Pages Online for Free',
    description: 'Rotate single or all pages of a PDF document. Drag, orient, and save your rotated pages instantly in-browser.',
    h1: 'Rotate PDF pages',
    iconName: 'RotateCw',
    category: 'organize',
    keywords: ['rotate pdf', 'rotate pdf pages', 'turn pdf', 'flip pdf pages', 'rotate pdf online'],
    howTo: [
      { name: 'Upload PDF', text: 'Select the PDF file that needs rotation.' },
      { name: 'Rotate Pages', text: 'Hover over individual pages to rotate them 90, 180, or 270 degrees, or rotate all pages at once.' },
      { name: 'Apply Changes', text: 'Click "Save Changes" to write the orientation properties.' },
      { name: 'Download PDF', text: 'Download the correctly rotated PDF.' }
    ],
    faqs: [
      { question: 'Can I rotate just one page instead of the entire document?', answer: 'Yes! The visual editor lets you click the rotate arrow on individual pages, or apply it globally.' }
    ]
  },
  'delete-pdf-pages': {
    id: 'delete-pdf-pages',
    title: 'Delete PDF Pages - Remove Pages from PDF Online',
    description: 'Remove unwanted pages from your PDF file. Visual page grid selection makes deleting pages quick and easy. Secure client-side.',
    h1: 'Delete pages from PDF',
    iconName: 'Trash2',
    category: 'organize',
    keywords: ['delete pdf pages', 'remove pages from pdf', 'cut pdf pages', 'delete pages online'],
    howTo: [
      { name: 'Upload PDF', text: 'Select the PDF document to remove pages from.' },
      { name: 'Select Pages to Remove', text: 'Click on the pages in the visual grid that you want to delete.' },
      { name: 'Delete Pages', text: 'Click "Delete Selected Pages".' },
      { name: 'Download Result', text: 'Save the new PDF with the deleted pages removed.' }
    ],
    faqs: [
      { question: 'Can I undo a deletion before downloading?', answer: 'Yes, you can easily deselect any pages in the grid before clicking the final button.' }
    ]
  },
  'extract-pdf-pages': {
    id: 'extract-pdf-pages',
    title: 'Extract PDF Pages - Save Specific Pages to New PDF',
    description: 'Extract specific pages from a PDF document and save them as a new PDF file. Visual grid page selection with zero data uploads.',
    h1: 'Extract pages from PDF',
    iconName: 'Download',
    category: 'organize',
    keywords: ['extract pdf pages', 'extract pages from pdf', 'save pages of pdf', 'pdf page extractor'],
    howTo: [
      { name: 'Upload PDF', text: 'Select the file from which you wish to extract pages.' },
      { name: 'Choose Pages', text: 'Select pages by typing a page range or clicking pages in the visual grid.' },
      { name: 'Extract Pages', text: 'Click "Extract Pages".' },
      { name: 'Download PDF', text: 'Save your extracted PDF containing only the selected pages.' }
    ],
    faqs: [
      { question: 'What is the difference between split and extract?', answer: 'Splitting separates the PDF into multiple documents, whereas extraction pulls selected pages to create a single new file.' }
    ]
  },
  'reorder-pdf-pages': {
    id: 'reorder-pdf-pages',
    title: 'Reorder PDF Pages - Rearrange Pages Online',
    description: 'Rearrange the pages of your PDF document. Dynamic drag-and-drop page editor allows fast and simple visual reordering.',
    h1: 'Reorder PDF pages',
    iconName: 'Sliders',
    category: 'organize',
    keywords: ['reorder pdf pages', 'rearrange pdf pages', 'change pdf page order', 'move pdf pages'],
    howTo: [
      { name: 'Upload PDF', text: 'Upload the PDF you want to reorder.' },
      { name: 'Drag and Drop', text: 'Drag pages and drop them into the desired order in the visual page grid.' },
      { name: 'Save Page Order', text: 'Click "Apply Changes".' },
      { name: 'Download PDF', text: 'Download the PDF with the updated page sequence.' }
    ],
    faqs: [
      { question: 'Is it easy to rearrange pages in a large PDF?', answer: 'Yes, our visual interface scales down large files into a clean thumbnails grid, enabling swift drag-and-drop operations.' }
    ]
  },
  'watermark-pdf': {
    id: 'watermark-pdf',
    title: 'Watermark PDF - Add Text or Image Watermark Online',
    description: 'Add text or image watermarks to all or specific pages of your PDF. Customize font, size, opacity, and rotation in the browser.',
    h1: 'Watermark PDF file',
    iconName: 'Stamp',
    category: 'security',
    keywords: ['watermark pdf', 'add watermark to pdf', 'pdf watermark creator', 'text watermark pdf'],
    howTo: [
      { name: 'Upload PDF', text: 'Select the PDF document to watermark.' },
      { name: 'Configure Watermark', text: 'Choose Text or Image watermark, customize text, size, opacity, color, angle, and position.' },
      { name: 'Add Watermark', text: 'Click "Add Watermark".' },
      { name: 'Download PDF', text: 'Save the watermarked PDF.' }
    ],
    faqs: [
      { question: 'Can I choose the transparency of the watermark?', answer: 'Yes! The opacity slider lets you adjust the watermark from fully opaque to a subtle translucent overlay.' }
    ]
  },
  'unlock-pdf': {
    id: 'unlock-pdf',
    title: 'Unlock PDF - Remove Password & Restrictions Online',
    description: 'Remove passwords, copying, printing, and modification restrictions from PDF files. Instant in-browser decryption.',
    h1: 'Unlock PDF security',
    iconName: 'Unlock',
    category: 'security',
    keywords: ['unlock pdf', 'remove pdf password', 'pdf decryption', 'pdf restriction remover', 'decrypt pdf'],
    howTo: [
      { name: 'Upload Locked PDF', text: 'Select the password-protected PDF.' },
      { name: 'Enter Password', text: 'Input the file owner password if required.' },
      { name: 'Remove Protection', text: 'Click "Unlock PDF" to strip all encryption and restriction flags.' },
      { name: 'Save Decrypted File', text: 'Download the fully unlocked PDF.' }
    ],
    faqs: [
      { question: 'Can I unlock a PDF if I do not know the password?', answer: 'For PDFs locked with a user password (required to view the file), you must input the password. Owner passwords (restricting editing/printing) can often be removed directly.' }
    ]
  },
  'protect-pdf': {
    id: 'protect-pdf',
    title: 'Protect PDF - Encrypt PDF with Password Online',
    description: 'Secure your PDF documents by adding a strong password. Encrypt PDF files client-side using industry-standard AES encryption.',
    h1: 'Password protect PDF',
    iconName: 'Lock',
    category: 'security',
    keywords: ['protect pdf', 'encrypt pdf', 'password protect pdf', 'secure pdf file', 'add password to pdf'],
    howTo: [
      { name: 'Upload PDF', text: 'Select the PDF you want to protect.' },
      { name: 'Enter Password', text: 'Set a strong password and re-enter it to confirm.' },
      { name: 'Encrypt PDF', text: 'Click "Protect PDF" to secure the file.' },
      { name: 'Download Secured PDF', text: 'Download your encrypted PDF.' }
    ],
    faqs: [
      { question: 'How secure is the password protection?', answer: 'Our tool encrypts your PDF file client-side using robust standard encryption parameters, meaning it cannot be opened without the password.' }
    ]
  },
  'add-page-numbers': {
    id: 'add-page-numbers',
    title: 'Add Page Numbers - Number PDF Pages Online for Free',
    description: 'Add page numbers to your PDF file. Customize position, numbering style, font size, and layout entirely in-browser.',
    h1: 'Add page numbers to PDF',
    iconName: 'Hash',
    category: 'security',
    keywords: ['add page numbers', 'number pdf pages', 'paginate pdf', 'page numbering online'],
    howTo: [
      { name: 'Upload PDF', text: 'Select the PDF document.' },
      { name: 'Configure Numbering', text: 'Choose location (header/footer, left/center/right), starting index, and number format.' },
      { name: 'Generate Numbers', text: 'Click "Add Page Numbers".' },
      { name: 'Save Document', text: 'Download your numbered PDF file.' }
    ],
    faqs: [
      { question: 'Can I skip numbering the first page?', answer: 'Yes! You can choose the exact page number to start numbering on, which is ideal for skipping cover pages.' }
    ]
  },
  'crop-pdf': {
    id: 'crop-pdf',
    title: 'Crop PDF - Crop PDF Margins & Page Sizes Online',
    description: 'Crop margins and adjust page dimensions of your PDF. Set custom sizes or use visual cropping boundaries client-side.',
    h1: 'Crop PDF margins',
    iconName: 'Crop',
    category: 'optimize',
    keywords: ['crop pdf', 'pdf crop margins', 'trim pdf pages', 'cut pdf margins', 'crop pdf online'],
    howTo: [
      { name: 'Upload PDF', text: 'Select the PDF file you wish to crop.' },
      { name: 'Adjust Crop Box', text: 'Drag the visual crop boundary handles on the page preview, or enter numeric coordinates.' },
      { name: 'Crop PDF', text: 'Click "Crop PDF" to apply boundaries.' },
      { name: 'Download PDF', text: 'Save your cropped document.' }
    ],
    faqs: [
      { question: 'Will cropping reduce my file size?', answer: 'Cropping changes the page viewing boxes (MediaBox). The content remains but is hidden outside the crop boundary, making it safer to read.' }
    ]
  },
  'resize-pdf': {
    id: 'resize-pdf',
    title: 'Resize PDF - Change PDF Page Size Online for Free',
    description: 'Change the paper size of your PDF pages. Scale or fit to standard dimensions like A4, A3, Letter, or custom page sizes.',
    h1: 'Resize PDF pages',
    iconName: 'Maximize2',
    category: 'optimize',
    keywords: ['resize pdf', 'change page size pdf', 'pdf paper size converter', 'scale pdf pages'],
    howTo: [
      { name: 'Upload PDF', text: 'Select the PDF file to resize.' },
      { name: 'Choose Page Size', text: 'Select standard page size presets (A4, Letter, A3) and set margins.' },
      { name: 'Resize Document', text: 'Click "Resize PDF" to scale pages.' },
      { name: 'Download PDF', text: 'Download the resized PDF file.' }
    ],
    faqs: [
      { question: 'Does resizing shrink the text?', answer: 'You can choose to scale the text/content proportionally to fit the new size, or keep the content size and modify just the margin borders.' }
    ]
  },
  'repair-pdf': {
    id: 'repair-pdf',
    title: 'Repair PDF - Fix Corrupted or Broken PDFs Online',
    description: 'Repair corrupted or unreadable PDF files. Rebuild cross-reference tables and recover data safely in your browser.',
    h1: 'Repair PDF file',
    iconName: 'Wrench',
    category: 'optimize',
    keywords: ['repair pdf', 'fix corrupted pdf', 'pdf recovery tool', 'recover broken pdf file'],
    howTo: [
      { name: 'Upload Damaged PDF', text: 'Select the corrupted PDF file.' },
      { name: 'Analyze File', text: 'The tool performs client-side syntax checks and rebuilds file indices.' },
      { name: 'Execute Repair', text: 'Click "Repair PDF" to rebuild structural components.' },
      { name: 'Save Repaired PDF', text: 'Download the recovered PDF file.' }
    ],
    faqs: [
      { question: 'Can this fix any broken PDF?', answer: 'It can fix files with corrupted xref tables, header issues, or syntax errors. If the file content is completely missing or blank, recovery may be limited.' }
    ]
  },
  'ocr-pdf': {
    id: 'ocr-pdf',
    title: 'OCR PDF - Convert Scanned PDFs to Searchable Text',
    description: 'Recognize text inside scanned PDFs and images using browser-native OCR. Generate searchable PDF files with selectable text.',
    h1: 'OCR PDF text recognition',
    iconName: 'ScanText',
    category: 'advanced',
    popular: true,
    keywords: ['ocr pdf', 'optical character recognition pdf', 'searchable pdf', 'extract text from scanned pdf'],
    howTo: [
      { name: 'Upload PDF', text: 'Select the scanned PDF file.' },
      { name: 'Choose OCR Language', text: 'Select the primary language of the text.' },
      { name: 'Process OCR', text: 'Click "OCR PDF" to run browser-native text recognition.' },
      { name: 'Save PDF', text: 'Download the searchable PDF containing selectable overlays.' }
    ],
    faqs: [
      { question: 'Does OCR happen on a server?', answer: 'No! Text recognition runs directly on your computer utilizing tesseract.js. Your document remains completely private.' }
    ]
  },
  'sign-pdf': {
    id: 'sign-pdf',
    title: 'Sign PDF - Draw or Type Signatures on PDF Online',
    description: 'Sign your PDF documents online for free. Draw your signature on a canvas, upload an image, or type text to sign your PDF.',
    h1: 'Sign PDF document',
    iconName: 'PenTool',
    category: 'security',
    popular: true,
    keywords: ['sign pdf', 'e-sign pdf', 'add signature to pdf', 'fill and sign pdf', 'draw signature online'],
    howTo: [
      { name: 'Upload PDF', text: 'Select the PDF document to sign.' },
      { name: 'Create Signature', text: 'Draw your signature, type it out, or upload a pre-made PNG image.' },
      { name: 'Place Signature', text: 'Place the signature on any page, resize it, and drag it to the correct spot.' },
      { name: 'Save Signed PDF', text: 'Click "Finish and Sign" and download the PDF.' }
    ],
    faqs: [
      { question: 'Is my digital signature legally binding?', answer: 'Yes, electronic signatures created with this tool are legally compliant for standard business transactions under the ESIGN Act and eIDAS regulations.' }
    ]
  },
  'compare-pdfs': {
    id: 'compare-pdfs',
    title: 'Compare PDFs - Highlight Differences Between PDF Files',
    description: 'Compare two PDF files and view differences side-by-side. Highlight changed text, additions, and deletions instantly.',
    h1: 'Compare PDF files',
    iconName: 'Columns',
    category: 'advanced',
    keywords: ['compare pdfs', 'pdf comparison tool', 'find differences in pdf', 'compare two pdf files'],
    howTo: [
      { name: 'Upload PDFs', text: 'Select the original PDF (File A) and the modified PDF (File B).' },
      { name: 'Analyze Content', text: 'The tool compares characters, words, and layouts.' },
      { name: 'Highlight Differences', text: 'Review highlighted additions (green) and deletions (red).' },
      { name: 'Download Summary', text: 'Export a PDF markup showing the differences.' }
    ],
    faqs: [
      { question: 'Does it compare formatting or just text?', answer: 'It compares textual data, words, and structure side-by-side to ensure content revisions are precisely tracked.' }
    ]
  },
  'organize-pdf': {
    id: 'organize-pdf',
    title: 'Organize PDF - Arrange, Merge, Delete, Rotate PDF Pages',
    description: 'Perform all PDF modifications in a single workspace. Sort, rotate, delete, insert, or merge pages dynamically.',
    h1: 'Organize PDF pages',
    iconName: 'LayoutGrid',
    category: 'organize',
    keywords: ['organize pdf', 'arrange pdf pages', 'manage pdf pages', 'edit pdf layout'],
    howTo: [
      { name: 'Upload PDF', text: 'Select the PDF file you want to organize.' },
      { name: 'Manage Layout', text: 'Drag to reorder, click to delete, or hover to rotate pages in the thumbnail view.' },
      { name: 'Apply Layout', text: 'Click "Save Organization".' },
      { name: 'Download PDF', text: 'Save your reorganized PDF document.' }
    ],
    faqs: [
      { question: 'Can I add pages from other PDFs here?', answer: 'Yes! The organizer lets you upload additional files and merge their pages into the active layout workspace.' }
    ]
  },
  'pdf-to-text': {
    id: 'pdf-to-text',
    title: 'PDF to Text - Extract Text from PDF Online for Free',
    description: 'Extract raw text from PDF files online. Instant, accurate browser extraction with no installation or uploads.',
    h1: 'Convert PDF to Text',
    iconName: 'FileText',
    category: 'convert-from',
    keywords: ['pdf to text', 'extract text from pdf', 'pdf to txt', 'convert pdf to text online'],
    howTo: [
      { name: 'Select PDF', text: 'Choose the PDF file to extract text from.' },
      { name: 'Extract Text', text: 'The browser reads the document content structures.' },
      { name: 'Preview Content', text: 'Review the extracted plain text in the workspace.' },
      { name: 'Download Text', text: 'Save the text (.txt) file or copy it to your clipboard.' }
    ],
    faqs: [
      { question: 'Can I extract text from a scanned PDF?', answer: 'For scanned PDFs (which contain photos of text), use our OCR PDF tool instead, which runs optical character recognition.' }
    ]
  },
  'pdf-to-png': {
    id: 'pdf-to-png',
    title: 'PDF to PNG - Convert PDF Pages to PNG Images Online',
    description: 'Convert PDF pages to high-quality transparent PNG images. Fast browser-native conversion with ZIP packaging.',
    h1: 'Convert PDF to PNG',
    iconName: 'Image',
    category: 'convert-from',
    keywords: ['pdf to png', 'convert pdf to png', 'pdf to png image converter', 'save pdf as png'],
    howTo: [
      { name: 'Upload PDF', text: 'Select the PDF you want to convert.' },
      { name: 'Render PNGs', text: 'The converter draws each page onto an image canvas.' },
      { name: 'Generate ZIP', text: 'Click "Convert to PNG" to compile images.' },
      { name: 'Download', text: 'Download the images as a ZIP file.' }
    ],
    faqs: [
      { question: 'Why choose PNG over JPG?', answer: 'PNG uses lossless compression, making it better for documents with text and diagrams to prevent blurriness.' }
    ]
  },
  'pdf-to-webp': {
    id: 'pdf-to-webp',
    title: 'PDF to WEBP - Convert PDF Pages to WEBP Images',
    description: 'Convert PDF pages into lightweight, high-performance WEBP images. Perfect for website display and fast loading.',
    h1: 'Convert PDF to WEBP',
    iconName: 'Image',
    category: 'convert-from',
    keywords: ['pdf to webp', 'convert pdf to webp', 'webp image converter', 'pages as webp'],
    howTo: [
      { name: 'Upload PDF', text: 'Select the PDF file.' },
      { name: 'Process Converter', text: 'The pages are rendered and optimized as WEBP files.' },
      { name: 'Download Images', text: 'Save images as a single ZIP package.' }
    ],
    faqs: [
      { question: 'What is the advantage of WEBP?', answer: 'WEBP images are 25-35% smaller than JPEG files of comparable quality, making them ideal for web usage.' }
    ]
  },
  'html-to-pdf': {
    id: 'html-to-pdf',
    title: 'HTML to PDF - Convert HTML or Webpages to PDF',
    description: 'Convert webpage URLs or raw HTML code into PDF documents. Preserves layout, styles, and images client-side.',
    h1: 'Convert HTML to PDF',
    iconName: 'Code',
    category: 'convert-to',
    keywords: ['html to pdf', 'convert url to pdf', 'save webpage as pdf', 'website to pdf'],
    howTo: [
      { name: 'Input Source', text: 'Paste a URL or write raw HTML code.' },
      { name: 'Format Settings', text: 'Configure page size, margins, and headers/footers.' },
      { name: 'Compile PDF', text: 'Click "Convert to PDF".' },
      { name: 'Download PDF', text: 'Save the rendered PDF.' }
    ],
    faqs: [
      { question: 'Can it convert pages requiring login?', answer: 'Since it processes in the client browser, if you can access the page, you can print/convert the HTML structure.' }
    ]
  },
  'images-to-pdf': {
    id: 'images-to-pdf',
    title: 'Images to PDF - Convert Multiple Images to PDF Online',
    description: 'Combine JPG, PNG, WEBP, BMP, and GIF images into a single PDF. Customize grid layouts, sizes, and margins.',
    h1: 'Convert Images to PDF',
    iconName: 'Images',
    category: 'convert-to',
    keywords: ['images to pdf', 'convert images to pdf', 'combine pictures to pdf', 'photo to pdf compiler'],
    howTo: [
      { name: 'Select Images', text: 'Upload images in any common format.' },
      { name: 'Arrange Layout', text: 'Drag images to rearrange, set layout formats, borders, and orientation.' },
      { name: 'Build PDF', text: 'Click "Convert to PDF" to compile the pictures.' },
      { name: 'Download File', text: 'Save the compiled PDF file.' }
    ],
    faqs: [
      { question: 'What formats are supported?', answer: 'We support JPG, JPEG, PNG, WEBP, GIF, and SVG images.' }
    ]
  },
  'scan-to-pdf': {
    id: 'scan-to-pdf',
    title: 'Scan to PDF - Scan Documents via Camera to PDF',
    description: 'Use your phone or webcam to scan paper documents. Apply contrast/grayscale filters and compile into a PDF instantly.',
    h1: 'Scan Document to PDF',
    iconName: 'Camera',
    category: 'convert-to',
    keywords: ['scan to pdf', 'mobile scanner pdf', 'scan document online', 'camera to pdf'],
    howTo: [
      { name: 'Open Camera', text: 'Allow webcam or phone camera access in the browser.' },
      { name: 'Capture Pages', text: 'Snap pictures of each document page.' },
      { name: 'Apply Filters', text: 'Crop boundaries and apply grayscale/high-contrast filters to improve readability.' },
      { name: 'Generate PDF', text: 'Click "Save to PDF" and download.' }
    ],
    faqs: [
      { question: 'Does this run on mobile phones?', answer: 'Yes! It is fully responsive and leverages your mobile phone camera as a high-quality document scanner.' }
    ]
  }
};

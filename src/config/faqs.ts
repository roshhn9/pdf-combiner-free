export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'merge' | 'split' | 'compress' | 'convert' | 'security' | 'advanced';
}

export const GLOBAL_FAQS: FAQItem[] = [
  // General Category (20 FAQs)
  {
    id: 'g1',
    category: 'general',
    question: 'How do these PDF tools work?',
    answer: 'Our platform processes all PDF actions client-side, meaning the parsing, merging, splitting, compressing, and editing occur entirely within your web browser. Your files never leave your computer, ensuring total privacy.'
  },
  {
    id: 'g2',
    category: 'general',
    question: 'Are my uploaded PDF files safe and secure?',
    answer: 'Absolutely! Since we use a 100% client-side architecture, your files are never uploaded to any remote server or stored in the cloud. Your data is completely safe, private, and compliant with privacy regulations.'
  },
  {
    id: 'g3',
    category: 'general',
    question: 'Is there a limit on file sizes I can process?',
    answer: 'Because processing happens on your device rather than our servers, there are no hard server-side file limits. The only limit is the available RAM and CPU performance of your device.'
  },
  {
    id: 'g4',
    category: 'general',
    question: 'Do I need to install any software or extensions?',
    answer: 'No. All tools are fully functional directly in any modern web browser (Chrome, Safari, Firefox, Edge). There is no software to install or browser extension needed.'
  },
  {
    id: 'g5',
    category: 'general',
    question: 'Can I use this PDF platform on my mobile phone?',
    answer: 'Yes! Our website is fully mobile-responsive and optimized for smartphone browsers. You can even use the Scan to PDF tool to capture documents directly using your phone\'s camera.'
  },
  {
    id: 'g6',
    category: 'general',
    question: 'Is this service completely free?',
    answer: 'Yes, our platform is completely free. We monetize through lightweight web advertising to cover domain costs. We plans to support ad-free premium plans and batch operations in the future.'
  },
  {
    id: 'g7',
    category: 'general',
    question: 'What web browsers are supported?',
    answer: 'We support all modern browsers, including Google Chrome, Apple Safari, Mozilla Firefox, Microsoft Edge, and Opera. Make sure your browser is updated for the best performance.'
  },
  {
    id: 'g8',
    category: 'general',
    question: 'Can I use these tools offline?',
    answer: 'Yes! Because our application is a Progressive Web App (PWA) and processes files locally, once you open the website, most tools can be used even if you lose your internet connection.'
  },
  {
    id: 'g9',
    category: 'general',
    question: 'Do you keep a copy of my document layout or text?',
    answer: 'No, we never copy, index, or store your text. No tracking data or file contents are sent to our systems.'
  },
  {
    id: 'g10',
    category: 'general',
    question: 'Why is client-side processing faster than cloud processing?',
    answer: 'Cloud processing requires uploading large files to a remote server, waiting for queue lines, processing, and then downloading the output. Client-side processing cuts out the upload/download time entirely, making operations near-instant.'
  },
  {
    id: 'g11',
    category: 'general',
    question: 'Can I undo actions on my files?',
    answer: 'Yes, during visual editing (like reordering pages, rotating pages, or selecting crop fields), you can adjust, clear, and undo changes before exporting the final PDF file.'
  },
  {
    id: 'g12',
    category: 'general',
    question: 'Do these tools support batch file handling?',
    answer: 'Yes! Tools like Merge PDF and Images to PDF allow you to select, sort, and process multiple files simultaneously in a single session.'
  },
  {
    id: 'g13',
    category: 'general',
    question: 'Are there any hidden costs or subscriptions?',
    answer: 'No, there are no hidden fees. All standard operations are completely free of charge.'
  },
  {
    id: 'g14',
    category: 'general',
    question: 'Why does my large PDF take a few seconds to load?',
    answer: 'For larger documents, your browser is parsing the file structures into memory. Performance depends on your device\'s hardware capability.'
  },
  {
    id: 'g15',
    category: 'general',
    question: 'What is a PDF?',
    answer: 'Portable Document Format (PDF) is a file format developed by Adobe to present documents, including text formatting and images, in a manner independent of application software, hardware, and operating systems.'
  },
  {
    id: 'g16',
    category: 'general',
    question: 'Does your platform support scanned PDF documents?',
    answer: 'Yes, our platform works on both native and scanned PDFs. You can even run our OCR tool to make scanned documents searchable.'
  },
  {
    id: 'g17',
    category: 'general',
    question: 'How do I add the website to my desktop as an app?',
    answer: 'Since our platform is a PWA, you can click the "Install App" button in your browser address bar (on Chrome/Edge) or select "Add to Home Screen" on Safari to install it.'
  },
  {
    id: 'g18',
    category: 'general',
    question: 'Does this platform support image transparency?',
    answer: 'Yes, when converting PNG images with transparency to PDF, we preserve background properties and draw them correctly.'
  },
  {
    id: 'g19',
    category: 'general',
    question: 'Are my generated files compatible with Adobe Reader?',
    answer: 'Yes, all PDFs compiled by our browser utilities comply with official PDF standard specifications and will open in Adobe Acrobat, PDF24, Chrome PDF viewer, and other software.'
  },
  {
    id: 'g20',
    category: 'general',
    question: 'Who can I contact if I find a bug?',
    answer: 'You can reach our development team via the Contact Link in our footer to report bugs or request features.'
  },

  // Merge Category (15 FAQs)
  {
    id: 'm1',
    category: 'merge',
    question: 'How do I combine PDF files?',
    answer: 'Select your files or drag them into our Merge PDF tool, drag the thumbnail cards to rearrange the page sequence, and click "Merge PDF" to download the combined document.'
  },
  {
    id: 'm2',
    category: 'merge',
    question: 'Can I merge images with my PDF documents?',
    answer: 'Yes. You can convert the images to PDF first, or use our general layout organizer to add files and merge them together.'
  },
  {
    id: 'm3',
    category: 'merge',
    question: 'Is there a page limit when merging?',
    answer: 'There is no set limit. You can merge files containing hundreds of pages as long as your device has enough memory to process them.'
  },
  {
    id: 'm4',
    category: 'merge',
    question: 'Can I merge encrypted PDFs?',
    answer: 'To merge password-protected PDFs, you must first unlock the files using their respective passwords before running the merge process.'
  },
  {
    id: 'm5',
    category: 'merge',
    question: 'Does merging alter the original PDF page size?',
    answer: 'No. The merged PDF preserves the original sizes, ratios, and orientations of each individual page. You can have mixed A4 and Letter pages in the same PDF.'
  },
  {
    id: 'm6',
    category: 'merge',
    question: 'Can I reorder pages after merging?',
    answer: 'Yes, before compiling, you can drag and drop file items in the merge view to rearrange their order, or use the Organize tool for page-by-page editing.'
  },
  {
    id: 'm7',
    category: 'merge',
    question: 'Will merging PDFs lose quality?',
    answer: 'No, merging only aggregates page objects and links them under a single catalog structure. The text and images are not re-compressed, preserving original quality.'
  },
  {
    id: 'm8',
    category: 'merge',
    question: 'Can I merge files on my iPhone?',
    answer: 'Yes, our mobile interface supports multiple file uploads and easy reordering via mobile touch gestures.'
  },
  {
    id: 'm9',
    category: 'merge',
    question: 'What is the fastest way to combine PDFs?',
    answer: 'Simply select all your PDF files at once, drop them in the merge tool workspace, and click Merge. Since there are no network upload delays, it finishes in seconds.'
  },
  {
    id: 'm10',
    category: 'merge',
    question: 'Will hyperlinks be active after combining?',
    answer: 'Yes, internal document hyperlinks and external links are preserved in the merged file.'
  },
  {
    id: 'm11',
    category: 'merge',
    question: 'Why did my PDF fail to merge?',
    answer: 'This can happen if one of the files is heavily corrupted or has tight security flags. Try running the Repair PDF tool on the file first.'
  },
  {
    id: 'm12',
    category: 'merge',
    question: 'Can I combine portfolios or attachments?',
    answer: 'Yes, portfolios are compiled by combining the document pages sequentially.'
  },
  {
    id: 'm13',
    category: 'merge',
    question: 'Is it possible to merge scanned forms?',
    answer: 'Yes, scanned forms are treated as image pages and can be merged in the exact same manner as native documents.'
  },
  {
    id: 'm14',
    category: 'merge',
    question: 'Can I merge duplicate pages?',
    answer: 'Yes, you can upload the same file multiple times to duplicate sections in the final output.'
  },
  {
    id: 'm15',
    category: 'merge',
    question: 'What tool should I use to reorder pages of a single PDF?',
    answer: 'Use the Reorder PDF Pages or Organize PDF tool to edit the page sequences visually.'
  },

  // Split Category (15 FAQs)
  {
    id: 's1',
    category: 'split',
    question: 'How do I split a PDF file?',
    answer: 'Upload your file in the Split PDF tool, choose whether you want to extract specific page ranges (e.g., 2-5) or split the PDF at every page, and click "Split PDF".'
  },
  {
    id: 's2',
    category: 'split',
    question: 'Can I extract non-consecutive pages?',
    answer: 'Yes, you can select custom page indexes like "2, 5, 8-11" to extract exactly the pages you need.'
  },
  {
    id: 's3',
    category: 'split',
    question: 'Are split pages downloaded individually or in a ZIP file?',
    answer: 'If your split config yields multiple files, we package them into a single .zip file for convenience so you can download them with a single click.'
  },
  {
    id: 's4',
    category: 'split',
    question: 'Can I split a PDF into files containing two pages each?',
    answer: 'Yes, you can define recurring split intervals or choose custom range segments.'
  },
  {
    id: 's5',
    category: 'split',
    question: 'How do I remove page 3 from my PDF?',
    answer: 'You can use the Delete PDF Pages tool, select page 3, and save the document. Or use Split PDF to extract page ranges "1-2" and "4-end" and merge them.'
  },
  {
    id: 's6',
    category: 'split',
    question: 'Does splitting a PDF delete the original file?',
    answer: 'No! The original PDF remains untouched on your device. The tool generates a new set of PDF files containing the split contents.'
  },
  {
    id: 's7',
    category: 'split',
    question: 'Is there a limit on how many parts I can split my PDF into?',
    answer: 'No, you can split a 500-page document into 500 individual single-page PDFs if required.'
  },
  {
    id: 's8',
    category: 'split',
    question: 'Why did my split PDF download as a ZIP file?',
    answer: 'To prevent your browser from opening multiple download dialog boxes for each page, we bundle them into a single ZIP archive.'
  },
  {
    id: 's9',
    category: 'split',
    question: 'Can I extract bookmarks as split points?',
    answer: 'Currently, you can manually input the page numbers listed in your bookmarks structure.'
  },
  {
    id: 's10',
    category: 'split',
    question: 'Can I split password-secured documents?',
    answer: 'You must provide the password first, which allows the tool to read the file nodes and split them.'
  },
  {
    id: 's11',
    category: 'split',
    question: 'Are hyperlinks maintained in split documents?',
    answer: 'Yes, external links remain active. Internal hyperlinks to pages that were removed will become dead links.'
  },
  {
    id: 's12',
    category: 'split',
    question: 'Can I split PDFs using mobile Safari?',
    answer: 'Yes, it works smoothly on mobile Safari and downloads the zip file to your Files app.'
  },
  {
    id: 's13',
    category: 'split',
    question: 'What is the fastest way to extract page 1?',
    answer: 'Drop the file in Split PDF, select page range "1", and click split.'
  },
  {
    id: 's14',
    category: 'split',
    question: 'Can I review pages before splitting?',
    answer: 'Yes, the split tool displays high-quality page thumbnails so you can visually identify which page is which.'
  },
  {
    id: 's15',
    category: 'split',
    question: 'Can I rename split files before downloading?',
    answer: 'Files are automatically named with page ranges appended, and you can rename them once saved.'
  },

  // Compress Category (15 FAQs)
  {
    id: 'c1',
    category: 'compress',
    question: 'How do I reduce a PDF file size?',
    answer: 'Drag and drop your file in our Compress PDF tool, select a compression preset (Extreme, Recommended, or Low), and click "Compress PDF".'
  },
  {
    id: 'c2',
    category: 'compress',
    question: 'Will compressing a PDF make the text blurry?',
    answer: 'Our Recommended compression maintains high-quality text components and only optimizes image quality and embedded fonts, ensuring text remains sharp.'
  },
  {
    id: 'c3',
    category: 'compress',
    question: 'How does client-side compression work?',
    answer: 'The compression algorithm reads the PDF, resizes embedded images on Canvas objects, downsamples image resolution, and removes unused font subsets, compiling a smaller file.'
  },
  {
    id: 'c4',
    category: 'compress',
    question: 'Why did my PDF not get any smaller?',
    answer: 'If a PDF contains only text and vector graphics without embedded images, or if it is already compressed, there is very little metadata to shrink, resulting in minimal size changes.'
  },
  {
    id: 'c5',
    category: 'compress',
    question: 'Which compression level should I choose?',
    answer: 'Use "Recommended Compression" for a great balance between size reduction and visual clarity. Use "Extreme Compression" if you have strict file limits.'
  },
  {
    id: 'c6',
    category: 'compress',
    question: 'Can I compress scanned PDF documents?',
    answer: 'Yes! Scanned PDFs are essentially images wrapped in pages, making them the best candidates for compression. They often shrink by 80% or more.'
  },
  {
    id: 'c7',
    category: 'compress',
    question: 'Does compressing remove PDF signatures?',
    answer: 'Depending on the signature implementation, compressing may remove signature flags to rebuild the structure. We recommend signing your PDF *after* compressing it.'
  },
  {
    id: 'c8',
    category: 'compress',
    question: 'What is the limit for compressing a file?',
    answer: 'There is no limit on input file size, but very large files (over 100MB) can take some time to process in the browser.'
  },
  {
    id: 'c9',
    category: 'compress',
    question: 'Will compression alter form fields?',
    answer: 'No, form fields and text structures are preserved.'
  },
  {
    id: 'c10',
    category: 'compress',
    question: 'Can I compress multiple files at once?',
    answer: 'Yes, you can upload multiple PDFs and apply compression settings to all of them.'
  },
  {
    id: 'c11',
    category: 'compress',
    question: 'Does it support color profile preservation?',
    answer: 'Yes, basic RGB colors are preserved during canvas-based image re-compression.'
  },
  {
    id: 'c12',
    category: 'compress',
    question: 'How long does compression take?',
    answer: 'Most standard files (under 10MB) compress in less than 3 seconds.'
  },
  {
    id: 'c13',
    category: 'compress',
    question: 'Will bookmarks be deleted during compression?',
    answer: 'No. Outline trees and bookmarks are preserved in the optimized output.'
  },
  {
    id: 'c14',
    category: 'compress',
    question: 'Can I run PDF compression on iPad?',
    answer: 'Yes, it works fully on iOS Safari and Chrome mobile browsers.'
  },
  {
    id: 'c15',
    category: 'compress',
    question: 'Is PDF compression lossy or lossless?',
    answer: 'It is a combination. Font stripping is lossless, but image optimization is slightly lossy to achieve major size reductions.'
  },

  // Convert Category (15 FAQs)
  {
    id: 'co1',
    category: 'convert',
    question: 'Can I convert JPG images to PDF?',
    answer: 'Yes! Our JPG to PDF and Images to PDF tools allow you to drop images, arrange them, adjust margins, and export a clean PDF document.'
  },
  {
    id: 'co2',
    category: 'convert',
    question: 'How do I turn a PDF page into a JPG?',
    answer: 'Use the PDF to JPG tool, select your file, choose page output options, and download the high-resolution JPG files.'
  },
  {
    id: 'co3',
    category: 'convert',
    question: 'Can I convert Word documents (.docx) to PDF without Microsoft Office?',
    answer: 'Yes! Our Word to PDF tool parses the DOCX file structures in Javascript and generates a PDF preview for download without Word installed.'
  },
  {
    id: 'co4',
    category: 'convert',
    question: 'Can I convert PDF back to Excel tables?',
    answer: 'Our PDF to Excel/Word parsers read text layouts and construct spreadsheet structures or formatted documents for editing.'
  },
  {
    id: 'co5',
    category: 'convert',
    question: 'What image formats can I convert to PDF?',
    answer: 'We support JPG, JPEG, PNG, WEBP, GIF, and BMP formats.'
  },
  {
    id: 'co6',
    category: 'convert',
    question: 'Will formatting change when converting Word to PDF?',
    answer: 'Standard document fonts, lists, margins, and table grids are mapped closely. Highly complex layouts might experience minor alignment adjustments.'
  },
  {
    id: 'co7',
    category: 'convert',
    question: 'Can I convert a webpage (HTML) to PDF?',
    answer: 'Yes! Paste a website URL or enter HTML markup in the HTML to PDF tool to capture and export the page.'
  },
  {
    id: 'co8',
    category: 'convert',
    question: 'Will PNG transparency remain after converting to PDF?',
    answer: 'Yes. The background transparency is supported during image-to-PDF vector drawing.'
  },
  {
    id: 'co9',
    category: 'convert',
    question: 'How do I extract text from a PDF document?',
    answer: 'Use the PDF to Text tool to instantly extract raw characters and export them as a .txt file.'
  },
  {
    id: 'co10',
    category: 'convert',
    question: 'Can I convert slides (PPTX) to PDF?',
    answer: 'Yes. Upload your PowerPoint presentation, and we will extract the layouts and text to build slide pages.'
  },
  {
    id: 'co11',
    category: 'convert',
    question: 'Can I scan physical receipts to PDF?',
    answer: 'Yes! Use our Scan to PDF tool on your mobile phone to snap pictures of receipts and compile them.'
  },
  {
    id: 'co12',
    category: 'convert',
    question: 'How do I extract only images from a PDF?',
    answer: 'Use our PDF to JPG tool and choose the "Extract embedded images" options.'
  },
  {
    id: 'co13',
    category: 'convert',
    question: 'What resolution is PDF to PNG?',
    answer: 'PDF pages are rendered at 150-200 DPI resolution, providing sharp and clear text images.'
  },
  {
    id: 'co14',
    category: 'convert',
    question: 'Does PDF to WEBP work in Safari?',
    answer: 'Yes, Safari has native WEBP encoding support, so it works perfectly.'
  },
  {
    id: 'co15',
    category: 'convert',
    question: 'Can I merge images and PDFs at the same time?',
    answer: 'Yes, use the Organize PDF tool to upload multiple formats and assemble them.'
  },

  // Security Category (10 FAQs)
  {
    id: 'sec1',
    category: 'security',
    question: 'How do I password protect a PDF?',
    answer: 'Upload your file in our Protect PDF tool, enter a secure password, and download the newly encrypted file.'
  },
  {
    id: 'sec2',
    category: 'security',
    question: 'What encryption standard is used for passwords?',
    answer: 'We use standard 128-bit/256-bit RC4 and AES algorithms to secure PDF files.'
  },
  {
    id: 'sec3',
    category: 'security',
    question: 'Can I sign a PDF without printing it?',
    answer: 'Yes! Use the Sign PDF tool, draw your signature, place it on the form, and save. It is 100% digital.'
  },
  {
    id: 'sec4',
    category: 'security',
    question: 'Is my digital signature secure?',
    answer: 'Yes, since your signature drawing is processed client-side, your signature image is never sent to any server, avoiding security risks.'
  },
  {
    id: 'sec5',
    category: 'security',
    question: 'How do I remove watermarks from a PDF?',
    answer: 'Watermarks can be covered, or you can split and re-save pages. Restricting watermark edits depends on the file security permissions.'
  },
  {
    id: 'sec6',
    category: 'security',
    question: 'How can I add page numbers to my PDF?',
    answer: 'Use the Add Page Numbers tool, choose position presets (e.g., Bottom Right), font style, and hit generate.'
  },
  {
    id: 'sec7',
    category: 'security',
    question: 'Can I unlock a secured PDF file?',
    answer: 'If you have permission or the password, you can upload it in Unlock PDF to remove restrictions permanently.'
  },
  {
    id: 'sec8',
    category: 'security',
    question: 'How do I add a text watermark to my document?',
    answer: 'Upload your file in the Watermark PDF tool, type your watermark (e.g., CONFIDENTIAL), customize opacity, and generate.'
  },
  {
    id: 'sec9',
    category: 'security',
    question: 'Are electronically signed PDFs legally binding?',
    answer: 'Yes, standard electronic signatures on PDFs are legally binding under ESIGN and eIDAS acts.'
  },
  {
    id: 'sec10',
    category: 'security',
    question: 'Can I encrypt PDFs on mobile phones?',
    answer: 'Yes, Protect PDF runs client-side and secure passwords can be applied via iOS or Android browser.'
  },

  // Advanced Category (10 FAQs)
  {
    id: 'adv1',
    category: 'advanced',
    question: 'What is OCR in PDF tools?',
    answer: 'Optical Character Recognition (OCR) analyzes the visual pixels of scanned document images, recognizes characters, and embeds a selectable text layer behind them.'
  },
  {
    id: 'adv2',
    category: 'advanced',
    question: 'Does the OCR tool support multiple languages?',
    answer: 'Yes! Our OCR tool uses tesseract.js and supports multiple language packs including English, Spanish, French, German, Chinese, and more.'
  },
  {
    id: 'adv3',
    category: 'advanced',
    question: 'How do I compare two PDF files side-by-side?',
    answer: 'Upload the two files in Compare PDFs. The tool will parse and highlight deletions in red and additions in green.'
  },
  {
    id: 'adv4',
    category: 'advanced',
    question: 'What is the "Repair PDF" tool?',
    answer: 'It reads malformed PDF byte structures, fixes broken references or indexes (xref tables), and writes a standardized file.'
  },
  {
    id: 'adv5',
    category: 'advanced',
    question: 'Can I crop PDF pages visually?',
    answer: 'Yes, Crop PDF provides adjustable boundary boxes to trim margins from single pages or the entire document.'
  },
  {
    id: 'adv6',
    category: 'advanced',
    question: 'How do I change the page dimensions to A4?',
    answer: 'Use the Resize PDF tool, select A4, choose alignment margins, and scale contents.'
  },
  {
    id: 'adv7',
    category: 'advanced',
    question: 'Can OCR work offline?',
    answer: 'Yes. Once tesseract.js model files are loaded in browser cache, you can process OCR documents completely offline.'
  },
  {
    id: 'adv8',
    category: 'advanced',
    question: 'Why does OCR take longer than other tools?',
    answer: 'OCR is a complex machine learning process that analyzes pixels. It can take 5-10 seconds per page depending on layout size.'
  },
  {
    id: 'adv9',
    category: 'advanced',
    question: 'Does the Compare PDFs tool show visual image differences?',
    answer: 'It focuses on textual content variations to track draft revisions.'
  },
  {
    id: 'adv10',
    category: 'advanced',
    question: 'Can I repair PDFs password-locked by others?',
    answer: 'No, you must unlock the document password before repairing its byte structures.'
  }
];

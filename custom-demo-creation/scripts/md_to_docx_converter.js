const fs = require('fs');
const path = require('path');
const docx = require('docx');

/**
 * Converts a Markdown file to a DOCX document.
 * Usage: Set session.md_input_path and session.docx_output_path before calling.
 * 
 * Supports: headings (h1-h4), bold, italic, bullet lists, numbered lists,
 * blockquotes, horizontal rules, code blocks, and paragraphs.
 */

const mdPath = session.md_input_path;
const docxPath = session.docx_output_path;

if (!mdPath || !docxPath) {
  console.error('ERROR: Set session.md_input_path and session.docx_output_path');
  process.exit(1);
}

const mdContent = fs.readFileSync(mdPath, 'utf-8');
const lines = mdContent.split('\n');

const { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, TabStopType, TabStopPosition } = docx;

function parseInlineFormatting(text) {
  const runs = [];
  const pattern = /\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|([^*`]+)/g;
  let match;
  while ((match = pattern.exec(text)) !== null) {
    if (match[1]) {
      runs.push(new TextRun({ text: match[1], bold: true, italics: true }));
    } else if (match[2]) {
      runs.push(new TextRun({ text: match[2], bold: true }));
    } else if (match[3]) {
      runs.push(new TextRun({ text: match[3], italics: true }));
    } else if (match[4]) {
      runs.push(new TextRun({ text: match[4], font: 'Courier New', size: 20 }));
    } else if (match[5]) {
      runs.push(new TextRun({ text: match[5] }));
    }
  }
  return runs;
}

const children = [];
let inCodeBlock = false;
let codeBlockLines = [];
let inBlockquote = false;
let blockquoteLines = [];

function flushBlockquote() {
  if (blockquoteLines.length > 0) {
    const text = blockquoteLines.join(' ');
    children.push(new Paragraph({
      children: parseInlineFormatting(text),
      indent: { left: 720 },
      spacing: { before: 120, after: 120 },
      border: {
        left: { style: BorderStyle.SINGLE, size: 6, color: '999999', space: 10 }
      }
    }));
    blockquoteLines = [];
  }
  inBlockquote = false;
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.startsWith('```')) {
    if (inCodeBlock) {
      children.push(new Paragraph({
        children: [new TextRun({ text: codeBlockLines.join('\n'), font: 'Courier New', size: 18 })],
        spacing: { before: 120, after: 120 },
        shading: { fill: 'F5F5F5' }
      }));
      codeBlockLines = [];
      inCodeBlock = false;
    } else {
      flushBlockquote();
      inCodeBlock = true;
    }
    continue;
  }

  if (inCodeBlock) {
    codeBlockLines.push(line);
    continue;
  }

  if (line.startsWith('>')) {
    const content = line.replace(/^>\s*/, '');
    if (!inBlockquote) {
      flushBlockquote();
      inBlockquote = true;
    }
    blockquoteLines.push(content);
    continue;
  } else if (inBlockquote) {
    flushBlockquote();
  }

  if (/^---+$/.test(line.trim()) || /^\*\*\*+$/.test(line.trim())) {
    children.push(new Paragraph({
      children: [],
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CCCCCC' } },
      spacing: { before: 240, after: 240 }
    }));
    continue;
  }

  const h1Match = line.match(/^# (.+)/);
  const h2Match = line.match(/^## (.+)/);
  const h3Match = line.match(/^### (.+)/);
  const h4Match = line.match(/^#### (.+)/);

  if (h1Match) {
    children.push(new Paragraph({
      children: parseInlineFormatting(h1Match[1]),
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 360, after: 120 }
    }));
    continue;
  }
  if (h2Match) {
    children.push(new Paragraph({
      children: parseInlineFormatting(h2Match[1]),
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 280, after: 100 }
    }));
    continue;
  }
  if (h3Match) {
    children.push(new Paragraph({
      children: parseInlineFormatting(h3Match[1]),
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 240, after: 80 }
    }));
    continue;
  }
  if (h4Match) {
    children.push(new Paragraph({
      children: parseInlineFormatting(h4Match[1]),
      heading: HeadingLevel.HEADING_4,
      spacing: { before: 200, after: 60 }
    }));
    continue;
  }

  if (/^\s*[-*]\s/.test(line)) {
    const content = line.replace(/^\s*[-*]\s/, '');
    const indent = line.match(/^(\s*)/)[1].length;
    children.push(new Paragraph({
      children: parseInlineFormatting(content),
      bullet: { level: Math.min(Math.floor(indent / 2), 3) },
      spacing: { before: 40, after: 40 }
    }));
    continue;
  }

  if (/^\s*\d+\.\s/.test(line)) {
    const content = line.replace(/^\s*\d+\.\s/, '');
    children.push(new Paragraph({
      children: parseInlineFormatting(content),
      numbering: { reference: 'default-numbering', level: 0 },
      spacing: { before: 40, after: 40 }
    }));
    continue;
  }

  if (line.trim() === '') {
    children.push(new Paragraph({ children: [], spacing: { before: 120 } }));
    continue;
  }

  children.push(new Paragraph({
    children: parseInlineFormatting(line),
    spacing: { before: 60, after: 60 }
  }));
}

flushBlockquote();

const doc = new Document({
  numbering: {
    config: [{
      reference: 'default-numbering',
      levels: [{
        level: 0,
        format: 'decimal',
        text: '%1.',
        alignment: AlignmentType.START,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } }
      }]
    }]
  },
  sections: [{ children }]
});

docx.Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(docxPath, buffer);
  console.log(`DOCX written: ${docxPath} (${buffer.length} bytes)`);
}).catch(err => {
  console.error('DOCX generation failed:', err);
});

#!/usr/bin/env python3
"""Generate PDFs from all markdown resource files."""

import os
import markdown
from weasyprint import HTML, CSS
from pathlib import Path

# Premium styling for PDFs - Signal Pilot Branding
CSS_STYLE = """
@page {
    margin: 0.75in 0.75in 1in 0.75in;
    size: letter;
    @bottom-center {
        content: "Signal Pilot Education Hub  |  signalpilot.io  |  Page " counter(page);
        font-size: 8pt;
        color: #6b7280;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
}

/* Base body styling */
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
    font-size: 10.5pt;
    line-height: 1.65;
    color: #1f2937;
    max-width: 100%;
}

/* Header/brand bar at top */
.header-brand {
    background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%);
    color: white;
    padding: 16px 24px;
    margin: -0.75in -0.75in 24px -0.75in;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.header-brand .logo {
    font-size: 14pt;
    font-weight: 700;
    letter-spacing: -0.5px;
}
.header-brand .tagline {
    font-size: 9pt;
    opacity: 0.9;
}

/* Main title styling */
h1 {
    color: #1e3a5f;
    font-size: 22pt;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 8px;
    letter-spacing: -0.5px;
    line-height: 1.2;
}

/* Subtitle styling */
h1 + p strong, h1 + p {
    color: #4b5563;
    font-size: 11pt;
    margin-bottom: 20px;
}

/* Section headers */
h2 {
    color: #1e40af;
    font-size: 14pt;
    font-weight: 600;
    margin-top: 28px;
    margin-bottom: 12px;
    padding-bottom: 6px;
    border-bottom: 2px solid #dbeafe;
    letter-spacing: -0.3px;
}

h3 {
    color: #1e3a5f;
    font-size: 12pt;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 8px;
}

h4 {
    color: #374151;
    font-size: 10.5pt;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 6px;
}

/* Tables - professional styling */
table {
    border-collapse: collapse;
    width: 100%;
    margin: 16px 0;
    font-size: 9.5pt;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

th {
    background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%);
    color: white;
    padding: 10px 14px;
    text-align: left;
    font-weight: 600;
    font-size: 9pt;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

td {
    border-bottom: 1px solid #e5e7eb;
    padding: 10px 14px;
    text-align: left;
}

tr:nth-child(even) {
    background-color: #f8fafc;
}

tr:last-child td {
    border-bottom: none;
}

/* Code styling */
code {
    background-color: #f1f5f9;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
    font-size: 9pt;
    color: #dc2626;
}

pre {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    color: #e2e8f0;
    padding: 18px 20px;
    border-radius: 10px;
    overflow-x: auto;
    font-size: 8.5pt;
    line-height: 1.5;
    margin: 16px 0;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

pre code {
    background-color: transparent;
    padding: 0;
    color: inherit;
}

/* Blockquotes - tip boxes */
blockquote {
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    border-left: 4px solid #2563eb;
    border-radius: 0 8px 8px 0;
    margin: 18px 0;
    padding: 14px 18px;
    color: #1e40af;
    font-style: normal;
}

blockquote p {
    margin: 0;
}

/* Lists */
ul, ol {
    margin: 14px 0;
    padding-left: 22px;
}

li {
    margin: 8px 0;
    padding-left: 4px;
}

li::marker {
    color: #2563eb;
    font-weight: 600;
}

/* Horizontal rules as section dividers */
hr {
    border: none;
    height: 2px;
    background: linear-gradient(90deg, transparent, #dbeafe, #2563eb, #dbeafe, transparent);
    margin: 28px 0;
}

/* Strong/bold text */
strong {
    color: #1e3a5f;
    font-weight: 600;
}

/* Links */
a {
    color: #2563eb;
    text-decoration: none;
}

/* Special callout boxes using blockquotes with specific content */
blockquote:has(strong:first-child) {
    background: #fef3c7;
    border-left-color: #f59e0b;
}

/* Footer styling */
.footer {
    margin-top: 40px;
    padding: 20px;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border-radius: 10px;
    text-align: center;
}

.footer-brand {
    font-size: 11pt;
    font-weight: 600;
    color: #1e3a5f;
    margin-bottom: 4px;
}

.footer-links {
    font-size: 9pt;
    color: #2563eb;
    margin-bottom: 8px;
}

.footer-disclaimer {
    font-size: 8pt;
    color: #6b7280;
    font-style: italic;
}

/* Checkbox styling for checklists */
li:has(input[type="checkbox"]) {
    list-style: none;
    margin-left: -18px;
}

input[type="checkbox"] {
    width: 14px;
    height: 14px;
    margin-right: 8px;
    accent-color: #2563eb;
}

/* Print-specific optimizations */
@media print {
    h2, h3 {
        page-break-after: avoid;
    }
    table, pre, blockquote {
        page-break-inside: avoid;
    }
}
"""

# All markdown files to convert
RESOURCES = {
    "resources/cheatsheets": [
        "liquidity-lie-cheatsheet.md",
        "market-cycle-cheatsheet.md",
        "pentarch-cheatsheet.md",
        "plutus-flow-cheatsheet.md",
        "reversal-patterns-cheatsheet.md",
        "candlestick-patterns-cheatsheet.md",
        "trend-continuation-cheatsheet.md",
        "fibonacci-cheatsheet.md",
    ],
    "resources/indicator-guides": [
        "harmonic-oscillator-settings-guide.md",
        "janus-atlas-timeframe-guide.md",
        "volume-oracle-settings-guide.md",
        "augury-grid-setup-guide.md",
        "plutus-flow-divergence-guide.md",
    ],
    "resources/quick-start": [
        "quick-start-guide.md",
        "quick-start-checklist.md",
        "getting-started-workflow.md",
    ],
    "resources/guides": [
        "volume-analysis-deep-dive.md",
        "price-action-order-flow-deep-dive.md",
        "smart-money-playbook.md",
        "stop-hunting-recognition-guide.md",
        "delta-analysis-deep-dive.md",
        "rsi-context-guide.md",
        "liquidity-sweeps-recognition-guide.md",
        "breakout-trading-guide.md",
        "divergence-trading-guide.md",
    ],
    "resources/templates": [
        "confirmation-bias-audit-template.md",
        "revenge-trading-workbook.md",
        "indicator-context-matrix.md",
        "chart-layout-templates.md",
    ],
    "resources/support": [
        "performance-optimization-guide.md",
        "contact-and-support.md",
    ],
}

def convert_md_to_pdf(md_path, pdf_path):
    """Convert a markdown file to PDF with premium styling."""
    with open(md_path, 'r', encoding='utf-8') as f:
        md_content = f.read()

    # Convert markdown to HTML
    html_content = markdown.markdown(
        md_content,
        extensions=['tables', 'fenced_code', 'codehilite', 'toc']
    )

    # Wrap in full HTML document with branded header and footer
    full_html = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Signal Pilot Resource</title>
</head>
<body>
<div class="header-brand">
    <div class="logo">SIGNAL PILOT</div>
    <div class="tagline">Education Hub</div>
</div>

{html_content}

<div class="footer">
    <div class="footer-brand">Signal Pilot Education Hub</div>
    <div class="footer-links">signalpilot.io | education.signalpilot.io</div>
    <div class="footer-disclaimer">Educational purposes only. This is not financial advice. Always do your own research.</div>
</div>
</body>
</html>"""

    # Generate PDF with premium styling
    HTML(string=full_html).write_pdf(pdf_path, stylesheets=[CSS(string=CSS_STYLE)])
    return True

def main():
    base_dir = Path(__file__).parent
    total = 0
    success = 0

    for folder, files in RESOURCES.items():
        folder_path = base_dir / folder
        print(f"\nProcessing {folder}...")

        for filename in files:
            md_path = folder_path / filename
            pdf_filename = filename.replace('.md', '.pdf')
            pdf_path = folder_path / pdf_filename

            if not md_path.exists():
                print(f"  SKIP: {filename} (not found)")
                continue

            total += 1
            try:
                convert_md_to_pdf(md_path, pdf_path)
                print(f"  OK: {pdf_filename}")
                success += 1
            except Exception as e:
                print(f"  FAIL: {filename} - {e}")

    print(f"\n{'='*50}")
    print(f"Generated {success}/{total} PDFs")

if __name__ == "__main__":
    main()

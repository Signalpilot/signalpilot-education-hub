#!/usr/bin/env python3
"""
Convert markdown checklist files to professional PDFs
"""
import markdown
from weasyprint import HTML, CSS
from pathlib import Path

# Signal Pilot brand colors
BRAND_CSS = """
@page {
    size: A4;
    margin: 2cm;
    @bottom-right {
        content: "Page " counter(page) " of " counter(pages);
        font-size: 10pt;
        color: #8ea0bf;
    }
}

body {
    font-family: 'DM Sans', -apple-system, system-ui, sans-serif;
    line-height: 1.7;
    color: #0f1524;
    background: white;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    color: #345CFF;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    padding-bottom: 1rem;
    border-bottom: 3px solid #345CFF;
}

h2 {
    color: #5B8AFF;
    font-size: 1.8rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
}

h3 {
    color: #345CFF;
    font-size: 1.4rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
}

h4 {
    color: #51607a;
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
}

p {
    margin: 0.75rem 0;
    color: #0f1524;
}

strong {
    color: #345CFF;
    font-weight: 600;
}

em {
    color: #51607a;
    font-style: italic;
}

ul, ol {
    margin: 1rem 0;
    padding-left: 2rem;
}

li {
    margin: 0.5rem 0;
    color: #0f1524;
}

li::marker {
    color: #5B8AFF;
    font-weight: 600;
}

code {
    background: #f6f8fc;
    border: 1px solid #d7def0;
    border-radius: 4px;
    padding: 0.2rem 0.4rem;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
    color: #345CFF;
}

pre {
    background: #f6f8fc;
    border: 1px solid #d7def0;
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
    margin: 1rem 0;
}

pre code {
    background: none;
    border: none;
    padding: 0;
}

blockquote {
    border-left: 4px solid #5B8AFF;
    background: #f6f8fc;
    margin: 1rem 0;
    padding: 1rem 1.5rem;
    font-style: italic;
    color: #51607a;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
}

th {
    background: #345CFF;
    color: white;
    padding: 0.75rem;
    text-align: left;
    font-weight: 600;
}

td {
    padding: 0.75rem;
    border-bottom: 1px solid #d7def0;
}

tr:nth-child(even) {
    background: #f6f8fc;
}

hr {
    border: none;
    border-top: 2px solid #d7def0;
    margin: 2rem 0;
}

.header {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 1rem;
    border-bottom: 3px solid #345CFF;
}

.footer {
    margin-top: 3rem;
    padding-top: 1rem;
    border-top: 2px solid #d7def0;
    text-align: center;
    color: #8ea0bf;
    font-size: 0.9rem;
}
"""

def convert_markdown_to_pdf(md_file_path, pdf_file_path):
    """Convert a markdown file to a styled PDF"""

    # Read markdown content
    with open(md_file_path, 'r', encoding='utf-8') as f:
        md_content = f.read()

    # Convert markdown to HTML
    html_content = markdown.markdown(
        md_content,
        extensions=[
            'extra',  # Tables, fenced code, etc.
            'nl2br',  # Newline to <br>
            'sane_lists'  # Better list handling
        ]
    )

    # Extract title from first h1 or use filename
    title = Path(md_file_path).stem.replace('-', ' ').title()

    # Wrap in HTML structure
    full_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>{title}</title>
    </head>
    <body>
        <div class="header">
            <h1>{title}</h1>
            <p style="color: #8ea0bf; margin-top: 0.5rem;">Signal Pilot Education Hub</p>
        </div>
        {html_content}
        <div class="footer">
            <p>© 2025 Signal Pilot Labs, Inc. | education.signalpilot.io</p>
            <p style="font-size: 0.8rem; margin-top: 0.5rem;">This material is for educational purposes only. Not financial advice.</p>
        </div>
    </body>
    </html>
    """

    # Convert HTML to PDF with custom CSS
    HTML(string=full_html).write_pdf(
        pdf_file_path,
        stylesheets=[CSS(string=BRAND_CSS)]
    )

    print(f"✅ Converted: {md_file_path.name} → {pdf_file_path.name}")

def main():
    # Get all markdown files in checklists directory
    checklists_dir = Path('/home/user/signalpilot-education-hub/resources/checklists')
    md_files = list(checklists_dir.glob('*.md'))

    if not md_files:
        print("❌ No markdown files found!")
        return

    print(f"📄 Found {len(md_files)} markdown files to convert...\n")

    # Convert each markdown file to PDF
    for md_file in md_files:
        pdf_file = md_file.with_suffix('.pdf')
        try:
            convert_markdown_to_pdf(md_file, pdf_file)
        except Exception as e:
            print(f"❌ Error converting {md_file.name}: {e}")

    print(f"\n✅ Conversion complete! {len(md_files)} PDFs created.")

if __name__ == '__main__':
    main()

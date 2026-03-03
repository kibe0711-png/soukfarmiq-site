#!/usr/bin/env python3
"""Convert markdown files to styled HTML (printable as PDF via browser)."""

import markdown
import os
import sys

STYLE = """
<style>
  @page { margin: 1in; size: A4; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 11pt;
    line-height: 1.6;
    color: #1a1a1a;
    max-width: 800px;
    margin: 0 auto;
    padding: 40px;
  }
  h1 { font-size: 22pt; color: #111; border-bottom: 2px solid #2563eb; padding-bottom: 8px; margin-top: 32px; }
  h2 { font-size: 16pt; color: #1e40af; margin-top: 28px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; }
  h3 { font-size: 13pt; color: #374151; margin-top: 20px; }
  h4 { font-size: 11pt; color: #4b5563; margin-top: 16px; }
  table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 9.5pt; }
  th { background: #f3f4f6; font-weight: 600; text-align: left; padding: 8px 10px; border: 1px solid #d1d5db; }
  td { padding: 6px 10px; border: 1px solid #e5e7eb; vertical-align: top; }
  tr:nth-child(even) { background: #f9fafb; }
  code { background: #f3f4f6; padding: 2px 5px; border-radius: 3px; font-size: 9.5pt; }
  pre { background: #f3f4f6; padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 9pt; }
  blockquote { border-left: 3px solid #2563eb; margin: 16px 0; padding: 8px 16px; color: #4b5563; background: #eff6ff; }
  strong { color: #111; }
  em { color: #4b5563; }
  hr { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
  ul, ol { padding-left: 24px; }
  li { margin-bottom: 4px; }
  a { color: #2563eb; text-decoration: none; }
  @media print {
    body { padding: 0; }
    h1, h2, h3 { page-break-after: avoid; }
    table, pre { page-break-inside: avoid; }
  }
</style>
"""

def convert(md_path):
    with open(md_path, "r") as f:
        md_content = f.read()

    html_body = markdown.markdown(
        md_content,
        extensions=["tables", "fenced_code", "toc"]
    )

    html_path = md_path.replace(".md", ".html")
    with open(html_path, "w") as f:
        f.write(f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{os.path.basename(md_path).replace('.md', '').replace('-', ' ').title()}</title>
  {STYLE}
</head>
<body>
{html_body}
</body>
</html>""")

    print(f"  Created: {html_path}")
    return html_path

if __name__ == "__main__":
    research_dir = os.path.dirname(os.path.abspath(__file__))
    md_files = sorted([f for f in os.listdir(research_dir) if f.endswith(".md") and f != "md_to_pdf.py"])

    print(f"Converting {len(md_files)} reports to printable HTML...\n")
    html_files = []
    for md_file in md_files:
        path = os.path.join(research_dir, md_file)
        html_files.append(convert(path))

    print(f"\nDone! {len(html_files)} HTML files created.")
    print("\nTo save as PDF:")
    print("  1. Open each .html file in your browser (Cmd+click the paths above)")
    print("  2. Press Cmd+P -> Save as PDF")
    print(f"\nFiles are in: {research_dir}")

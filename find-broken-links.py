#!/usr/bin/env python3
"""
Find all broken internal links across the site.

Checks:
- All lesson files
- Index pages
- Internal links (relative and absolute starting with /)
- Skips external links (http/https)
"""

import re
import os
import glob
from urllib.parse import urlparse, unquote
from collections import defaultdict

def extract_links(filepath):
    """Extract all href links from an HTML file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all href attributes
    # Match: href="/path" or href='path' or href=path
    pattern = r'href=["\']([^"\']+)["\']'
    links = re.findall(pattern, content)

    return links

def is_internal_link(link):
    """Check if link is internal (not external http/https)."""
    # Skip anchors, external links, mailto, tel, etc.
    if link.startswith('#'):
        return False
    if link.startswith('http://') or link.startswith('https://'):
        return False
    if link.startswith('mailto:') or link.startswith('tel:'):
        return False
    if link.startswith('javascript:'):
        return False
    return True

def resolve_link_path(source_file, link, base_dir):
    """Resolve a link to an absolute file path."""
    # Remove any fragment/anchor
    link = link.split('#')[0]

    # Remove any query string
    link = link.split('?')[0]

    # URL decode
    link = unquote(link)

    if not link:
        return None

    # If link starts with /, it's relative to base_dir
    if link.startswith('/'):
        return os.path.join(base_dir, link.lstrip('/'))

    # Otherwise it's relative to the source file's directory
    source_dir = os.path.dirname(source_file)
    return os.path.normpath(os.path.join(source_dir, link))

def main():
    """Find all broken links."""
    base_dir = '/home/user/signalpilot-education-hub'

    # Find all HTML files
    html_files = []
    patterns = [
        os.path.join(base_dir, '*.html'),
        os.path.join(base_dir, 'curriculum/**/*.html'),
    ]

    for pattern in patterns:
        html_files.extend(glob.glob(pattern, recursive=True))

    html_files.sort()

    print(f"Scanning {len(html_files)} HTML files for broken links...\n")

    broken_links = defaultdict(list)
    total_links_checked = 0
    files_with_issues = set()

    for source_file in html_files:
        links = extract_links(source_file)

        for link in links:
            if not is_internal_link(link):
                continue

            total_links_checked += 1

            # Resolve to file path
            target_path = resolve_link_path(source_file, link, base_dir)

            if target_path is None:
                continue

            # Check if target exists
            if not os.path.exists(target_path):
                # Get relative paths for cleaner output
                rel_source = os.path.relpath(source_file, base_dir)
                rel_target = os.path.relpath(target_path, base_dir) if target_path else link

                broken_links[rel_source].append({
                    'link': link,
                    'target': rel_target
                })
                files_with_issues.add(rel_source)

    # Report findings
    print(f"{'='*80}")
    print(f"BROKEN LINKS REPORT")
    print(f"{'='*80}\n")

    if not broken_links:
        print("✅ No broken links found!")
        print(f"\nChecked {total_links_checked} internal links across {len(html_files)} files.")
    else:
        print(f"❌ Found broken links in {len(files_with_issues)} files:\n")

        for source_file in sorted(broken_links.keys()):
            print(f"\n📄 {source_file}")
            for item in broken_links[source_file]:
                print(f"  ❌ Link: {item['link']}")
                print(f"     Target: {item['target']} (NOT FOUND)")

        print(f"\n{'='*80}")
        print(f"Summary:")
        print(f"  Total files scanned: {len(html_files)}")
        print(f"  Total internal links checked: {total_links_checked}")
        print(f"  Files with broken links: {len(files_with_issues)}")
        print(f"  Total broken links: {sum(len(v) for v in broken_links.values())}")
        print(f"{'='*80}")

if __name__ == '__main__':
    main()

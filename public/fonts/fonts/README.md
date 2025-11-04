# Fonts Directory

Place your custom font files in this directory.

## Required Font Files

### Greta Arabic (for Arabic text)
- `GretaArabic-Regular.woff2` (weight: 400)
- `GretaArabic-Medium.woff2` (weight: 600)
- `GretaArabic-Bold.woff2` (weight: 700)

### Asgard Trial (for English text)
- `AsgardTrial-Regular.woff2` (weight: 400)
- `AsgardTrial-Medium.woff2` (weight: 600)
- `AsgardTrial-Bold.woff2` (weight: 700)

## File Formats

The fonts are configured to use `.woff2` format (most efficient for web). If you have fonts in other formats (`.woff`, `.ttf`, `.otf`), you can:
1. Convert them to `.woff2` using online tools like [CloudConvert](https://cloudconvert.com)
2. Or update the paths in `app/layout.tsx` to match your font file names (including extension)

## Font File Naming

Make sure your font files are named exactly as listed above. The paths are case-sensitive.


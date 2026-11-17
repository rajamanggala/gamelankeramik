# Gamelan Keramik website mockup

Static HTML with Bootstrap 5.3 (CDN) and Google Fonts (Cormorant Garamond, Lato). Open `index.html` in a browser (internet needed for fonts and Bootstrap).

## Pages
index, instruments, group, stories, article (sample), contact.

## Replace the placeholders
- Photos: overwrite files in `assets/img/photos/` keeping the same names (person-1..4, instrument-*, story-1..8, about, group, article-hero). `marble-blade.jpg` is the real photo from the brand guide and is used as the hero and as the blade texture.
- Audio: put one mp3 per blade in `assets/audio/<instrument>/1.mp3 ... 7.mp3` (demung, saron, gender, slenthem). Until a file exists the blade plays a synthetic placeholder tone.
- Logos: `assets/img/logo/` (cropped from your SVG files). Use as supplied, never retype.
- Text marked placeholder, specs, names, bios, social links and email are samples.

## Laravel later
Each page becomes a Blade view; move the header and footer into a layout, and `assets/` into `public/`. The contact form is front-end only.

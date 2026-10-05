# Byte Builds

A premium custom PC builder website for Spain, designed around the Byte Builds brief.

## Files
- index.html
- style.css
- script.js

## Features
- Premium dark brand styling
- Five Intel-only prebuilt PCs
- Working custom PC configurator with live pricing
- Request build form
- WhatsApp button placeholder
- Mobile-responsive layout
- Easy pricing data updates via JS objects

## Notes
- Update the WhatsApp number in `script.js`:
  - `const WHATSAPP_NUMBER = "YOUR_WHATSAPP_NUMBER";`
- All component pricing and build data are easy to edit in the JS objects.

## Local preview
Open `index.html` directly in a browser, or serve it with a local HTTP server such as:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```


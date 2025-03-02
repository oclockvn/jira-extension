# Blank Chrome Extension (Manifest V3)

A minimal Chrome extension template using Manifest V3.

## Features

- Basic extension structure following Chrome's Manifest V3 requirements
- Popup interface with HTML, CSS, and JavaScript
- Background service worker
- Content script that runs on web pages
- Utility functions for common tasks

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the directory containing this extension

## Structure

- `manifest.json`: Extension configuration
- `popup.html`: The popup UI that appears when clicking the extension icon
- `popup.css`: Styles for the popup
- `popup.js`: JavaScript for the popup functionality
- `background.js`: Background service worker script
- `content.js`: Content script that runs in the context of web pages
- `util.js`: Utility functions for reuse across the extension
  - `toSnakeCase()`: Converts strings to snake-case format

## Development

To modify this extension:

1. Edit the files as needed
2. If you make changes while the extension is loaded, click the refresh icon on the extension card in `chrome://extensions/`

## Notes

This extension does not include icon images. For a production extension, you should add appropriate icons. 
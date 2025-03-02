# Quick Copy Ticket - Chrome Extension (Manifest V3)

A Chrome extension that adds a "COPY TICKET" button to Jira ticket pages, allowing you to quickly copy the ticket number to your clipboard.

## Features

- Adds a "COPY TICKET" button next to the Jira ticket number
- One-click copying of ticket numbers to clipboard
- Visual feedback when copying (success/error states)
- Works with Atlassian Jira Cloud instances
- Automatically handles navigation between tickets without page reloads
- Built using Chrome's Manifest V3 architecture

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the directory containing this extension

## Usage

1. Navigate to any Jira ticket page on an Atlassian domain
2. Look for the "COPY TICKET" button next to the ticket number in the breadcrumb
3. Click the button to copy the ticket number to your clipboard
4. The button will show "COPIED!" when successful

## Structure

- `manifest.json`: Extension configuration and permissions
- `popup.html`: The popup UI that appears when clicking the extension icon
- `popup.css`: Styles for the popup
- `popup.js`: JavaScript for the popup functionality
- `background.js`: Background service worker script
- `content.js`: Content script that runs on Jira pages
  - Adds the copy button
  - Extracts and copies ticket numbers
- `util.js`: Utility functions for reuse across the extension

## Development

To modify this extension:

1. Edit the files as needed
2. If you make changes while the extension is loaded, click the refresh icon on the extension card in `chrome://extensions/`

## Permissions

This extension requires the following permissions:
- `activeTab`: To access the current tab's content
- `clipboardWrite`: To write to the clipboard
- Host permissions for Atlassian domains 
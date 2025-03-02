// Background script for the Chrome extension
console.log('Background service worker initialized');

// Example of listening for extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Extension installed');
  } else if (details.reason === 'update') {
    console.log('Extension updated');
  }
});

// You can add more event listeners and background functionality here 
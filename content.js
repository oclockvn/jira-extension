/**
 * Content script for the Chrome extension
 * This script runs in the context of Jira pages
 */

/**
 * Adds a copy button next to the Jira ticket breadcrumb
 */
const addCopyButton = () => {
  // If the jira link element doesn't exist, don't add the button
  const jiraLinkElement = document.querySelector('[data-testid="issue.views.issue-base.foundation.breadcrumbs.current-issue.item"]');
  if (!jiraLinkElement) {
    return;
  }

  // If the button already exists, don't add it again
  if (document.querySelector('.qp-copy-ticket-button')) {
    return;
  }

  // Create the copy button
  const copyButton = document.createElement('button');
  copyButton.textContent = 'COPY TICKET';
  copyButton.classList.add('qp-copy-ticket-button');
  copyButton.style.marginLeft = '8px';
  copyButton.style.padding = '4px 8px';
  copyButton.style.backgroundColor = '#0052CC';
  copyButton.style.color = 'white';
  copyButton.style.border = 'none';
  copyButton.style.borderRadius = '3px';
  copyButton.style.cursor = 'pointer';
  copyButton.style.fontSize = '12px';
  copyButton.style.fontWeight = 'bold';

  // Add hover effect
  copyButton.addEventListener('mouseover', () => {
    copyButton.style.backgroundColor = '#0065FF';
  });

  copyButton.addEventListener('mouseout', () => {
    copyButton.style.backgroundColor = '#0052CC';
  });

  // Add click handler to copy the ticket number
  copyButton.addEventListener('click', () => {
    const ticketNumber = jiraLinkElement.textContent.trim();
    if (ticketNumber) {
      navigator.clipboard.writeText(ticketNumber)
        .then(() => {
          // Show success feedback
          const originalText = copyButton.textContent;
          copyButton.textContent = 'COPIED!';
          copyButton.style.backgroundColor = '#00875A'; // Success green

          // Reset after 1.5 seconds
          setTimeout(() => {
            copyButton.textContent = originalText;
            copyButton.style.backgroundColor = '#0052CC';
          }, 1500);
        })
        .catch(err => {
          copyButton.textContent = 'ERROR!';
          copyButton.style.backgroundColor = '#DE350B'; // Error red

          // Reset after 1.5 seconds
          setTimeout(() => {
            copyButton.textContent = 'COPY TICKET';
            copyButton.style.backgroundColor = '#0052CC';
          }, 1500);
        });
    }
  });

  // Add the copy button next to the jira link element
  jiraLinkElement.parentElement.appendChild(copyButton);
};

/**
 * Initialize the content script
 */
const initialize = () => {
  addCopyButton();

  // Set up a MutationObserver to detect DOM changes
  // This helps when navigating between Jira tickets without a full page reload
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList' || mutation.type === 'subtree') {
        // Check if our button exists, if not try to add it
        if (!document.querySelector('.qp-copy-ticket-button')) {
          addCopyButton();
        }
      }
    }
  });

  // Start observing the document body for DOM changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};

// Run when the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  // DOM is already loaded, run immediately
  initialize();
}
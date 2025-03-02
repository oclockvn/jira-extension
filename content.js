/**
 * Content script for the Chrome extension
 * This script runs in the context of Jira pages
 */

/**
 * Converts a string to snake-case format
 * - Converts to lowercase
 * - Replaces spaces and non-word characters with hyphens
 * - Removes extra hyphens
 * 
 * @param {string} s - The input string to convert
 * @returns {string} - The snake-cased string
 * 
 * @example
 * // returns "this-is-a-branch-name"
 * toSnakeCase("This Is a branch name ")
 */
const toSnakeCase = (s) => {
  if (!s || typeof s !== 'string') {
    return '';
  }
  
  return s
    .toLowerCase()                 // Convert to lowercase
    .trim()                        // Remove leading/trailing spaces
    .replace(/\s+/g, '-')          // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '')       // Remove non-word chars (except hyphens)
    .replace(/-+/g, '-')           // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '');      // Remove leading/trailing hyphens
}

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

  // Add click handler to copy the ticket number
  copyButton.addEventListener('click', () => {
    const titleElement = document.querySelector('[data-testid="issue.views.issue-base.foundation.summary.heading"]');
    const title = titleElement ? titleElement.textContent.trim() : '';
    const ticketNumber = jiraLinkElement.textContent.trim();
    if (ticketNumber) {
      navigator.clipboard.writeText(`[${ticketNumber}] ${title}`)
        .then(() => {
          // Show success feedback
          const originalText = copyButton.textContent;
          copyButton.textContent = 'COPIED!';
          copyButton.classList.add('success');

          // Reset after 1.5 seconds
          setTimeout(() => {
            copyButton.textContent = originalText;
            copyButton.classList.remove('success');
          }, 1500);
        })
        .catch(err => {
          copyButton.textContent = 'ERROR!';
          copyButton.classList.add('error');

          // Reset after 1.5 seconds
          setTimeout(() => {
            copyButton.textContent = 'COPY TICKET';
            copyButton.classList.remove('error');
          }, 1500);
        });
    }
  });

  // Add the copy button next to the jira link element
  jiraLinkElement.parentElement.appendChild(copyButton);
};

const addCopyBranchButton = () => {
  // If the jira link element doesn't exist, don't add the button
  const jiraLinkElement = document.querySelector('[data-testid="issue.views.issue-base.foundation.breadcrumbs.current-issue.item"]');
  if (!jiraLinkElement) {
    return;
  }

  // If the button already exists, don't add it again
  if (document.querySelector('.qp-copy-branch-button')) {
    return;
  }

  // Create the copy button
  const copyButton = document.createElement('button');
  copyButton.textContent = 'COPY BRANCH';
  copyButton.classList.add('qp-copy-branch-button');

  // Add click handler to copy the ticket number
  copyButton.addEventListener('click', () => {
    const titleElement = document.querySelector('[data-testid="issue.views.issue-base.foundation.summary.heading"]');
    const title = titleElement ? titleElement.textContent.trim() : '';
    const ticketNumber = jiraLinkElement.textContent.trim();
    if (ticketNumber) {
      navigator.clipboard.writeText('feature' + toSnakeCase(`${ticketNumber}-${title}`))
        .then(() => {
          // Show success feedback
          const originalText = copyButton.textContent;
          copyButton.textContent = 'COPIED!';
          copyButton.classList.add('success');

          // Reset after 1.5 seconds
          setTimeout(() => {
            copyButton.textContent = originalText;
            copyButton.classList.remove('success');
          }, 1500);
        })
        .catch(err => {
          copyButton.textContent = 'ERROR!';
          copyButton.classList.add('error');

          // Reset after 1.5 seconds
          setTimeout(() => {
            copyButton.textContent = 'COPY BRANCH';
            copyButton.classList.remove('error');
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
  addCopyBranchButton();

  // Set up a MutationObserver to detect DOM changes
  // This helps when navigating between Jira tickets without a full page reload
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList' || mutation.type === 'subtree') {
        // Check if our button exists, if not try to add it
        if (!document.querySelector('.qp-copy-ticket-button')) {
          addCopyButton();
        }
        if (!document.querySelector('.qp-copy-branch-button')) {
          addCopyBranchButton();
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
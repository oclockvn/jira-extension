/**
 * Utility functions for the Chrome extension
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
};

// Export the function for use in other files
export { toSnakeCase }; 
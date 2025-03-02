// This file contains the JavaScript for the popup
import { toSnakeCase } from './util.js';

document.addEventListener('DOMContentLoaded', function() {
  console.log('Popup DOM loaded');
  
  // Example of using the toSnakeCase utility function
  const exampleInput = "This Is a branch name ";
  const snakeCaseResult = toSnakeCase(exampleInput);
  console.log(`Original: "${exampleInput}"`);
  console.log(`Snake case: "${snakeCaseResult}"`);
  
  // You can add more event listeners and other functionality here
}); 
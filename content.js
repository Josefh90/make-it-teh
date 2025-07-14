function replaceTheWithTeh(node) {
  // If the current node is a text node (i.e., contains actual visible text)
  if (node.nodeType === Node.TEXT_NODE) {
    // Replace every exact occurrence of "the" (case-insensitive) with "teh"
    node.textContent = node.textContent.replace(/\bthe\b/gi, "teh");
  
  // If the current node is an element (e.g. <div>, <p>, etc.)
  // and not a <script> or <style> tag (to avoid breaking JS or CSS)
  } else if (
    node.nodeType === Node.ELEMENT_NODE &&
    node.nodeName !== "SCRIPT" &&
    node.nodeName !== "STYLE"
  ) {
    // Recursively apply the function to all child nodes
    for (let child of node.childNodes) {
      replaceTheWithTeh(child);
    }
  }
}

// Initial run: replace "the" with "teh" in the whole document body
replaceTheWithTeh(document.body);

// Set up a MutationObserver to monitor changes in the DOM
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      // Apply replacement to any newly added content
      replaceTheWithTeh(node);
    }
  }
});

// Start observing the body for added content
observer.observe(document.body, {
  childList: true, // Watch for direct children being added or removed
  subtree: true    // Also watch all descendants (deeply nested)
});

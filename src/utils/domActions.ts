import { showStatus, showSuccess, showError } from "./statusManager";

// ============= Helper Functions =============

const findScrollTarget = (targetText: string): HTMLElement | null => {
  const searchTerms = targetText.toLowerCase().split(/\s+/);
  
  // Try to find by ID or section
  const selectors = [
    `#${targetText.toLowerCase().replace(/\s+/g, '-')}`,
    `section[id*="${targetText.toLowerCase().replace(/\s+/g, '-')}"]`,
    `[data-section="${targetText.toLowerCase()}"]`,
  ];
  
  for (const selector of selectors) {
    try {
      const element = document.querySelector(selector) as HTMLElement;
      if (element) return element;
    } catch (e) {
      // Invalid selector, continue
    }
  }
  
  // Search through all headings and sections
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, section, [role="region"]');
  for (const heading of headings) {
    const text = heading.textContent?.toLowerCase() || '';
    if (searchTerms.every(term => text.includes(term))) {
      return heading as HTMLElement;
    }
  }
  
  return null;
};

const scrollToSection = (sectionName: string): boolean => {
  const element = findScrollTarget(sectionName);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
      inline: 'nearest'
    });
    return true;
  }
  return false;
};

const findElementByText = (
  text: string,
  elementType?: string,
  nthMatch: number = 0
): HTMLElement | null => {
  const searchText = text.toLowerCase().trim();
  const selectors: string[] = [];
  
  if (elementType) {
    switch (elementType.toLowerCase()) {
      case 'button':
        selectors.push('button', '[role="button"]', 'a.button', 'input[type="button"]', 'input[type="submit"]');
        break;
      case 'link':
        selectors.push('a', '[role="link"]');
        break;
      case 'input':
        selectors.push('input', 'textarea');
        break;
      default:
        selectors.push(elementType);
    }
  } else {
    // Search all interactive elements
    selectors.push(
      'button', 'a', 'input', 'textarea', 'select',
      '[role="button"]', '[role="link"]', '[role="tab"]',
      '[onclick]', '.clickable', '[data-clickable]'
    );
  }
  
  const matches: HTMLElement[] = [];
  
  selectors.forEach(selector => {
    try {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        const element = el as HTMLElement;
        const elementText = element.textContent?.toLowerCase().trim() || '';
        const ariaLabel = element.getAttribute('aria-label')?.toLowerCase() || '';
        const title = element.getAttribute('title')?.toLowerCase() || '';
        const placeholder = (element as HTMLInputElement).placeholder?.toLowerCase() || '';
        
        if (
          elementText.includes(searchText) ||
          ariaLabel.includes(searchText) ||
          title.includes(searchText) ||
          placeholder.includes(searchText) ||
          elementText === searchText
        ) {
          matches.push(element);
        }
      });
    } catch (e) {
      // Invalid selector
    }
  });
  
  return matches[nthMatch] || null;
};

const findElementByTextWithContext = (
  targetText: string,
  options: {
    context_text?: string;
    parent_contains?: string;
    element_index?: number;
  }
): HTMLElement | null => {
  const { context_text, parent_contains, element_index = 0 } = options;
  const searchText = targetText.toLowerCase().trim();
  const contextSearch = (context_text || parent_contains || '').toLowerCase().trim();
  
  if (!contextSearch) {
    return findElementByText(targetText, undefined, element_index);
  }
  
  // Find all potential matches
  const allElements = document.querySelectorAll('*');
  const matches: HTMLElement[] = [];
  
  allElements.forEach(el => {
    const element = el as HTMLElement;
    const elementText = element.textContent?.toLowerCase().trim() || '';
    const ariaLabel = element.getAttribute('aria-label')?.toLowerCase() || '';
    
    if (elementText.includes(searchText) || ariaLabel.includes(searchText)) {
      // Check if parent contains context text
      let parent: HTMLElement | null = element.parentElement;
      let contextFound = false;
      
      while (parent && parent !== document.body) {
        const parentText = parent.textContent?.toLowerCase() || '';
        if (parentText.includes(contextSearch)) {
          contextFound = true;
          break;
        }
        parent = parent.parentElement;
      }
      
      if (contextFound) {
        matches.push(element);
      }
    }
  });
  
  return matches[element_index] || null;
};

const findFieldByHint = (hint: string): HTMLInputElement | HTMLTextAreaElement | null => {
  const hintLower = hint.toLowerCase();
  
  // Try by name attribute
  let field = document.querySelector(`[name*="${hintLower}"]`) as HTMLInputElement | HTMLTextAreaElement;
  if (field) return field;
  
  // Try by id
  field = document.querySelector(`[id*="${hintLower}"]`) as HTMLInputElement | HTMLTextAreaElement;
  if (field) return field;
  
  // Try by placeholder
  field = document.querySelector(`[placeholder*="${hintLower}" i]`) as HTMLInputElement | HTMLTextAreaElement;
  if (field) return field;
  
  // Try by label text
  const labels = document.querySelectorAll('label');
  for (const label of labels) {
    if (label.textContent?.toLowerCase().includes(hintLower)) {
      const forAttr = label.getAttribute('for');
      if (forAttr) {
        field = document.getElementById(forAttr) as HTMLInputElement | HTMLTextAreaElement;
        if (field) return field;
      }
      // Try next input sibling
      field = label.querySelector('input, textarea') as HTMLInputElement | HTMLTextAreaElement;
      if (field) return field;
    }
  }
  
  return null;
};

// ============= Main DOM Action Functions =============

export const scroll_page = (params: { direction: string; target_section?: string }) => {
  const { direction, target_section } = params;
  console.log('📜 Scrolling page:', direction, target_section);
  
  // If target_section is provided, try to scroll to specific section
  if (target_section) {
    const sectionFound = scrollToSection(target_section);
    if (sectionFound) {
      showSuccess('Scrolled to ' + target_section);
      return;
    }
  }
  
  const scrollAmount = window.innerHeight * 0.85;
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  
  switch(direction?.toLowerCase()) {
    case 'down':
    case 'next':
      const downAmount = Math.min(scrollAmount, maxScroll - currentScroll);
      window.scrollBy({ top: downAmount, behavior: 'smooth' });
      break;
      
    case 'up':
    case 'previous':
    case 'back':
      const upAmount = Math.min(scrollAmount, currentScroll);
      window.scrollBy({ top: -upAmount, behavior: 'smooth' });
      break;
      
    case 'top':
    case 'start':
    case 'beginning':
      window.scrollTo({ top: 0, behavior: 'smooth' });
      break;
      
    case 'bottom':
    case 'end':
      window.scrollTo({ 
        top: document.documentElement.scrollHeight, 
        behavior: 'smooth' 
      });
      break;
      
    case 'middle':
    case 'center':
      window.scrollTo({ 
        top: document.documentElement.scrollHeight / 2, 
        behavior: 'smooth' 
      });
      break;
      
    default:
      if (direction) {
        const element = findScrollTarget(direction);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
          showSuccess('Scrolled to ' + direction);
          return;
        }
      }
      window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
  }
  
  showSuccess('Scrolled ' + (direction || 'down'));
};

export const click_element = (params: {
  target_text: string;
  element_type?: string;
  nth_match?: number;
  context_text?: string;
  parent_contains?: string;
  element_index?: number;
}) => {
  const { target_text, element_type, nth_match, context_text, parent_contains, element_index } = params;
  console.log('🖱️ Finding element to click:', params);
  
  let element: HTMLElement | null = null;
  
  // Strategy 1: Context-aware search
  if (context_text || parent_contains) {
    element = findElementByTextWithContext(target_text, {
      context_text,
      parent_contains,
      element_index: element_index ?? nth_match,
    });
    
    if (element) {
      console.log('✅ Found element using context-aware search');
    }
  }
  
  // Strategy 2: Standard text search
  if (!element) {
    element = findElementByText(target_text, element_type, element_index ?? nth_match ?? 0);
  }
  
  if (!element) {
    showError(`Could not find element: "${target_text}"`);
    return;
  }
  
  // Scroll into view first
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  // Click after a short delay to allow scroll
  setTimeout(() => {
    element!.click();
    showSuccess(`Clicked: ${target_text}`);
  }, 300);
};

export const fill_field = (params: { value: string; field_hint?: string }) => {
  const { value, field_hint } = params;
  console.log('✍️ Filling field:', { value, field_hint });
  
  let field: HTMLInputElement | HTMLTextAreaElement | null = null;
  
  if (field_hint) {
    field = findFieldByHint(field_hint);
  }
  
  if (!field) {
    // Find focused field or first visible input
    field = document.activeElement as HTMLInputElement | HTMLTextAreaElement;
    if (!field || (field.tagName !== 'INPUT' && field.tagName !== 'TEXTAREA')) {
      const inputs = document.querySelectorAll('input:not([type="hidden"]), textarea');
      field = inputs[0] as HTMLInputElement | HTMLTextAreaElement;
    }
  }
  
  if (!field) {
    showError('Could not find field to fill');
    return;
  }
  
  // Scroll into view
  field.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  // Fill field
  setTimeout(() => {
    field!.value = value;
    field!.dispatchEvent(new Event('input', { bubbles: true }));
    field!.dispatchEvent(new Event('change', { bubbles: true }));
    showSuccess(`Filled field with: ${value}`);
  }, 300);
};

export const toggle_element = (params: { target: string }) => {
  const { target } = params;
  console.log('🔄 Toggling element:', target);
  
  const element = findElementByText(target);
  
  if (!element) {
    showError(`Could not find element: "${target}"`);
    return;
  }
  
  // Scroll into view
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  // Toggle after a short delay
  setTimeout(() => {
    element.click();
    showSuccess(`Toggled: ${target}`);
  }, 300);
};

export const navigate_to_page = (params: { url: string; page_name: string }) => {
  const { url, page_name } = params;
  console.log('🔗 Navigating to:', { url, page_name });
  
  try {
    const currentOrigin = window.location.origin;
    const targetUrl = new URL(url, currentOrigin);
    
    // Navigate to any valid URL
    window.location.href = targetUrl.href;
    showSuccess(`Navigating to ${page_name}`);
  } catch (error) {
    showError(`Invalid URL: ${url}`);
  }
};

export const get_page_context = (params: { refresh?: boolean; detail_level?: string }) => {
  const { detail_level = 'standard' } = params;
  console.log('📄 Getting page context:', detail_level);
  
  const context = {
    url: window.location.href,
    path: window.location.pathname,
    title: document.title,
    scrollPosition: window.pageYOffset,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  };
  
  showStatus('Page context retrieved');
  console.log('Page context:', context);
  return context;
};

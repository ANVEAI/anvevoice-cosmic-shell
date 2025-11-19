import { navigationManager } from "./navigationManager";

// ============= Helper Functions =============

const findScrollTarget = (targetText: string): HTMLElement | null => {
  const searchTerms = targetText.toLowerCase().split(/\s+/);

  // Try to find by ID or section
  const selectors = [
    `#${targetText.toLowerCase().replace(/\s+/g, "-")}`,
    `section[id*="${targetText.toLowerCase().replace(/\s+/g, "-")}"]`,
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
    const text = heading.textContent?.toLowerCase() || "";
    if (searchTerms.every((term) => text.includes(term))) {
      return heading as HTMLElement;
    }
  }

  return null;
};

const scrollToSection = (sectionName: string): boolean => {
  const element = findScrollTarget(sectionName);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
    return true;
  }
  return false;
};

const findElementByText = (text: string, elementType?: string, nthMatch: number = 0): HTMLElement | null => {
  const searchText = text.toLowerCase().trim();
  const selectors: string[] = [];

  if (elementType) {
    switch (elementType.toLowerCase()) {
      case "button":
        selectors.push("button", '[role="button"]', "a.button", 'input[type="button"]', 'input[type="submit"]');
        break;
      case "link":
        selectors.push("a", '[role="link"]');
        break;
      case "input":
        selectors.push("input", "textarea");
        break;
      default:
        selectors.push(elementType);
    }
  } else {
    // Search all interactive elements
    selectors.push(
      "button",
      "a",
      "input",
      "textarea",
      "select",
      '[role="button"]',
      '[role="link"]',
      '[role="tab"]',
      "[onclick]",
      ".clickable",
      "[data-clickable]",
    );
  }

  const matches: HTMLElement[] = [];

  selectors.forEach((selector) => {
    try {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        const element = el as HTMLElement;
        const elementText = element.textContent?.toLowerCase().trim() || "";
        const ariaLabel = element.getAttribute("aria-label")?.toLowerCase() || "";
        const title = element.getAttribute("title")?.toLowerCase() || "";
        const placeholder = (element as HTMLInputElement).placeholder?.toLowerCase() || "";

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
  },
): HTMLElement | null => {
  const { context_text, parent_contains, element_index = 0 } = options;
  const searchText = targetText.toLowerCase().trim();
  const contextSearch = (context_text || parent_contains || "").toLowerCase().trim();

  if (!contextSearch) {
    return findElementByText(targetText, undefined, element_index);
  }

  // Find all potential matches
  const allElements = document.querySelectorAll("*");
  const matches: HTMLElement[] = [];

  allElements.forEach((el) => {
    const element = el as HTMLElement;
    const elementText = element.textContent?.toLowerCase().trim() || "";
    const ariaLabel = element.getAttribute("aria-label")?.toLowerCase() || "";

    if (elementText.includes(searchText) || ariaLabel.includes(searchText)) {
      // Check if parent contains context text
      let parent: HTMLElement | null = element.parentElement;
      let contextFound = false;

      while (parent && parent !== document.body) {
        const parentText = parent.textContent?.toLowerCase() || "";
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
  const labels = document.querySelectorAll("label");
  for (const label of labels) {
    if (label.textContent?.toLowerCase().includes(hintLower)) {
      const forAttr = label.getAttribute("for");
      if (forAttr) {
        field = document.getElementById(forAttr) as HTMLInputElement | HTMLTextAreaElement;
        if (field) return field;
      }
      // Try next input sibling
      field = label.querySelector("input, textarea") as HTMLInputElement | HTMLTextAreaElement;
      if (field) return field;
    }
  }

  return null;
};

// ============= Helper Utilities for Context Extraction =============

const isVisible = (element: HTMLElement): boolean => {
  if (!element || !(element instanceof HTMLElement)) return false;
  
  const style = window.getComputedStyle(element);
  
  // Check if element is hidden
  if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
    return false;
  }
  
  // Check if element has dimensions
  const rect = element.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) {
    return false;
  }
  
  return true;
};

const getElementText = (element: HTMLElement): string => {
  if (!element) return '';
  
  // For input elements, get the value
  if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
    return element.value || element.placeholder || '';
  }
  
  // For other elements, get text content
  return (element.textContent || element.innerText || '').trim();
};

// ============= Context Extraction Methods =============

const extractNavigation = () => {
  const navigation: { topLevel: Array<{ text: string; href: string }> } = { topLevel: [] };
  const navSelectors = [
    'nav a[href]',
    '[role="navigation"] a[href]',
    'header a[href]',
    '.nav a[href]',
    '.navbar a[href]',
    '.menu a[href]'
  ];
  
  const navLinks = new Set<string>();
  navSelectors.forEach(selector => {
    try {
      document.querySelectorAll(selector).forEach(link => {
        const el = link as HTMLElement;
        const anchor = link as HTMLAnchorElement;
        if (isVisible(el) && anchor.href && !anchor.href.startsWith('javascript:')) {
          const text = getElementText(el);
          if (text && text.length > 0 && text.length < 50) {
            navLinks.add(JSON.stringify({
              text: text,
              href: anchor.href
            }));
          }
        }
      });
    } catch (e) {
      console.warn('Nav selector error:', selector, e);
    }
  });
  
  navigation.topLevel = Array.from(navLinks).map(item => JSON.parse(item)).slice(0, 20);
  return navigation;
};

const detectButtonPurpose = (element: HTMLElement, text: string, ariaLabel: string | null): string => {
  const combinedText = (text + ' ' + (ariaLabel || '')).toLowerCase();
  
  if (combinedText.includes('increase') || combinedText.includes('plus') || text === '+' || text === '＋') {
    return 'increase_quantity';
  }
  if (combinedText.includes('decrease') || combinedText.includes('minus') || text === '-' || text === '−') {
    return 'decrease_quantity';
  }
  if (combinedText.includes('add to cart') || combinedText.includes('add to bag')) {
    return 'add_to_cart';
  }
  if (combinedText.includes('remove') && combinedText.includes('cart')) {
    return 'remove_from_cart';
  }
  if (combinedText.includes('checkout') || combinedText.includes('proceed')) {
    return 'checkout';
  }
  if (combinedText.includes('delete') || combinedText.includes('trash')) {
    return 'delete';
  }
  if (combinedText.includes('edit') || combinedText.includes('modify')) {
    return 'edit';
  }
  if (combinedText.includes('close') || combinedText.includes('dismiss') || text === '×' || text === '✕') {
    return 'close';
  }
  if (combinedText.includes('save')) {
    return 'save';
  }
  if (combinedText.includes('cancel')) {
    return 'cancel';
  }
  if (combinedText.includes('submit')) {
    return 'submit';
  }
  if (combinedText.includes('wishlist') || combinedText.includes('favorite') || combinedText.includes('like')) {
    return 'add_to_wishlist';
  }
  if (combinedText.includes('next') || combinedText.includes('forward')) {
    return 'navigate_next';
  }
  if (combinedText.includes('previous') || combinedText.includes('back')) {
    return 'navigate_previous';
  }
  
  return 'action';
};

const getElementContext = (element: HTMLElement): string | null => {
  const contextParts: string[] = [];
  
  const parentSelectors = [
    '.product', '.product-card', '.card', '.item', 
    '[data-product]', '[data-item]', 
    'article', '[role="article"]'
  ];
  
  let parentContainer: HTMLElement | null = null;
  for (const selector of parentSelectors) {
    parentContainer = element.closest(selector) as HTMLElement;
    if (parentContainer) break;
  }
  
  if (!parentContainer) {
    let current = element.parentElement;
    let depth = 0;
    while (current && depth < 5) {
      if (current.tagName === 'DIV' || current.tagName === 'ARTICLE' || current.tagName === 'SECTION') {
        const childCount = current.children.length;
        if (childCount >= 2 && childCount <= 20) {
          parentContainer = current;
          break;
        }
      }
      current = current.parentElement;
      depth++;
    }
  }
  
  if (parentContainer) {
    const heading = parentContainer.querySelector('h1, h2, h3, h4, h5, h6') as HTMLElement;
    if (heading) {
      const headingText = getElementText(heading).trim();
      if (headingText && headingText.length < 100) {
        contextParts.push(headingText);
      }
    }
    
    const priceSelectors = [
      '.price', '[class*="price"]', '[data-price]',
      '.cost', '[class*="cost"]'
    ];
    
    for (const priceSelector of priceSelectors) {
      const priceEl = parentContainer.querySelector(priceSelector) as HTMLElement;
      if (priceEl && isVisible(priceEl)) {
        const priceText = getElementText(priceEl).trim();
        if (priceText && priceText.length < 50 && /[\$£€¥₹]|price|cost/i.test(priceText)) {
          contextParts.push(priceText);
          break;
        }
      }
    }
    
    const description = parentContainer.querySelector('p, .description, [class*="desc"]') as HTMLElement;
    if (description && isVisible(description)) {
      const descText = getElementText(description).trim();
      if (descText && descText.length > 10 && descText.length < 150) {
        const shortDesc = descText.split('.')[0].substring(0, 100);
        if (shortDesc && shortDesc !== contextParts[0]) {
          contextParts.push(shortDesc);
        }
      }
    }
  }
  
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel && ariaLabel.length < 100 && ariaLabel !== getElementText(element)) {
    contextParts.unshift(ariaLabel);
  }
  
  if (contextParts.length > 0) {
    return contextParts[0];
  }
  
  return null;
};

const extractInteractiveElements = () => {
  const elements: Array<any> = [];
  const selectors = [
    'button:not([disabled])',
    'a[href]:not([href^="#"]):not([href^="javascript:"])',
    'input[type="submit"]:not([disabled])',
    '[role="button"]:not([disabled])'
  ];
  
  selectors.forEach(selector => {
    try {
      document.querySelectorAll(selector).forEach(el => {
        const element = el as HTMLElement;
        if (isVisible(element)) {
          const textContent = getElementText(element).trim();
          const ariaLabel = element.getAttribute('aria-label');
          const title = element.getAttribute('title');
          const role = element.getAttribute('role');
          
          const primaryText = ariaLabel || textContent || title || '';
          const itemContext = getElementContext(element);
          const buttonPurpose = detectButtonPurpose(element, primaryText, ariaLabel);
          
          if (primaryText.length > 0 && primaryText.length < 200) {
            const elementData: any = {
              type: element.tagName.toLowerCase(),
              text: primaryText,
              purpose: buttonPurpose,
              itemContext: itemContext || undefined
            };
            
            if (textContent && textContent !== primaryText && textContent.length < 50) {
              elementData.visibleText = textContent;
            }
            
            if (title && title !== primaryText && title !== ariaLabel && title.length < 100) {
              elementData.title = title;
            }
            
            if (role) {
              elementData.role = role;
            }
            
            elements.push(elementData);
          }
        }
      });
    } catch (e) {
      console.warn('Element selector error:', selector, e);
    }
  });
  
  return elements.slice(0, 100);
};

const extractForms = () => {
  const forms: Array<any> = [];
  document.querySelectorAll('form').forEach(form => {
    const formEl = form as HTMLElement;
    if (isVisible(formEl)) {
      const fields: Array<any> = [];
      form.querySelectorAll('input, textarea, select').forEach(field => {
        const fieldEl = field as HTMLElement;
        const inputEl = field as HTMLInputElement;
        if (isVisible(fieldEl) && inputEl.type !== 'hidden') {
          fields.push({
            type: inputEl.type || fieldEl.tagName.toLowerCase(),
            name: inputEl.name || inputEl.id || '',
            placeholder: inputEl.placeholder || ''
          });
        }
      });
      
      if (fields.length > 0) {
        forms.push({ fields: fields });
      }
    }
  });
  
  return forms.slice(0, 5);
};

const extractContentSections = () => {
  const sections: Array<any> = [];
  const sectionSelectors = ['section', 'article', '[role="main"]', 'main'];
  
  sectionSelectors.forEach(selector => {
    try {
      document.querySelectorAll(selector).forEach(section => {
        const sectionEl = section as HTMLElement;
        if (isVisible(sectionEl)) {
          const heading = sectionEl.querySelector('h1, h2, h3') as HTMLElement;
          const headingText = heading ? getElementText(heading) : '';
          
          if (headingText) {
            sections.push({
              heading: headingText,
              hasButtons: sectionEl.querySelectorAll('button').length > 0
            });
          }
        }
      });
    } catch (e) {
      console.warn('Section selector error:', selector, e);
    }
  });
  
  return sections.slice(0, 10);
};

const detectPageType = (): string => {
  const url = window.location.href.toLowerCase();
  
  if (url.includes('/product') || url.includes('/item')) return 'product_page';
  if (url.includes('/cart') || url.includes('/checkout')) return 'cart_page';
  if (url.includes('/search') || url.includes('?q=')) return 'search_results';
  if (url === window.location.origin + '/' || url === window.location.origin) return 'landing_page';
  
  return 'general_page';
};

const extractSemanticStructure = () => {
  const structure: Array<any> = [];
  
  const semanticSelectors = [
    'main', 'article', 'section', 'aside', 'header', 'footer', 'nav',
    '[role="main"]', '[role="article"]', '[role="complementary"]',
    '[role="navigation"]', '[role="contentinfo"]'
  ];
  
  semanticSelectors.forEach(selector => {
    try {
      document.querySelectorAll(selector).forEach(element => {
        const el = element as HTMLElement;
        if (!isVisible(el)) return;
        
        const elementInfo: any = {
          tag: el.tagName.toLowerCase(),
          role: el.getAttribute('role') || undefined,
          id: el.id || undefined,
          classes: el.className ? el.className.split(' ').filter(c => c.length > 0).slice(0, 5) : undefined,
          ariaLabel: el.getAttribute('aria-label') || undefined,
          headings: [],
          lists: [],
          tables: []
        };
        
        el.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
          const headingEl = heading as HTMLElement;
          if (isVisible(headingEl)) {
            const text = getElementText(headingEl).trim();
            if (text && text.length < 200) {
              elementInfo.headings.push({
                level: headingEl.tagName.toLowerCase(),
                text: text
              });
            }
          }
        });
        
        el.querySelectorAll('ul, ol').forEach(list => {
          const listEl = list as HTMLElement;
          if (isVisible(listEl) && listEl.children.length > 0 && listEl.children.length < 20) {
            const items: string[] = [];
            Array.from(listEl.children).slice(0, 10).forEach(li => {
              const text = getElementText(li as HTMLElement).trim();
              if (text && text.length < 200) {
                items.push(text);
              }
            });
            if (items.length > 0) {
              elementInfo.lists.push({
                type: listEl.tagName.toLowerCase(),
                items: items
              });
            }
          }
        });
        
        el.querySelectorAll('table').forEach(table => {
          const tableEl = table as HTMLElement;
          if (isVisible(tableEl)) {
            const headers: string[] = [];
            tableEl.querySelectorAll('th').forEach(th => {
              const text = getElementText(th as HTMLElement).trim();
              if (text) headers.push(text);
            });
            
            if (headers.length > 0) {
              elementInfo.tables.push({ headers: headers.slice(0, 10) });
            }
          }
        });
        
        if (elementInfo.headings.length > 0 || elementInfo.lists.length > 0 || elementInfo.tables.length > 0) {
          structure.push(elementInfo);
        }
      });
    } catch (e) {
      console.warn('Semantic structure extraction error:', selector, e);
    }
  });
  
  return structure.slice(0, 20);
};

const extractAllTextContent = () => {
  const textBlocks: Array<any> = [];
  
  const textSelectors = [
    'p', 'span', 'div', 'li', 'td', 'th', 'label',
    '[class*="text"]', '[class*="content"]', '[class*="description"]',
    '[class*="title"]', '[class*="name"]', '[class*="label"]'
  ];
  
  const seenTexts = new Set<string>();
  
  textSelectors.forEach(selector => {
    try {
      document.querySelectorAll(selector).forEach(element => {
        const el = element as HTMLElement;
        if (!isVisible(el)) return;
        
        const text = Array.from(el.childNodes)
          .filter(node => node.nodeType === Node.TEXT_NODE)
          .map(node => node.textContent?.trim() || '')
          .join(' ')
          .trim();
        
        if (text && text.length > 3 && text.length < 500 && !seenTexts.has(text)) {
          seenTexts.add(text);
          
          const context: string[] = [];
          
          const label = el.closest('label') || el.previousElementSibling;
          if (label && label.tagName === 'LABEL') {
            const labelText = getElementText(label as HTMLElement).trim();
            if (labelText && labelText !== text) {
              context.push(labelText);
            }
          }
          
          const dataAttrs: string[] = [];
          Array.from(el.attributes).forEach(attr => {
            if (attr.name.startsWith('data-') && attr.value && attr.value.length < 50) {
              dataAttrs.push(attr.name + ':' + attr.value);
            }
          });
          
          textBlocks.push({
            text: text,
            context: context.length > 0 ? context : undefined,
            dataAttributes: dataAttrs.length > 0 ? dataAttrs : undefined,
            classes: el.className ? el.className.split(' ').filter(c => c.length > 0).slice(0, 3) : undefined
          });
        }
      });
    } catch (e) {
      console.warn('Text content extraction error:', selector, e);
    }
  });
  
  return textBlocks.slice(0, 100);
};

const extractDataAttributes = () => {
  const dataMap: Record<string, Set<string>> = {};
  
  try {
    document.querySelectorAll('*').forEach(element => {
      const el = element as HTMLElement;
      if (!isVisible(el)) return;
      
      Array.from(el.attributes).forEach(attr => {
        if (attr.name.startsWith('data-')) {
          const key = attr.name;
          const value = attr.value;
          
          if (!dataMap[key]) {
            dataMap[key] = new Set();
          }
          
          if (value && value.length < 200) {
            dataMap[key].add(value);
          }
        }
      });
    });
    
    const result: Record<string, string[]> = {};
    Object.keys(dataMap).slice(0, 50).forEach(key => {
      result[key] = Array.from(dataMap[key]).slice(0, 10);
    });
    
    return result;
  } catch (e) {
    console.warn('Data attributes extraction error:', e);
    return {};
  }
};

const extractAllInputFields = () => {
  const inputs: Array<any> = [];
  
  try {
    document.querySelectorAll('input, textarea, select').forEach(input => {
      const inputEl = input as HTMLInputElement;
      const el = input as HTMLElement;
      if (!isVisible(el) || inputEl.type === 'hidden' || inputEl.type === 'password') return;
      
      const inputInfo: any = {
        type: inputEl.type || el.tagName.toLowerCase(),
        name: inputEl.name || undefined,
        id: inputEl.id || undefined,
        placeholder: inputEl.placeholder || undefined,
        value: inputEl.value || undefined,
        checked: (inputEl as any).checked || undefined,
        ariaLabel: el.getAttribute('aria-label') || undefined
      };
      
      let labelEl: HTMLElement | null = null;
      if (inputEl.id) {
        labelEl = document.querySelector('label[for="' + inputEl.id + '"]') as HTMLElement;
      }
      if (!labelEl) {
        labelEl = el.closest('label') as HTMLElement;
      }
      
      if (labelEl) {
        inputInfo.label = getElementText(labelEl).trim();
      }
      
      let contextText = '';
      let currentElement = el.parentElement;
      let depth = 0;
      
      while (currentElement && depth < 5) {
        const heading = currentElement.querySelector('h1, h2, h3, h4, h5, h6, a[href*="product"], a[href*="item"], [class*="title"], [class*="name"]') as HTMLElement;
        if (heading && isVisible(heading)) {
          const headingText = getElementText(heading).trim();
          if (headingText && headingText.length > 0 && headingText.length < 200) {
            contextText = headingText;
            break;
          }
        }
        
        currentElement = currentElement.parentElement;
        depth++;
      }
      
      if (contextText) {
        inputInfo.itemContext = contextText;
      }
      
      const parent = el.parentElement;
      if (parent) {
        const siblingText = Array.from(parent.childNodes)
          .filter(node => node.nodeType === Node.TEXT_NODE)
          .map(node => node.textContent?.trim() || '')
          .join(' ')
          .trim();
        
        if (siblingText && siblingText.length < 100) {
          inputInfo.nearbyText = siblingText;
        }
      }
      
      inputs.push(inputInfo);
    });
  } catch (e) {
    console.warn('Input fields extraction error:', e);
  }
  
  return inputs.slice(0, 50);
};

const detectQuantityControls = (container: HTMLElement) => {
  const controls: any = {};
  
  try {
    const qtyInputs = container.querySelectorAll('input[type="number"], input[name*="quantity"], input[name*="qty"], input[id*="quantity"], input[id*="qty"]');
    if (qtyInputs.length > 0) {
      const input = qtyInputs[0] as HTMLInputElement;
      if (isVisible(input)) {
        controls.inputField = {
          type: 'number_input',
          currentValue: input.value || '1',
          id: input.id || undefined,
          name: input.name || undefined,
          min: input.min || undefined,
          max: input.max || undefined
        };
      }
    }
    
    if (controls.inputField) {
      const nearbyButtons = container.querySelectorAll('button, [role="button"], [onclick]');
      nearbyButtons.forEach(btn => {
        const btnEl = btn as HTMLElement;
        if (!isVisible(btnEl)) return;
        
        const btnText = getElementText(btnEl).trim();
        const ariaLabel = (btnEl.getAttribute('aria-label') || '').toLowerCase();
        const title = (btnEl.getAttribute('title') || '').toLowerCase();
        const classes = (btnEl.className || '').toLowerCase();
        
        if (btnText === '+' || btnText === '＋' || 
            ariaLabel.includes('increase') || ariaLabel.includes('increment') || ariaLabel.includes('add') ||
            title.includes('increase') || title.includes('increment') ||
            classes.includes('increase') || classes.includes('increment') || classes.includes('plus')) {
          controls.increaseButton = {
            text: btnText || 'Increase',
            ariaLabel: btnEl.getAttribute('aria-label') || undefined,
            method: 'click'
          };
        }
        
        if (btnText === '-' || btnText === '－' || btnText === '−' ||
            ariaLabel.includes('decrease') || ariaLabel.includes('decrement') || ariaLabel.includes('remove') ||
            title.includes('decrease') || title.includes('decrement') ||
            classes.includes('decrease') || classes.includes('decrement') || classes.includes('minus')) {
          controls.decreaseButton = {
            text: btnText || 'Decrease',
            ariaLabel: btnEl.getAttribute('aria-label') || undefined,
            method: 'click'
          };
        }
      });
    }
    
    const qtySelects = container.querySelectorAll('select[name*="quantity"], select[name*="qty"], select[id*="quantity"]');
    if (qtySelects.length > 0) {
      const select = qtySelects[0] as HTMLSelectElement;
      if (isVisible(select)) {
        const options = Array.from(select.options).map(opt => opt.value);
        controls.selectDropdown = {
          type: 'select',
          currentValue: select.value,
          options: options.slice(0, 10)
        };
      }
    }
    
    return Object.keys(controls).length > 0 ? controls : null;
  } catch (e) {
    console.warn('Quantity controls detection error:', e);
    return null;
  }
};

const extractVisualHierarchy = () => {
  const hierarchy: Array<any> = [];
  
  try {
    const containerSelectors = [
      '[class*="card"]', '[class*="item"]', '[class*="product"]',
      '[class*="row"]', '[class*="col"]', '[class*="grid"]',
      '[class*="container"]', '[class*="wrapper"]', '[class*="box"]'
    ];
    
    const seenContainers = new Set<HTMLElement>();
    
    containerSelectors.forEach(selector => {
      try {
        document.querySelectorAll(selector).forEach(container => {
          const containerEl = container as HTMLElement;
          if (!isVisible(containerEl) || seenContainers.has(containerEl)) return;
          
          const rect = containerEl.getBoundingClientRect();
          if (rect.width > window.innerWidth * 0.9) return;
          
          seenContainers.add(containerEl);
          
          const containerInfo: any = {
            classes: containerEl.className ? containerEl.className.split(' ').filter(c => c.length > 0).slice(0, 3) : undefined,
            children: []
          };
          
          const heading = containerEl.querySelector('h1, h2, h3, h4, h5, h6, a[href*="product"], a[href*="item"]') as HTMLElement;
          if (heading && isVisible(heading)) {
            containerInfo.heading = getElementText(heading).trim();
          }
          
          const allText = getElementText(containerEl).trim();
          if (allText && allText.length < 500) {
            containerInfo.text = allText;
          }
          
          const clickables = containerEl.querySelectorAll('button, a[href], [role="button"], [onclick], [class*="btn"], [class*="button"]');
          const clickableElements: Array<any> = [];
          clickables.forEach(el => {
            const element = el as HTMLElement;
            if (isVisible(element)) {
              const elInfo: any = {
                text: getElementText(element).trim(),
                ariaLabel: element.getAttribute('aria-label') || undefined,
                title: element.getAttribute('title') || undefined,
                classes: element.className ? element.className.split(' ').filter(c => c.length > 0).slice(0, 3) : undefined
              };
              
              if (elInfo.text || elInfo.ariaLabel || elInfo.title) {
                clickableElements.push(elInfo);
              }
            }
          });
          if (clickableElements.length > 0) {
            containerInfo.clickableElements = clickableElements.slice(0, 10);
          }
          
          const inputs = containerEl.querySelectorAll('input, select, textarea');
          const inputFields: Array<any> = [];
          inputs.forEach(input => {
            const inputEl = input as HTMLInputElement;
            const el = input as HTMLElement;
            if (isVisible(el) && inputEl.type !== 'hidden' && inputEl.type !== 'password') {
              inputFields.push({
                type: inputEl.type || el.tagName.toLowerCase(),
                value: inputEl.value || undefined,
                placeholder: inputEl.placeholder || undefined,
                name: inputEl.name || undefined,
                id: inputEl.id || undefined
              });
            }
          });
          if (inputFields.length > 0) {
            containerInfo.inputFields = inputFields;
          }
          
          const quantityControls = detectQuantityControls(containerEl);
          if (quantityControls) {
            containerInfo.quantityControls = quantityControls;
          }
          
          if (containerInfo.heading || containerInfo.clickableElements || containerInfo.inputFields) {
            hierarchy.push(containerInfo);
          }
        });
      } catch (e) {
        console.warn('Container extraction error:', selector, e);
      }
    });
  } catch (e) {
    console.warn('Visual hierarchy extraction error:', e);
  }
  
  return hierarchy.slice(0, 30);
};

const extractDeepContext = () => {
  return {
    semanticStructure: extractSemanticStructure(),
    textContent: extractAllTextContent(),
    dataAttributes: extractDataAttributes(),
    inputFields: extractAllInputFields(),
    visualHierarchy: extractVisualHierarchy()
  };
};

// ============= Main DOM Action Functions =============

export const scroll_page = (params: { direction: string; target_section?: string }) => {
  const { direction, target_section } = params;
  console.log("📜 Scrolling page:", direction, target_section);

  // If target_section is provided, try to scroll to specific section
  if (target_section) {
    const sectionFound = scrollToSection(target_section);
    if (sectionFound) {
      console.log("✅ Scrolled to", target_section);
      return;
    }
  }

  const scrollAmount = window.innerHeight * 0.2;
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  switch (direction?.toLowerCase()) {
    case "down":
    case "next":
      const downAmount = Math.min(scrollAmount, maxScroll - currentScroll);
      window.scrollBy({ top: downAmount, behavior: "smooth" });
      break;

    case "up":
    case "previous":
    case "back":
      const upAmount = Math.min(scrollAmount, currentScroll);
      window.scrollBy({ top: -upAmount, behavior: "smooth" });
      break;

    case "top":
    case "start":
    case "beginning":
      window.scrollTo({ top: 0, behavior: "smooth" });
      break;

    case "bottom":
    case "end":
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
      break;

    case "middle":
    case "center":
      window.scrollTo({
        top: document.documentElement.scrollHeight / 2,
        behavior: "smooth",
      });
      break;

    default:
      if (direction) {
        const element = findScrollTarget(direction);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
          console.log("✅ Scrolled to", direction);
          return;
        }
      }
      window.scrollBy({ top: scrollAmount, behavior: "smooth" });
  }

  console.log("✅ Scrolled", direction || "down");
};

export const scroll_to_content = () => {
  console.log("📜 Scrolling to content");
  window.scrollTo({
    top: window.innerHeight,
    behavior: "smooth",
  });
};

export const go_back_to_top = () => {
  console.log("📜 Going back to top");
  window.scrollTo({ top: 0, behavior: "smooth" });
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
  console.log("🖱️ Finding element to click:", params);

  let element: HTMLElement | null = null;

  // Strategy 1: Context-aware search
  if (context_text || parent_contains) {
    element = findElementByTextWithContext(target_text, {
      context_text,
      parent_contains,
      element_index: element_index ?? nth_match,
    });

    if (element) {
      console.log("✅ Found element using context-aware search");
    }
  }

  // Strategy 2: Standard text search
  if (!element) {
    element = findElementByText(target_text, element_type, element_index ?? nth_match ?? 0);
  }

  if (!element) {
    console.error(`❌ Could not find element: "${target_text}"`);
    return;
  }

  // Scroll into view first
  element.scrollIntoView({ behavior: "smooth", block: "center" });

  // Click after a short delay to allow scroll
  setTimeout(() => {
    element!.click();
    console.log(`✅ Clicked: ${target_text}`);
  }, 300);
};

export const fill_field = (params: { value: string; field_hint?: string }) => {
  const { value, field_hint } = params;
  console.log("✍️ Filling field:", { value, field_hint });

  let field: HTMLInputElement | HTMLTextAreaElement | null = null;

  if (field_hint) {
    field = findFieldByHint(field_hint);
  }

  if (!field) {
    // Find focused field or first visible input
    field = document.activeElement as HTMLInputElement | HTMLTextAreaElement;
    if (!field || (field.tagName !== "INPUT" && field.tagName !== "TEXTAREA")) {
      const inputs = document.querySelectorAll('input:not([type="hidden"]), textarea');
      field = inputs[0] as HTMLInputElement | HTMLTextAreaElement;
    }
  }

  if (!field) {
    console.error("❌ Could not find field to fill");
    return;
  }

  // Scroll into view
  field.scrollIntoView({ behavior: "smooth", block: "center" });

  // Fill field
  setTimeout(() => {
    field!.value = value;
    field!.dispatchEvent(new Event("input", { bubbles: true }));
    field!.dispatchEvent(new Event("change", { bubbles: true }));
    console.log(`✅ Filled field with: ${value}`);
  }, 300);
};

export const toggle_element = (params: { target: string }) => {
  const { target } = params;
  console.log("🔄 Toggling element:", target);

  const element = findElementByText(target);

  if (!element) {
    console.error(`❌ Could not find element: "${target}"`);
    return;
  }

  // Scroll into view
  element.scrollIntoView({ behavior: "smooth", block: "center" });

  // Toggle after a short delay
  setTimeout(() => {
    element.click();
    console.log(`✅ Toggled: ${target}`);
  }, 300);
};

export const navigate_to_page = (params: { url: string; page_name: string }) => {
  const { url, page_name } = params;
  console.log("🔗 Navigating to:", { url, page_name });

  try {
    const currentOrigin = window.location.origin;
    const targetUrl = new URL(url, currentOrigin);

    // Check if it's same origin
    if (targetUrl.origin === currentOrigin) {
      // Try React Router navigation first (keeps voice assistant active)
      const path = targetUrl.pathname + targetUrl.search + targetUrl.hash;
      const navigated = navigationManager.navigate(path);

      if (navigated) {
        console.log(`✅ Navigating to ${page_name}`);
      } else {
        // Fallback to full page reload if React Router not available
        window.location.href = targetUrl.href;
        console.log(`✅ Navigating to ${page_name}`);
      }
    } else {
      console.error("❌ Cannot navigate to external URLs");
    }
  } catch (error) {
    console.error(`❌ Invalid URL: ${url}`);
  }
};

export const get_page_context = (params: { refresh?: boolean; detail_level?: string }) => {
  const { detail_level = "standard" } = params;
  console.log("📄 Getting page context:", detail_level);

  const context: any = {
    url: window.location.href,
    title: document.title,
    timestamp: new Date().toISOString()
  };

  // Minimal: Only navigation
  if (detail_level === 'minimal') {
    context.navigation = extractNavigation();
    console.log("✅ Page context retrieved (minimal)", context);
    return context;
  }

  // Standard: Navigation + interactive elements
  if (detail_level === 'standard') {
    context.navigation = extractNavigation();
    context.interactiveElements = extractInteractiveElements();
    context.pageType = detectPageType();
    console.log("✅ Page context retrieved (standard)", context);
    return context;
  }

  // Detailed: Everything including deep analysis
  if (detail_level === 'detailed') {
    context.navigation = extractNavigation();
    context.interactiveElements = extractInteractiveElements();
    context.forms = extractForms();
    context.contentSections = extractContentSections();
    context.pageType = detectPageType();
    context.deepContext = extractDeepContext();
    console.log("✅ Page context retrieved (detailed)", context);
    return context;
  }

  console.log("✅ Page context retrieved", context);
  return context;
};

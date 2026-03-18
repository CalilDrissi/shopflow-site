(function() {
  'use strict';

  // ============================================================
  // ShopFlow Editor Demo — Self-contained Canvas2D Workflow Editor
  // Faithful port of the real ShopFlow editor for marketing hero
  // ============================================================

  // --- SVG Icon Builder ---
  var S = function(d) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>';
  };

  var ICONS = {
    // Triggers
    play: S('<polygon points="6 3 20 12 6 21 6 3"/>'),
    clock: S('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'),
    webhook: S('<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>'),
    // Shopify
    package: S('<path d="m16.5 9.4-9-5.19"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" x2="12" y1="22.08" y2="12"/>'),
    edit: S('<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>'),
    plus: S('<path d="M5 12h14"/><path d="M12 5v14"/>'),
    trash: S('<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>'),
    fileText: S('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>'),
    users: S('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
    tag: S('<path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/>'),
    barChart: S('<line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/>'),
    folder: S('<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>'),
    dollarSign: S('<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>'),
    bookmark: S('<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>'),
    send: S('<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>'),
    store: S('<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>'),
    // AI
    sparkles: S('<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>'),
    refreshCw: S('<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>'),
    globe: S('<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>'),
    alignLeft: S('<line x1="21" x2="3" y1="6" y2="6"/><line x1="15" x2="3" y1="12" y2="12"/><line x1="17" x2="3" y1="18" y2="18"/>'),
    search: S('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>'),
    layers: S('<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>'),
    smile: S('<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>'),
    // Logic
    gitBranch: S('<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>'),
    filter: S('<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>'),
    hand: S('<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>'),
    arrowUpDown: S('<path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/>'),
    merge: S('<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/>'),
    scissors: S('<circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/>'),
    hourglass: S('<path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>'),
    repeat: S('<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>'),
    eraser: S('<path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/>'),
    // Data
    penLine: S('<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>'),
    type: S('<polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/>'),
    minus: S('<path d="M5 12h14"/>'),
    fileCode: S('<path d="M10 12.5 8 15l2 2.5"/><path d="m14 12.5 2 2.5-2 2.5"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/>'),
    braces: S('<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/>'),
    calculator: S('<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>'),
    calendar: S('<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>'),
    // Output
    terminal: S('<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>'),
    externalLink: S('<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>'),
    download: S('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>'),
    bell: S('<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>'),
    // UI
    zap: S('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),
    chevronDown: S('<path d="m6 9 6 6 6-6"/>'),
  };

  // --- Node Registry (all 46 nodes, 6 categories) ---
  var CATEGORIES = [
    { id: 'trigger', label: 'Triggers', icon: 'zap',       color: '#ff6b6b' },
    { id: 'shopify', label: 'Shopify',  icon: 'store',     color: '#96bf48' },
    { id: 'ai',      label: 'AI',       icon: 'sparkles',  color: '#a855f7' },
    { id: 'logic',   label: 'Logic',    icon: 'gitBranch', color: '#3b82f6' },
    { id: 'data',    label: 'Data',     icon: 'braces',    color: '#f59e0b' },
    { id: 'output',  label: 'Output',   icon: 'terminal',  color: '#10b981' },
  ];

  var NODE_REGISTRY = {
    // Triggers (3)
    trigger_manual:   { type: 'trigger_manual',   label: 'Manual Trigger',   category: 'trigger', icon: 'play',    description: 'Start workflow manually with a button click',       inputs: [], outputs: ['output'], color: '#ff6b6b' },
    trigger_schedule: { type: 'trigger_schedule', label: 'Schedule Trigger', category: 'trigger', icon: 'clock',   description: 'Run workflow on a recurring schedule',             inputs: [], outputs: ['output'], color: '#ff6b6b' },
    trigger_webhook:  { type: 'trigger_webhook',  label: 'Webhook Trigger',  category: 'trigger', icon: 'webhook', description: 'Start workflow when a webhook is received',         inputs: [], outputs: ['output'], color: '#ff6b6b' },
    // Shopify (16)
    shopify_get_products:     { type: 'shopify_get_products',     label: 'Get Products',      category: 'shopify', icon: 'package',    description: 'Fetch products from your Shopify store',       inputs: ['input'], outputs: ['output'], color: '#96bf48' },
    shopify_get_product:      { type: 'shopify_get_product',      label: 'Get Single Product', category: 'shopify', icon: 'package',    description: 'Fetch a single product by ID',                inputs: ['input'], outputs: ['output'], color: '#96bf48' },
    shopify_update_product:   { type: 'shopify_update_product',   label: 'Update Product',    category: 'shopify', icon: 'edit',       description: 'Update a product field with new value',        inputs: ['input'], outputs: ['output'], color: '#96bf48' },
    shopify_create_product:   { type: 'shopify_create_product',   label: 'Create Product',    category: 'shopify', icon: 'plus',       description: 'Create a new product in your store',           inputs: ['input'], outputs: ['output'], color: '#96bf48' },
    shopify_delete_product:   { type: 'shopify_delete_product',   label: 'Delete Product',    category: 'shopify', icon: 'trash',      description: 'Permanently delete a product',                 inputs: ['input'], outputs: ['output'], color: '#96bf48' },
    shopify_get_orders:       { type: 'shopify_get_orders',       label: 'Get Orders',        category: 'shopify', icon: 'fileText',   description: 'Fetch orders from your store',                 inputs: ['input'], outputs: ['output'], color: '#96bf48' },
    shopify_get_customers:    { type: 'shopify_get_customers',    label: 'Get Customers',     category: 'shopify', icon: 'users',      description: 'Fetch customers from your store',              inputs: ['input'], outputs: ['output'], color: '#96bf48' },
    shopify_tag_resource:     { type: 'shopify_tag_resource',     label: 'Tag Resource',      category: 'shopify', icon: 'tag',        description: 'Add, replace, or remove tags on resources',    inputs: ['input'], outputs: ['output'], color: '#96bf48' },
    shopify_get_inventory:    { type: 'shopify_get_inventory',    label: 'Get Inventory',     category: 'shopify', icon: 'barChart',   description: 'Get inventory levels for a location',          inputs: ['input'], outputs: ['output'], color: '#96bf48' },
    shopify_set_inventory:    { type: 'shopify_set_inventory',    label: 'Set Inventory',     category: 'shopify', icon: 'barChart',   description: 'Set inventory quantity for items',             inputs: ['input'], outputs: ['output'], color: '#96bf48' },
    shopify_get_collections:  { type: 'shopify_get_collections',  label: 'Get Collections',   category: 'shopify', icon: 'folder',     description: 'Fetch all custom collections',                 inputs: ['input'], outputs: ['output'], color: '#96bf48' },
    shopify_add_to_collection:{ type: 'shopify_add_to_collection',label: 'Add to Collection', category: 'shopify', icon: 'folder',     description: 'Add products to a collection',                 inputs: ['input'], outputs: ['output'], color: '#96bf48' },
    shopify_create_discount:  { type: 'shopify_create_discount',  label: 'Create Discount',   category: 'shopify', icon: 'dollarSign', description: 'Create a price rule and discount code',        inputs: ['input'], outputs: ['output'], color: '#96bf48' },
    shopify_get_metafields:   { type: 'shopify_get_metafields',   label: 'Get Metafields',    category: 'shopify', icon: 'bookmark',   description: 'Get metafields for a resource',                inputs: ['input'], outputs: ['output'], color: '#96bf48' },
    shopify_set_metafield:    { type: 'shopify_set_metafield',    label: 'Set Metafield',     category: 'shopify', icon: 'bookmark',   description: 'Set a metafield value on a resource',          inputs: ['input'], outputs: ['output'], color: '#96bf48' },
    shopify_publish_product:  { type: 'shopify_publish_product',  label: 'Publish Product',   category: 'shopify', icon: 'send',       description: 'Change product publish status',                inputs: ['input'], outputs: ['output'], color: '#96bf48' },
    // AI (7)
    ai_generate_text: { type: 'ai_generate_text', label: 'Generate Text',      category: 'ai', icon: 'sparkles',  description: 'Generate text content using AI',                    inputs: ['input'], outputs: ['output'], color: '#a855f7' },
    ai_rewrite:       { type: 'ai_rewrite',       label: 'Rewrite Text',       category: 'ai', icon: 'refreshCw', description: 'Rewrite text with specific instructions',           inputs: ['input'], outputs: ['output'], color: '#a855f7' },
    ai_translate:     { type: 'ai_translate',      label: 'Translate',          category: 'ai', icon: 'globe',     description: 'Translate text to another language',                inputs: ['input'], outputs: ['output'], color: '#a855f7' },
    ai_summarize:     { type: 'ai_summarize',      label: 'Summarize',          category: 'ai', icon: 'alignLeft', description: 'Summarize text content',                            inputs: ['input'], outputs: ['output'], color: '#a855f7' },
    ai_extract:       { type: 'ai_extract',        label: 'Extract Data',       category: 'ai', icon: 'search',    description: 'Extract structured data using AI',                  inputs: ['input'], outputs: ['output'], color: '#a855f7' },
    ai_classify:      { type: 'ai_classify',       label: 'Classify',           category: 'ai', icon: 'layers',    description: 'Classify items into categories using AI',           inputs: ['input'], outputs: ['output'], color: '#a855f7' },
    ai_sentiment:     { type: 'ai_sentiment',      label: 'Sentiment Analysis', category: 'ai', icon: 'smile',     description: 'Analyze text sentiment (positive/negative/neutral)',inputs: ['input'], outputs: ['output'], color: '#a855f7' },
    // Logic (9)
    logic_if:          { type: 'logic_if',          label: 'If Condition',  category: 'logic', icon: 'gitBranch',  description: 'Split flow based on a condition',            inputs: ['input'],             outputs: ['true', 'false'], color: '#3b82f6' },
    logic_filter:      { type: 'logic_filter',      label: 'Filter',        category: 'logic', icon: 'filter',     description: 'Keep only items matching a condition',       inputs: ['input'],             outputs: ['output'],        color: '#3b82f6' },
    logic_limit:       { type: 'logic_limit',       label: 'Limit',         category: 'logic', icon: 'hand',       description: 'Limit the number of items passing through',  inputs: ['input'],             outputs: ['output'],        color: '#3b82f6' },
    logic_sort:        { type: 'logic_sort',        label: 'Sort',          category: 'logic', icon: 'arrowUpDown',description: 'Sort items by a field',                      inputs: ['input'],             outputs: ['output'],        color: '#3b82f6' },
    logic_merge:       { type: 'logic_merge',       label: 'Merge',         category: 'logic', icon: 'merge',      description: 'Merge two data streams into one',            inputs: ['input_a','input_b'], outputs: ['output'],        color: '#3b82f6' },
    logic_split:       { type: 'logic_split',       label: 'Split',         category: 'logic', icon: 'scissors',   description: 'Split a text field into multiple items',     inputs: ['input'],             outputs: ['output'],        color: '#3b82f6' },
    logic_delay:       { type: 'logic_delay',       label: 'Delay',         category: 'logic', icon: 'hourglass',  description: 'Wait for a specified number of seconds',     inputs: ['input'],             outputs: ['output'],        color: '#3b82f6' },
    logic_loop:        { type: 'logic_loop',        label: 'Loop',          category: 'logic', icon: 'repeat',     description: 'Iterate through items one by one',           inputs: ['input'],             outputs: ['output'],        color: '#3b82f6' },
    logic_deduplicate: { type: 'logic_deduplicate', label: 'Deduplicate',   category: 'logic', icon: 'eraser',     description: 'Remove duplicate items based on a field',    inputs: ['input'],             outputs: ['output'],        color: '#3b82f6' },
    // Data (7)
    data_set_field:    { type: 'data_set_field',    label: 'Set Field',     category: 'data', icon: 'penLine',    description: 'Set or create a field value on each item',    inputs: ['input'], outputs: ['output'], color: '#f59e0b' },
    data_rename_field: { type: 'data_rename_field', label: 'Rename Field',  category: 'data', icon: 'type',       description: 'Rename a field on each item',                 inputs: ['input'], outputs: ['output'], color: '#f59e0b' },
    data_remove_field: { type: 'data_remove_field', label: 'Remove Fields', category: 'data', icon: 'minus',      description: 'Remove specified fields from each item',      inputs: ['input'], outputs: ['output'], color: '#f59e0b' },
    data_template:     { type: 'data_template',     label: 'Template',      category: 'data', icon: 'fileCode',   description: 'Create a formatted string from item data',    inputs: ['input'], outputs: ['output'], color: '#f59e0b' },
    data_json_parse:   { type: 'data_json_parse',   label: 'JSON Parse',    category: 'data', icon: 'braces',     description: 'Parse a JSON string field into an object',    inputs: ['input'], outputs: ['output'], color: '#f59e0b' },
    data_math:         { type: 'data_math',         label: 'Math',          category: 'data', icon: 'calculator',  description: 'Perform a math expression on item data',     inputs: ['input'], outputs: ['output'], color: '#f59e0b' },
    data_date_format:  { type: 'data_date_format',  label: 'Format Date',   category: 'data', icon: 'calendar',   description: 'Format a date field',                         inputs: ['input'], outputs: ['output'], color: '#f59e0b' },
    // Output (4)
    output_log:          { type: 'output_log',          label: 'Log Output',     category: 'output', icon: 'terminal',     description: 'Log items for debugging and review',       inputs: ['input'], outputs: ['output'], color: '#10b981' },
    output_webhook:      { type: 'output_webhook',      label: 'Send Webhook',   category: 'output', icon: 'externalLink', description: 'Send data to an external webhook URL',     inputs: ['input'], outputs: ['output'], color: '#10b981' },
    output_csv_export:   { type: 'output_csv_export',   label: 'CSV Export',     category: 'output', icon: 'download',     description: 'Export items as a CSV file',               inputs: ['input'], outputs: ['output'], color: '#10b981' },
    output_notification: { type: 'output_notification', label: 'Notification',   category: 'output', icon: 'bell',         description: 'Display a desktop notification',           inputs: ['input'], outputs: ['output'], color: '#10b981' },
  };

  var NODE_TYPE_KEYS = Object.keys(NODE_REGISTRY);

  function getNodesByCategory(catId) {
    return Object.values(NODE_REGISTRY).filter(function(n) { return n.category === catId; });
  }

  function createNodeInstance(nodeType, x, y) {
    var reg = NODE_REGISTRY[nodeType];
    if (!reg) return null;
    return {
      id: 'node_' + Math.random().toString(36).substr(2, 8),
      node_type: nodeType,
      label: reg.label,
      config: {},
      position_x: x,
      position_y: y,
    };
  }

  // --- Constants ---
  var NODE_W = 160;
  var NODE_H = 38;
  var PORT_R = 4;
  var PORT_R_HOVER = 6;
  var GRID_SIZE = 20;
  var ACCENT_W = 3;
  var CORNER_R = 7;

  // --- Canvas Colors (dark theme for marketing site) ---
  var canvasColors = {
    bg: '#0a0a0a',
    dot: 'rgba(255,255,255,0.04)',
    line: '#3B82F6',
    lineHover: '#60A5FA',
    selection: 'rgba(0,91,211,0.15)',
    surface: '#1a1a1a',
    border: 'rgba(255,255,255,0.08)',
    borderHover: 'rgba(255,255,255,0.14)',
    borderFocus: '#8b5cf6',
    text: '#e3e5e8',
    textSecondary: '#8a8f98',
    success: '#58d68d',
    error: '#fe6b6b',
  };

  // --- State ---
  var workflow = null;
  var canvas = null;
  var ctx = null;
  var animFrame = null;
  var dirty = true;

  // Camera
  var camera = { x: 0, y: 0, zoom: 1 };
  var targetCamera = { x: 0, y: 0, zoom: 1 };

  // Interaction state
  var selectedNodes = new Set();
  var selectedConnection = null;
  var hoveredNode = null;
  var hoveredPort = null;
  var dragging = null;
  var dragStart = { x: 0, y: 0 };
  var spaceHeld = false;

  // Connection drawing
  var pendingConnection = null;

  // Selection box
  var selectionBox = null;

  // Snap to grid
  var snapToGrid = true;

  // Palette popup
  var paletteEl = null;

  // Icon cache
  var iconImageCache = {};

  // --- Helpers ---
  function hexToRgba(hex, alpha) {
    if (!hex || hex.charAt(0) !== '#') return 'rgba(128,128,128,' + alpha + ')';
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  function isInputFocused() {
    var el = document.activeElement;
    return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT');
  }

  function getIconImage(iconName, color, size) {
    size = size || 18;
    var key = iconName + '_' + color + '_' + size;
    if (iconImageCache[key]) return iconImageCache[key];

    var svg = ICONS[iconName];
    if (!svg) return null;

    svg = svg.replace(/currentColor/g, color);
    svg = svg.replace(/width="\d+"/, 'width="' + size + '"').replace(/height="\d+"/, 'height="' + size + '"');

    var img = new Image();
    img.src = 'data:image/svg+xml,' + encodeURIComponent(svg);
    iconImageCache[key] = img;
    img.onload = function() { dirty = true; };

    return img;
  }

  // --- Coordinate Conversion ---
  function screenToCanvas(sx, sy) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: (sx - rect.left - camera.x) / camera.zoom,
      y: (sy - rect.top - camera.y) / camera.zoom,
    };
  }

  function updateCursor() {
    if (!canvas) return;
    var cur;
    if (dragging && dragging.type === 'pan') cur = 'grabbing';
    else if (spaceHeld) cur = 'grab';
    else if (hoveredPort) cur = 'crosshair';
    else cur = 'default';
    if (canvas.style.cursor !== cur) canvas.style.cursor = cur;
  }

  // --- Node Geometry ---
  function getPortPositions(node) {
    var reg = NODE_REGISTRY[node.node_type];
    if (!reg) return { inputs: [], outputs: [] };

    var w = NODE_W;
    var h = NODE_H;

    var inputs = (reg.inputs || []).map(function(name, i, arr) {
      return {
        name: name,
        x: node.position_x,
        y: node.position_y + h * (i + 1) / (arr.length + 1),
      };
    });

    var outputs = (reg.outputs || []).map(function(name, i, arr) {
      return {
        name: name,
        x: node.position_x + w,
        y: node.position_y + h * (i + 1) / (arr.length + 1),
      };
    });

    return { inputs: inputs, outputs: outputs };
  }

  function hitTestNode(cx, cy) {
    for (var i = workflow.nodes.length - 1; i >= 0; i--) {
      var n = workflow.nodes[i];
      if (cx >= n.position_x && cx <= n.position_x + NODE_W &&
          cy >= n.position_y && cy <= n.position_y + NODE_H) {
        return n;
      }
    }
    return null;
  }

  function hitTestPort(cx, cy) {
    var radius = 10;
    for (var ni = 0; ni < workflow.nodes.length; ni++) {
      var node = workflow.nodes[ni];
      var ports = getPortPositions(node);
      for (var oi = 0; oi < ports.outputs.length; oi++) {
        var p = ports.outputs[oi];
        if (Math.hypot(cx - p.x, cy - p.y) < radius) {
          return { node: node, port: p, type: 'output' };
        }
      }
      for (var ii = 0; ii < ports.inputs.length; ii++) {
        var p2 = ports.inputs[ii];
        if (Math.hypot(cx - p2.x, cy - p2.y) < radius) {
          return { node: node, port: p2, type: 'input' };
        }
      }
    }
    return null;
  }

  function hitTestConnection(cx, cy) {
    var threshold = 8;
    for (var ci = 0; ci < workflow.connections.length; ci++) {
      var conn = workflow.connections[ci];
      var fromNode = workflow.nodes.find(function(n) { return n.id === conn.from_node; });
      var toNode = workflow.nodes.find(function(n) { return n.id === conn.to_node; });
      if (!fromNode || !toNode) continue;

      var fromPorts = getPortPositions(fromNode);
      var toPorts = getPortPositions(toNode);
      var fp = fromPorts.outputs.find(function(p) { return p.name === conn.from_port; });
      var tp = toPorts.inputs.find(function(p) { return p.name === conn.to_port; });
      if (!fp || !tp) continue;

      for (var t = 0; t <= 1; t += 0.05) {
        var cpOffset = Math.min(120, Math.abs(tp.x - fp.x) * 0.5);
        var x1 = fp.x, y1 = fp.y;
        var x2 = tp.x, y2 = tp.y;
        var cp1x = x1 + cpOffset, cp1y = y1;
        var cp2x = x2 - cpOffset, cp2y = y2;

        var mt = 1 - t;
        var px = mt*mt*mt*x1 + 3*mt*mt*t*cp1x + 3*mt*t*t*cp2x + t*t*t*x2;
        var py = mt*mt*mt*y1 + 3*mt*mt*t*cp1y + 3*mt*t*t*cp2y + t*t*t*y2;

        if (Math.hypot(cx - px, cy - py) < threshold) {
          return conn;
        }
      }
    }
    return null;
  }

  // --- Rendering ---
  function render() {
    if (!canvas || !ctx || !workflow) return;

    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Lerp camera
    camera.x += (targetCamera.x - camera.x) * 0.2;
    camera.y += (targetCamera.y - camera.y) * 0.2;
    camera.zoom += (targetCamera.zoom - camera.zoom) * 0.15;

    // Clear
    ctx.fillStyle = canvasColors.bg;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.save();
    ctx.translate(camera.x, camera.y);
    ctx.scale(camera.zoom, camera.zoom);

    // Draw grid
    drawGrid(rect.width, rect.height);

    // Draw connections
    for (var ci = 0; ci < workflow.connections.length; ci++) {
      drawConnection(workflow.connections[ci]);
    }

    // Draw pending connection
    if (pendingConnection) {
      var cpOff = Math.min(120, Math.abs(pendingConnection.x - pendingConnection.fromX) * 0.5);
      ctx.strokeStyle = canvasColors.borderFocus;
      ctx.lineWidth = 3;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(pendingConnection.fromX, pendingConnection.fromY);
      ctx.bezierCurveTo(
        pendingConnection.fromX + cpOff, pendingConnection.fromY,
        pendingConnection.x - cpOff, pendingConnection.y,
        pendingConnection.x, pendingConnection.y
      );
      ctx.stroke();
    }

    // Draw nodes
    for (var ni = 0; ni < workflow.nodes.length; ni++) {
      drawNode(workflow.nodes[ni]);
    }

    // Draw selection box
    if (selectionBox) {
      var sx = Math.min(selectionBox.startX, selectionBox.endX);
      var sy = Math.min(selectionBox.startY, selectionBox.endY);
      var sw = Math.abs(selectionBox.endX - selectionBox.startX);
      var sh = Math.abs(selectionBox.endY - selectionBox.startY);
      ctx.fillStyle = canvasColors.selection;
      ctx.fillRect(sx, sy, sw, sh);
      ctx.strokeStyle = canvasColors.borderFocus;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(sx, sy, sw, sh);
      ctx.setLineDash([]);
    }

    ctx.restore();

    animFrame = requestAnimationFrame(render);
  }

  function drawGrid(w, h) {
    var spacing = GRID_SIZE;
    var startX = Math.floor(-camera.x / camera.zoom / spacing) * spacing - spacing;
    var startY = Math.floor(-camera.y / camera.zoom / spacing) * spacing - spacing;
    var endX = startX + w / camera.zoom + spacing * 2;
    var endY = startY + h / camera.zoom + spacing * 2;

    ctx.strokeStyle = canvasColors.dot;
    ctx.lineWidth = 0.5;

    for (var x = startX; x < endX; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x, endY);
      ctx.stroke();
    }

    for (var y = startY; y < endY; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
      ctx.stroke();
    }
  }

  function drawConnection(conn) {
    var fromNode = workflow.nodes.find(function(n) { return n.id === conn.from_node; });
    var toNode = workflow.nodes.find(function(n) { return n.id === conn.to_node; });
    if (!fromNode || !toNode) return;

    var fromPorts = getPortPositions(fromNode);
    var toPorts = getPortPositions(toNode);
    var fp = fromPorts.outputs.find(function(p) { return p.name === conn.from_port; });
    var tp = toPorts.inputs.find(function(p) { return p.name === conn.to_port; });
    if (!fp || !tp) return;

    var isSelected = selectedConnection && selectedConnection.id === conn.id;
    var isConnectedToSelected = selectedNodes.has(conn.from_node) || selectedNodes.has(conn.to_node);

    var cpOffset = Math.min(120, Math.abs(tp.x - fp.x) * 0.5);

    ctx.strokeStyle = isSelected || isConnectedToSelected ? canvasColors.lineHover : canvasColors.line;
    ctx.lineWidth = 2;
    ctx.setLineDash([]);

    if (isSelected || isConnectedToSelected) {
      ctx.shadowColor = canvasColors.lineHover;
      ctx.shadowBlur = 8;
    }

    ctx.beginPath();
    ctx.moveTo(fp.x, fp.y);
    ctx.bezierCurveTo(fp.x + cpOffset, fp.y, tp.x - cpOffset, tp.y, tp.x, tp.y);
    ctx.stroke();

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  }

  function drawNode(node) {
    var reg = NODE_REGISTRY[node.node_type];
    if (!reg) return;

    var x = node.position_x;
    var y = node.position_y;
    var w = NODE_W;
    var h = NODE_H;
    var color = reg.color || canvasColors.borderHover;
    var isSelected = selectedNodes.has(node.id);
    var isHovered = hoveredNode && hoveredNode.id === node.id;

    // Shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.25)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 4;

    // Body
    ctx.fillStyle = canvasColors.surface;
    roundRect(ctx, x, y, w, h, CORNER_R);
    ctx.fill();
    ctx.restore();

    // Border
    var borderColor = canvasColors.border;
    var borderWidth = 1;
    if (isSelected) { borderColor = canvasColors.borderFocus; borderWidth = 2; }
    else if (isHovered) { borderColor = canvasColors.borderHover; }

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    roundRect(ctx, x, y, w, h, CORNER_R);
    ctx.stroke();

    // Selected glow
    if (isSelected) {
      ctx.save();
      ctx.shadowColor = hexToRgba(canvasColors.borderFocus, 0.4);
      ctx.shadowBlur = 16;
      ctx.strokeStyle = hexToRgba(canvasColors.borderFocus, 0.2);
      ctx.lineWidth = 1;
      roundRect(ctx, x, y, w, h, CORNER_R);
      ctx.stroke();
      ctx.restore();
    }

    // Left accent bar (clipped to node shape)
    ctx.save();
    roundRect(ctx, x, y, w, h, CORNER_R);
    ctx.clip();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ACCENT_W, h);
    ctx.restore();

    // Icon circle
    var iconCX = x + ACCENT_W + 10 + 11;
    var iconCY = y + h / 2;
    ctx.fillStyle = hexToRgba(color, 0.15);
    ctx.beginPath();
    ctx.arc(iconCX, iconCY, 11, 0, Math.PI * 2);
    ctx.fill();

    // Icon image
    var iconImg = getIconImage(reg.icon, color, 13);
    if (iconImg && iconImg.complete && iconImg.naturalWidth > 0) {
      ctx.drawImage(iconImg, iconCX - 6.5, iconCY - 6.5, 13, 13);
    }

    // Label
    var textX = iconCX + 16;
    var maxTextW = w - (textX - x) - 8;
    ctx.fillStyle = canvasColors.text;
    ctx.font = '500 11px "Inter Tight", -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillText(node.label || reg.label, textX, iconCY, maxTextW);

    // Ports
    var ports = getPortPositions(node);

    for (var ii = 0; ii < ports.inputs.length; ii++) {
      var p = ports.inputs[ii];
      var isHP = hoveredPort && hoveredPort.node.id === node.id && hoveredPort.port.name === p.name && hoveredPort.type === 'input';
      var r = isHP ? PORT_R_HOVER : PORT_R;

      ctx.fillStyle = canvasColors.border;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = isHP ? canvasColors.borderFocus : canvasColors.textSecondary;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (ports.inputs.length > 1) {
        ctx.fillStyle = canvasColors.textSecondary;
        ctx.font = '9px "Inter Tight", -apple-system, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(p.name, p.x + r + 4, p.y + 3);
      }
    }

    for (var oi = 0; oi < ports.outputs.length; oi++) {
      var p2 = ports.outputs[oi];
      var isHP2 = hoveredPort && hoveredPort.node.id === node.id && hoveredPort.port.name === p2.name && hoveredPort.type === 'output';
      var r2 = isHP2 ? PORT_R_HOVER : PORT_R;

      ctx.fillStyle = canvasColors.border;
      ctx.beginPath();
      ctx.arc(p2.x, p2.y, r2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = isHP2 ? canvasColors.borderFocus : canvasColors.textSecondary;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (ports.outputs.length > 1) {
        ctx.fillStyle = canvasColors.textSecondary;
        ctx.font = '9px "Inter Tight", -apple-system, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(p2.name, p2.x - r2 - 4, p2.y + 3);
        ctx.textAlign = 'left';
      }
    }
  }

  function roundRect(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.lineTo(x + w - r, y);
    c.quadraticCurveTo(x + w, y, x + w, y + r);
    c.lineTo(x + w, y + h - r);
    c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    c.lineTo(x + r, y + h);
    c.quadraticCurveTo(x, y + h, x, y + h - r);
    c.lineTo(x, y + r);
    c.quadraticCurveTo(x, y, x + r, y);
    c.closePath();
  }

  // --- Fit to View ---
  function fitToView() {
    if (!workflow || workflow.nodes.length === 0) return;
    var rect = canvas.getBoundingClientRect();
    var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (var i = 0; i < workflow.nodes.length; i++) {
      var n = workflow.nodes[i];
      if (n.position_x < minX) minX = n.position_x;
      if (n.position_x + NODE_W > maxX) maxX = n.position_x + NODE_W;
      if (n.position_y < minY) minY = n.position_y;
      if (n.position_y + NODE_H > maxY) maxY = n.position_y + NODE_H;
    }
    var pad = 80;
    var contentW = maxX - minX + pad * 2;
    var contentH = maxY - minY + pad * 2;
    var zoom = Math.min(rect.width / contentW, rect.height / contentH, 1.5);
    targetCamera.zoom = zoom;
    targetCamera.x = (rect.width - contentW * zoom) / 2 - minX * zoom + pad * zoom;
    targetCamera.y = (rect.height - contentH * zoom) / 2 - minY * zoom + pad * zoom;
    dirty = true;
  }

  // --- Delete Selected ---
  function deleteSelected() {
    if (selectedConnection) {
      workflow.connections = workflow.connections.filter(function(c) { return c.id !== selectedConnection.id; });
      selectedConnection = null;
      dirty = true;
      return;
    }
    if (selectedNodes.size === 0) return;
    var ids = new Set(selectedNodes);
    workflow.nodes = workflow.nodes.filter(function(n) { return !ids.has(n.id); });
    workflow.connections = workflow.connections.filter(function(c) { return !ids.has(c.from_node) && !ids.has(c.to_node); });
    selectedNodes.clear();
    dirty = true;
  }

  // --- Sidebar Palette (real app port) ---
  function buildPalette() {
    var palette = document.getElementById('node-palette');
    if (!palette) return;

    var searchIcon = ICONS.search.replace(/currentColor/g, canvasColors.textSecondary);
    var html = '<div class="palette-search"><div class="palette-search-wrap">' + searchIcon + '<input type="text" placeholder="Search nodes..." id="palette-search-input" /></div></div><div class="palette-categories">';

    for (var ci = 0; ci < CATEGORIES.length; ci++) {
      var cat = CATEGORIES[ci];
      var nodes = getNodesByCategory(cat.id);
      var arrowIcon = ICONS.chevronDown;
      html += '<div class="palette-category" data-category="' + cat.id + '">' +
        '<div class="palette-category-header">' +
          '<span class="cat-color" style="background:' + cat.color + '"></span>' +
          '<span class="cat-label">' + cat.label + '</span>' +
          '<span class="cat-arrow">' + arrowIcon + '</span>' +
        '</div>' +
        '<div class="palette-category-nodes">';

      for (var ni = 0; ni < nodes.length; ni++) {
        var n = nodes[ni];
        var nodeIcon = (ICONS[n.icon] || '').replace(/currentColor/g, n.color);
        html += '<div class="palette-node" data-node-type="' + n.type + '">' +
          '<div class="palette-node-icon-wrap" style="background:' + hexToRgba(n.color, 0.1) + '; color:' + n.color + '">' + nodeIcon + '</div>' +
          '<div class="palette-node-info">' +
            '<div class="palette-node-name">' + n.label + '</div>' +
            '<div class="palette-node-desc">' + (n.description || '') + '</div>' +
          '</div>' +
        '</div>';
      }

      html += '</div></div>';
    }

    html += '</div>';
    palette.innerHTML = html;

    // Category collapse
    palette.querySelectorAll('.palette-category-header').forEach(function(header) {
      header.addEventListener('click', function() {
        header.parentElement.classList.toggle('collapsed');
      });
    });

    // Search
    var searchInput = document.getElementById('palette-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        var q = searchInput.value.toLowerCase();
        palette.querySelectorAll('.palette-node').forEach(function(el) {
          var reg = NODE_REGISTRY[el.dataset.nodeType];
          var match = !q || reg.label.toLowerCase().indexOf(q) !== -1 || (reg.description || '').toLowerCase().indexOf(q) !== -1;
          el.style.display = match ? '' : 'none';
        });
        palette.querySelectorAll('.palette-category').forEach(function(cat) {
          var hasVisible = false;
          cat.querySelectorAll('.palette-node').forEach(function(n) {
            if (n.style.display !== 'none') hasVisible = true;
          });
          cat.style.display = hasVisible ? '' : 'none';
        });
      });
    }

    // Click to add node
    palette.querySelectorAll('.palette-node').forEach(function(el) {
      el.addEventListener('click', function() {
        var nodeType = el.dataset.nodeType;
        if (!NODE_REGISTRY[nodeType] || !workflow || !canvas) return;

        var rect = canvas.getBoundingClientRect();
        var cx = (rect.width / 2 - camera.x) / camera.zoom;
        var cy = (rect.height / 2 - camera.y) / camera.zoom;
        var snappedX = Math.round(cx / GRID_SIZE) * GRID_SIZE;
        var snappedY = Math.round(cy / GRID_SIZE) * GRID_SIZE;

        var newNode = createNodeInstance(nodeType, snappedX, snappedY);
        if (newNode) {
          workflow.nodes.push(newNode);
          selectedNodes.clear();
          selectedNodes.add(newNode.id);
          dirty = true;
        }
      });
    });
  }

  // --- Palette Popup ---
  function showPalette(px, py, canvasX, canvasY) {
    removePalette();

    paletteEl = document.createElement('div');
    paletteEl.style.cssText = 'position:fixed;z-index:10000;background:#1a1a1a;border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:8px;min-width:200px;max-height:340px;overflow-y:auto;box-shadow:0 8px 32px rgba(0,0,0,0.5);font-family:"Inter Tight",-apple-system,BlinkMacSystemFont,sans-serif;';
    paletteEl.style.left = px + 'px';
    paletteEl.style.top = py + 'px';

    var title = document.createElement('div');
    title.textContent = 'Add Node';
    title.style.cssText = 'color:#8a8f98;font-size:10px;text-transform:uppercase;letter-spacing:0.8px;padding:4px 8px 6px;';
    paletteEl.appendChild(title);

    for (var ci = 0; ci < CATEGORIES.length; ci++) {
      var cat = CATEGORIES[ci];
      var catLabel = document.createElement('div');
      catLabel.textContent = cat.label;
      catLabel.style.cssText = 'color:' + cat.color + ';font-size:10px;font-weight:600;padding:6px 8px 2px;text-transform:uppercase;letter-spacing:0.5px;';
      paletteEl.appendChild(catLabel);

      var keys = NODE_TYPE_KEYS.filter(function(k) { return NODE_REGISTRY[k].category === cat.id; });
      for (var ki = 0; ki < keys.length; ki++) {
        (function(nodeType) {
          var reg = NODE_REGISTRY[nodeType];
          var item = document.createElement('div');
          item.textContent = reg.label;
          item.style.cssText = 'color:#e3e5e8;font-size:12px;padding:5px 8px;border-radius:5px;cursor:pointer;transition:background 0.1s;';
          item.addEventListener('mouseenter', function() { item.style.background = 'rgba(255,255,255,0.06)'; });
          item.addEventListener('mouseleave', function() { item.style.background = 'none'; });
          item.addEventListener('click', function() {
            var snappedX = Math.round(canvasX / GRID_SIZE) * GRID_SIZE;
            var snappedY = Math.round(canvasY / GRID_SIZE) * GRID_SIZE;
            var newNode = createNodeInstance(nodeType, snappedX, snappedY);
            if (newNode) {
              workflow.nodes.push(newNode);
              selectedNodes.clear();
              selectedNodes.add(newNode.id);
              dirty = true;
            }
            removePalette();
          });
          paletteEl.appendChild(item);
        })(keys[ki]);
      }
    }

    document.body.appendChild(paletteEl);

    // Close on outside click
    setTimeout(function() {
      document.addEventListener('mousedown', paletteOutsideClick);
    }, 0);
  }

  function paletteOutsideClick(e) {
    if (paletteEl && !paletteEl.contains(e.target)) {
      removePalette();
    }
  }

  function removePalette() {
    if (paletteEl) {
      paletteEl.remove();
      paletteEl = null;
      document.removeEventListener('mousedown', paletteOutsideClick);
    }
  }

  // --- Event Handlers ---
  function onMouseDown(e) {
    if (!workflow) return;
    removePalette();

    var sx = e.clientX;
    var sy = e.clientY;
    var cp = screenToCanvas(sx, sy);

    // Middle click or space+left = pan
    if (e.button === 1 || (e.button === 0 && spaceHeld)) {
      dragging = { type: 'pan', startCamX: targetCamera.x, startCamY: targetCamera.y };
      dragStart = { x: sx, y: sy };
      updateCursor();
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (e.button !== 0) return;
    e.preventDefault();

    // Check port hit first
    var portHit = hitTestPort(cp.x, cp.y);
    if (portHit && portHit.type === 'output') {
      pendingConnection = {
        fromNode: portHit.node.id,
        fromPort: portHit.port.name,
        fromX: portHit.port.x,
        fromY: portHit.port.y,
        x: cp.x,
        y: cp.y,
      };
      dragging = { type: 'connect' };
      dirty = true;
      return;
    }

    // Check node hit
    var nodeHit = hitTestNode(cp.x, cp.y);
    if (nodeHit) {
      if (!e.shiftKey && !selectedNodes.has(nodeHit.id)) {
        selectedNodes.clear();
      }
      selectedNodes.add(nodeHit.id);
      selectedConnection = null;

      var startPositions = new Map();
      selectedNodes.forEach(function(id) {
        var n = workflow.nodes.find(function(nn) { return nn.id === id; });
        if (n) startPositions.set(id, { x: n.position_x, y: n.position_y });
      });

      dragging = {
        type: 'node',
        hasMoved: false,
        nodeId: nodeHit.id,
        startPositions: startPositions,
      };
      dragStart = { x: cp.x, y: cp.y };
      dirty = true;
      return;
    }

    // Check connection hit
    var connHit = hitTestConnection(cp.x, cp.y);
    if (connHit) {
      selectedConnection = connHit;
      selectedNodes.clear();
      dirty = true;
      return;
    }

    // Click empty - start selection box drag
    selectedNodes.clear();
    selectedConnection = null;
    dragging = { type: 'select', hasMoved: false };
    dragStart = { x: cp.x, y: cp.y };
    dirty = true;
  }

  function onMouseMove(e) {
    if (!workflow) return;

    var sx = e.clientX;
    var sy = e.clientY;
    var cp = screenToCanvas(sx, sy);

    if (dragging) {
      if (dragging.type === 'pan') {
        targetCamera.x = dragging.startCamX + (sx - dragStart.x);
        targetCamera.y = dragging.startCamY + (sy - dragStart.y);
        dirty = true;
      } else if (dragging.type === 'node') {
        var dx = cp.x - dragStart.x;
        var dy = cp.y - dragStart.y;
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          dragging.hasMoved = true;
          dragging.startPositions.forEach(function(start, id) {
            var n = workflow.nodes.find(function(nn) { return nn.id === id; });
            if (n) {
              if (snapToGrid) {
                n.position_x = Math.round((start.x + dx) / GRID_SIZE) * GRID_SIZE;
                n.position_y = Math.round((start.y + dy) / GRID_SIZE) * GRID_SIZE;
              } else {
                n.position_x = Math.round(start.x + dx);
                n.position_y = Math.round(start.y + dy);
              }
            }
          });
          dirty = true;
        }
      } else if (dragging.type === 'connect') {
        pendingConnection.x = cp.x;
        pendingConnection.y = cp.y;
        hoveredPort = hitTestPort(cp.x, cp.y);
        dirty = true;
      } else if (dragging.type === 'select') {
        var dx2 = cp.x - dragStart.x;
        var dy2 = cp.y - dragStart.y;
        if (Math.abs(dx2) > 5 || Math.abs(dy2) > 5) {
          dragging.hasMoved = true;
          selectionBox = { startX: dragStart.x, startY: dragStart.y, endX: cp.x, endY: cp.y };
          var bx = Math.min(selectionBox.startX, selectionBox.endX);
          var by = Math.min(selectionBox.startY, selectionBox.endY);
          var bw = Math.abs(selectionBox.endX - selectionBox.startX);
          var bh = Math.abs(selectionBox.endY - selectionBox.startY);
          selectedNodes.clear();
          for (var i = 0; i < workflow.nodes.length; i++) {
            var node = workflow.nodes[i];
            if (node.position_x + NODE_W > bx && node.position_x < bx + bw &&
                node.position_y + NODE_H > by && node.position_y < by + bh) {
              selectedNodes.add(node.id);
            }
          }
        }
        dirty = true;
      }
      return;
    }

    // Hover detection
    var nodeHit = hitTestNode(cp.x, cp.y);
    if (nodeHit !== hoveredNode) {
      hoveredNode = nodeHit;
      dirty = true;
    }

    var portHit = hitTestPort(cp.x, cp.y);
    if (portHit !== hoveredPort) {
      hoveredPort = portHit;
      updateCursor();
      dirty = true;
    }
  }

  function onMouseUp(e) {
    if (dragging) {
      if (dragging.type === 'connect' && pendingConnection) {
        var cp = screenToCanvas(e.clientX, e.clientY);
        var portHit = hitTestPort(cp.x, cp.y);
        if (portHit && portHit.type === 'input' && portHit.node.id !== pendingConnection.fromNode) {
          var exists = workflow.connections.some(function(c) {
            return c.from_node === pendingConnection.fromNode &&
                   c.from_port === pendingConnection.fromPort &&
                   c.to_node === portHit.node.id &&
                   c.to_port === portHit.port.name;
          });
          if (!exists) {
            workflow.connections.push({
              id: 'conn_' + Math.random().toString(36).substr(2, 8),
              from_node: pendingConnection.fromNode,
              from_port: pendingConnection.fromPort,
              to_node: portHit.node.id,
              to_port: portHit.port.name,
            });
          }
        }
        pendingConnection = null;
      }
      if (dragging.type === 'select') {
        selectionBox = null;
      }
      dragging = null;
      updateCursor();
      dirty = true;
    }
  }

  function onWheel(e) {
    if (e.ctrlKey || e.metaKey) {
      // Zoom — intercept scroll
      e.preventDefault();
      var sx = e.clientX;
      var sy = e.clientY;
      var zoomFactor = e.deltaY > 0 ? 0.92 : 1.08;
      var newZoom = Math.max(0.25, Math.min(3, targetCamera.zoom * zoomFactor));

      var rect = canvas.getBoundingClientRect();
      var mx = sx - rect.left;
      var my = sy - rect.top;

      targetCamera.x = mx - (mx - targetCamera.x) * (newZoom / targetCamera.zoom);
      targetCamera.y = my - (my - targetCamera.y) * (newZoom / targetCamera.zoom);
      targetCamera.zoom = newZoom;
      dirty = true;
    }
    // Otherwise let the event propagate — page scrolls normally
  }

  function onDblClick(e) {
    var cp = screenToCanvas(e.clientX, e.clientY);
    var nodeHit = hitTestNode(cp.x, cp.y);
    if (nodeHit) {
      // Double-click node: just select it (no config panel in demo)
      selectedNodes.clear();
      selectedNodes.add(nodeHit.id);
      selectedConnection = null;
      dirty = true;
    } else {
      // Double-click empty area: show palette
      showPalette(e.clientX, e.clientY, cp.x, cp.y);
    }
  }

  function onContextMenu(e) {
    e.preventDefault();
    var cp = screenToCanvas(e.clientX, e.clientY);
    // Right-click empty area: show palette
    showPalette(e.clientX, e.clientY, cp.x, cp.y);
  }

  function onKeyDown(e) {
    if (e.code === 'Space' && !isInputFocused() && !e.repeat) {
      spaceHeld = true;
      updateCursor();
      e.preventDefault();
    }

    if (e.key === 'Escape') {
      selectedNodes.clear();
      selectedConnection = null;
      pendingConnection = null;
      removePalette();
      dirty = true;
    }

    if ((e.key === 'Delete' || e.key === 'Backspace') && !isInputFocused()) {
      e.preventDefault();
      deleteSelected();
    }

    // Select All: Ctrl+A / Cmd+A
    if ((e.metaKey || e.ctrlKey) && e.key === 'a' && !isInputFocused()) {
      e.preventDefault();
      workflow.nodes.forEach(function(n) { selectedNodes.add(n.id); });
      dirty = true;
    }

    // Fit to View: Ctrl+1 / Cmd+1
    if ((e.metaKey || e.ctrlKey) && e.key === '1' && !isInputFocused()) {
      e.preventDefault();
      fitToView();
    }
  }

  function onKeyUp(e) {
    if (e.code === 'Space') {
      spaceHeld = false;
      updateCursor();
    }
  }

  // --- Demo Workflow: Social Media Auto-Post ---
  var DEMO_WORKFLOW = {
    id: 'demo',
    name: 'Social Media Auto-Post',
    nodes: [
      // Row 1: Trigger + Fetch
      { id: 'n1',  node_type: 'trigger_schedule', label: 'Daily 9 AM',        position_x: 40,  position_y: 80,  config: {} },
      { id: 'n2',  node_type: 'shopify_get_products', label: 'New Products',  position_x: 240, position_y: 80,  config: {} },
      { id: 'n3',  node_type: 'logic_filter',     label: 'Active Only',       position_x: 440, position_y: 80,  config: {} },
      { id: 'n4',  node_type: 'logic_limit',      label: 'Top 5',             position_x: 640, position_y: 80,  config: {} },

      // Row 2: AI content generation
      { id: 'n5',  node_type: 'ai_generate_text', label: 'Write Caption',     position_x: 440, position_y: 180, config: {} },
      { id: 'n6',  node_type: 'ai_summarize',     label: 'Short Hook',        position_x: 640, position_y: 180, config: {} },
      { id: 'n7',  node_type: 'data_template',    label: 'Format Post',       position_x: 840, position_y: 180, config: {} },

      // Row 3: Branch to platforms
      { id: 'n8',  node_type: 'logic_if',         label: 'Has Images?',       position_x: 640, position_y: 290, config: {} },

      // Row 4: Platform outputs (fan out)
      { id: 'n9',  node_type: 'output_webhook',   label: 'Instagram',         position_x: 240, position_y: 390, config: {} },
      { id: 'n10', node_type: 'output_webhook',   label: 'Facebook',          position_x: 440, position_y: 390, config: {} },
      { id: 'n11', node_type: 'output_webhook',   label: 'TikTok',            position_x: 640, position_y: 390, config: {} },
      { id: 'n12', node_type: 'output_webhook',   label: 'X / Twitter',       position_x: 840, position_y: 390, config: {} },
      { id: 'n13', node_type: 'output_webhook',   label: 'LinkedIn',          position_x: 1040,position_y: 390, config: {} },

      // Row 5: Merge + Log + Tag
      { id: 'n14', node_type: 'logic_delay',      label: 'Wait 30s',          position_x: 640, position_y: 490, config: {} },
      { id: 'n15', node_type: 'shopify_tag_resource', label: 'Tag "Posted"',  position_x: 840, position_y: 490, config: {} },
      { id: 'n16', node_type: 'output_log',       label: 'Audit Log',         position_x: 1040,position_y: 490, config: {} },

      // Side branch: translate
      { id: 'n17', node_type: 'ai_translate',     label: 'Spanish',           position_x: 240, position_y: 490, config: {} },
      { id: 'n18', node_type: 'output_webhook',   label: 'ES Instagram',      position_x: 40,  position_y: 490, config: {} },
    ],
    connections: [
      // Main pipeline
      { id: 'c1',  from_node: 'n1',  from_port: 'output', to_node: 'n2',  to_port: 'input' },
      { id: 'c2',  from_node: 'n2',  from_port: 'output', to_node: 'n3',  to_port: 'input' },
      { id: 'c3',  from_node: 'n3',  from_port: 'output', to_node: 'n4',  to_port: 'input' },
      { id: 'c4',  from_node: 'n4',  from_port: 'output', to_node: 'n5',  to_port: 'input' },
      // AI chain
      { id: 'c5',  from_node: 'n5',  from_port: 'output', to_node: 'n6',  to_port: 'input' },
      { id: 'c6',  from_node: 'n6',  from_port: 'output', to_node: 'n7',  to_port: 'input' },
      // Branch
      { id: 'c7',  from_node: 'n7',  from_port: 'output', to_node: 'n8',  to_port: 'input' },
      // Fan out to platforms (true = has images)
      { id: 'c8',  from_node: 'n8',  from_port: 'true',  to_node: 'n9',  to_port: 'input' },
      { id: 'c9',  from_node: 'n8',  from_port: 'true',  to_node: 'n10', to_port: 'input' },
      { id: 'c10', from_node: 'n8',  from_port: 'true',  to_node: 'n11', to_port: 'input' },
      { id: 'c11', from_node: 'n8',  from_port: 'false', to_node: 'n12', to_port: 'input' },
      { id: 'c12', from_node: 'n8',  from_port: 'false', to_node: 'n13', to_port: 'input' },
      // Post-publish: delay → tag → log
      { id: 'c13', from_node: 'n11', from_port: 'output', to_node: 'n14', to_port: 'input' },
      { id: 'c14', from_node: 'n14', from_port: 'output', to_node: 'n15', to_port: 'input' },
      { id: 'c15', from_node: 'n15', from_port: 'output', to_node: 'n16', to_port: 'input' },
      // Translate branch
      { id: 'c16', from_node: 'n9',  from_port: 'output', to_node: 'n17', to_port: 'input' },
      { id: 'c17', from_node: 'n17', from_port: 'output', to_node: 'n18', to_port: 'input' },
    ],
  };

  // --- Initialization ---
  function init() {
    canvas = document.getElementById('editor-canvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');

    // Build the sidebar palette from NODE_REGISTRY
    buildPalette();

    // Deep clone the demo workflow
    workflow = JSON.parse(JSON.stringify(DEMO_WORKFLOW));

    // Attach event listeners
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('dblclick', onDblClick);
    canvas.addEventListener('contextmenu', onContextMenu);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    // Prevent default drag behavior on canvas
    canvas.addEventListener('dragstart', function(e) { e.preventDefault(); });

    // Handle resize
    window.addEventListener('resize', function() { dirty = true; fitToView(); });

    // Initial fit to view (with a short delay to let CSS settle)
    camera.x = targetCamera.x;
    camera.y = targetCamera.y;
    camera.zoom = targetCamera.zoom;

    requestAnimationFrame(function() {
      fitToView();
      // Snap camera instantly to target on first frame
      camera.x = targetCamera.x;
      camera.y = targetCamera.y;
      camera.zoom = targetCamera.zoom;
      // Start render loop
      render();
    });
  }

  // Boot when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

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
    play: S('<polygon points="6 3 20 12 6 21 6 3"/>'),
    clock: S('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'),
    webhook: S('<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>'),
    package: S('<path d="m16.5 9.4-9-5.19"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" x2="12" y1="22.08" y2="12"/>'),
    edit: S('<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>'),
    sparkles: S('<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>'),
    filter: S('<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>'),
    gitBranch: S('<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>'),
    send: S('<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>'),
    terminal: S('<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>'),
    refreshCw: S('<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>'),
    globe: S('<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>'),
    layers: S('<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>'),
    hand: S('<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>'),
    externalLink: S('<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>'),
    bell: S('<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>'),
    zap: S('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),
  };

  // --- Node Registry (subset) ---
  var CATEGORIES = [
    { id: 'trigger', label: 'Triggers', icon: 'zap',       color: '#ff6b6b' },
    { id: 'shopify', label: 'Shopify',  icon: 'package',   color: '#96bf48' },
    { id: 'ai',      label: 'AI',       icon: 'sparkles',  color: '#a855f7' },
    { id: 'logic',   label: 'Logic',    icon: 'gitBranch', color: '#3b82f6' },
    { id: 'output',  label: 'Output',   icon: 'terminal',  color: '#10b981' },
  ];

  var NODE_REGISTRY = {
    trigger_manual: {
      type: 'trigger_manual', label: 'Manual Trigger', category: 'trigger',
      icon: 'play', inputs: [], outputs: ['output'], color: '#ff6b6b',
    },
    trigger_schedule: {
      type: 'trigger_schedule', label: 'Schedule Trigger', category: 'trigger',
      icon: 'clock', inputs: [], outputs: ['output'], color: '#ff6b6b',
    },
    trigger_webhook: {
      type: 'trigger_webhook', label: 'Webhook Trigger', category: 'trigger',
      icon: 'webhook', inputs: [], outputs: ['output'], color: '#ff6b6b',
    },
    shopify_get_products: {
      type: 'shopify_get_products', label: 'Get Products', category: 'shopify',
      icon: 'package', inputs: ['input'], outputs: ['output'], color: '#96bf48',
    },
    shopify_update_product: {
      type: 'shopify_update_product', label: 'Update Product', category: 'shopify',
      icon: 'edit', inputs: ['input'], outputs: ['output'], color: '#96bf48',
    },
    ai_generate_text: {
      type: 'ai_generate_text', label: 'Generate Text', category: 'ai',
      icon: 'sparkles', inputs: ['input'], outputs: ['output'], color: '#a855f7',
    },
    ai_rewrite: {
      type: 'ai_rewrite', label: 'Rewrite Text', category: 'ai',
      icon: 'refreshCw', inputs: ['input'], outputs: ['output'], color: '#a855f7',
    },
    logic_filter: {
      type: 'logic_filter', label: 'Filter', category: 'logic',
      icon: 'filter', inputs: ['input'], outputs: ['output'], color: '#3b82f6',
    },
    logic_if: {
      type: 'logic_if', label: 'If Condition', category: 'logic',
      icon: 'gitBranch', inputs: ['input'], outputs: ['true', 'false'], color: '#3b82f6',
    },
    logic_limit: {
      type: 'logic_limit', label: 'Limit', category: 'logic',
      icon: 'hand', inputs: ['input'], outputs: ['output'], color: '#3b82f6',
    },
    output_log: {
      type: 'output_log', label: 'Log Output', category: 'output',
      icon: 'terminal', inputs: ['input'], outputs: ['output'], color: '#10b981',
    },
    output_webhook: {
      type: 'output_webhook', label: 'Send Webhook', category: 'output',
      icon: 'externalLink', inputs: ['input'], outputs: ['output'], color: '#10b981',
    },
    output_notification: {
      type: 'output_notification', label: 'Notification', category: 'output',
      icon: 'bell', inputs: ['input'], outputs: ['output'], color: '#10b981',
    },
  };

  var NODE_TYPE_KEYS = Object.keys(NODE_REGISTRY);

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
  var NODE_W = 180;
  var NODE_H = 44;
  var PORT_R = 5;
  var PORT_R_HOVER = 7;
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
    var iconCX = x + ACCENT_W + 12 + 13;
    var iconCY = y + h / 2;
    ctx.fillStyle = hexToRgba(color, 0.15);
    ctx.beginPath();
    ctx.arc(iconCX, iconCY, 13, 0, Math.PI * 2);
    ctx.fill();

    // Icon image
    var iconImg = getIconImage(reg.icon, color, 15);
    if (iconImg && iconImg.complete && iconImg.naturalWidth > 0) {
      ctx.drawImage(iconImg, iconCX - 7.5, iconCY - 7.5, 15, 15);
    }

    // Label
    var textX = iconCX + 20;
    var maxTextW = w - (textX - x) - 10;
    ctx.fillStyle = canvasColors.text;
    ctx.font = '500 12px "Inter Tight", -apple-system, BlinkMacSystemFont, sans-serif';
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

  // --- Demo Workflow ---
  var DEMO_WORKFLOW = {
    id: 'demo',
    name: 'SEO Description Fixer',
    nodes: [
      { id: 'n1', node_type: 'trigger_manual', label: 'Manual Start', position_x: 60, position_y: 140, config: {} },
      { id: 'n2', node_type: 'shopify_get_products', label: 'Get Products', position_x: 300, position_y: 140, config: {} },
      { id: 'n3', node_type: 'logic_filter', label: 'Filter Empty', position_x: 540, position_y: 140, config: {} },
      { id: 'n4', node_type: 'ai_generate_text', label: 'AI Rewrite', position_x: 540, position_y: 260, config: {} },
      { id: 'n5', node_type: 'shopify_update_product', label: 'Update Product', position_x: 300, position_y: 260, config: {} },
    ],
    connections: [
      { id: 'c1', from_node: 'n1', from_port: 'output', to_node: 'n2', to_port: 'input' },
      { id: 'c2', from_node: 'n2', from_port: 'output', to_node: 'n3', to_port: 'input' },
      { id: 'c3', from_node: 'n3', from_port: 'output', to_node: 'n4', to_port: 'input' },
      { id: 'c4', from_node: 'n4', from_port: 'output', to_node: 'n5', to_port: 'input' },
    ],
  };

  // --- Initialization ---
  function init() {
    canvas = document.getElementById('editor-canvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');

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

    // Wire sidebar palette click handlers
    var paletteNodes = document.querySelectorAll('.palette-node[data-node-type]');
    for (var pi = 0; pi < paletteNodes.length; pi++) {
      (function(el) {
        el.addEventListener('click', function() {
          var nodeType = el.getAttribute('data-node-type');
          if (!NODE_REGISTRY[nodeType] || !workflow) return;

          // Place new node at center of current viewport
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
      })(paletteNodes[pi]);
    }

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

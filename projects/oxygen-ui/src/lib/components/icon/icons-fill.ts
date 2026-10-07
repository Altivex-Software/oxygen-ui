import { OxIconName } from './icon.types';
import { IconDefinition } from './icons';

export const OX_FILL_ICONS: Partial<Record<OxIconName, IconDefinition>> = {
  // --- UI & GENERAL (FILL) ---
  'search-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>',
    strokeInFill: false
  },
  'home-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>',
    strokeInFill: false
  },
  'user-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>',
    strokeInFill: false
  },
  'users-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>',
    strokeInFill: false
  },
  'user-plus-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>',
    strokeInFill: false
  },
  'user-minus-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-1V9H1v2h5zm9 3c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>',
    strokeInFill: false
  },
  'user-check-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9.5 1.5L2 10l1.41-1.41L5.5 10.67l5.09-5.09L12 7l-6.5 6.5zm9.5.5c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>',
    strokeInFill: false
  },
  'user-x-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-7.5 1.5L6 12 4.5 13.5 3 12l-1.5 1.5L3 15l-1.5 1.5L3 18l1.5-1.5L6 18l1.5-1.5L6 15l1.5-1.5zM15 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>',
    strokeInFill: false
  },
  'id-card-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-11 5c1.38 0 2.5 1.12 2.5 2.5S10.38 14 9 14s-2.5-1.12-2.5-2.5S7.62 9 9 9zm6 8H3v-.5c0-2 4-3.1 6-3.1s6 1.1 6 3.1v.5zm4-2h-3v-2h3v2zm0-4h-3V9h3v2z"></path>',
    strokeInFill: false
  },
  'settings-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path>',
    strokeInFill: false
  },
  'sliders-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path>',
    strokeInFill: false
  },
  'filter-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path>',
    strokeInFill: false
  },
  'trash-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>',
    strokeInFill: false
  },
  'trash-2-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path>',
    strokeInFill: false
  },
  'edit-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>',
    strokeInFill: false
  },
  'copy-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>',
    strokeInFill: false
  },
  'share-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"></path>',
    strokeInFill: false
  },
  'share-2-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"></path>',
    strokeInFill: false
  },
  'grid-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M3 3h7v7H3zm11 0h7v7h-7zm-11 11h7v7H3zm11 0h7v7h-7z"></path>',
    strokeInFill: false
  },
  'layers-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"></path>',
    strokeInFill: false
  },
  'tag-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"></path>',
    strokeInFill: false
  },
  'pin-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"></path>',
    strokeInFill: false
  },
  'bookmark-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path>',
    strokeInFill: false
  },
  'layout-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M3 3v18h18V3H3zm16 16H5V9h14v10zm0-12H5V5h14v2z"></path>',
    strokeInFill: false
  },
  'sidebar-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 16H5V5h5v14zm9 0h-7V5h7v14z"></path>',
    strokeInFill: false
  },
  'table-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 2v3H5V5h14zm-9 5h4v9h-4v-9zm-2 9H5v-9h3v9zm8 0v-9h3v9h-3z"></path>',
    strokeInFill: false
  },
  'palette-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.64-.24-1.22-.64-1.66-.4-.44-.66-1.02-.66-1.66 0-1.38 1.12-2.5 2.5-2.5H18c2.21 0 4-1.79 4-4 0-5.52-4.48-9.68-10-9.68zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8 8 8.67 8 9.5 7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path>',
    strokeInFill: false
  },
  'target-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>',
    strokeInFill: false
  },
  'printer-fill': {
    category: 'UI & General (Fill)',
    paths: '<path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"></path>',
    strokeInFill: false
  },

  // --- TEXT & FORMATTING (FILL) ---
  'bold-fill': {
    category: 'Editor de Texto (Fill)',
    paths: '<path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"></path>',
    strokeInFill: false
  },
  'quote-fill': {
    category: 'Editor de Texto (Fill)',
    paths: '<path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"></path>',
    strokeInFill: false
  },

  // --- ACTIONS & STATES (FILL) ---
  'check-circle-fill': {
    category: 'Acciones & Estados (Fill)',
    paths: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>',
    strokeInFill: false
  },
  'x-circle-fill': {
    category: 'Acciones & Estados (Fill)',
    paths: '<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>',
    strokeInFill: false
  },
  'plus-circle-fill': {
    category: 'Acciones & Estados (Fill)',
    paths: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path>',
    strokeInFill: false
  },
  'minus-circle-fill': {
    category: 'Acciones & Estados (Fill)',
    paths: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path>',
    strokeInFill: false
  },
  'help-circle-fill': {
    category: 'Acciones & Estados (Fill)',
    paths: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"></path>',
    strokeInFill: false
  },
  'info-fill': {
    category: 'Acciones & Estados (Fill)',
    paths: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>',
    strokeInFill: false
  },
  'alert-circle-fill': {
    category: 'Acciones & Estados (Fill)',
    paths: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>',
    strokeInFill: false
  },
  'alert-triangle-fill': {
    category: 'Acciones & Estados (Fill)',
    paths: '<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>',
    strokeInFill: false
  },
  'alert-octagon-fill': {
    category: 'Acciones & Estados (Fill)',
    paths: '<path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"></path>',
    strokeInFill: false
  },
  'power-fill': {
    category: 'Acciones & Estados (Fill)',
    paths: '<path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"></path>',
    strokeInFill: false
  },

  // --- NAVIGATION (FILL) ---
  'navigation-fill': {
    category: 'Navegación & Flechas (Fill)',
    paths: '<polygon points="12 2 4.5 20.29 5.21 21 12 18 18.79 21 19.5 20.29 12 2"></polygon>',
    strokeInFill: false
  },

  // --- COMMUNICATION & SOCIAL (FILL) ---
  'mail-fill': {
    category: 'Comunicación (Fill)',
    paths: '<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>',
    strokeInFill: false
  },
  'inbox-fill': {
    category: 'Comunicación (Fill)',
    paths: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 10h-4c0 1.66-1.34 3-3 3s-3-1.34-3-3H4.99V5H19v8z"></path>',
    strokeInFill: false
  },
  'message-square-fill': {
    category: 'Comunicación (Fill)',
    paths: '<path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path>',
    strokeInFill: false
  },
  'message-circle-fill': {
    category: 'Comunicación (Fill)',
    paths: '<path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l5.25-1.28A9.97 9.97 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"></path>',
    strokeInFill: false
  },
  'message-dots-fill': {
    category: 'Comunicación (Fill)',
    paths: '<path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path>',
    strokeInFill: false
  },
  'send-fill': {
    category: 'Comunicación (Fill)',
    paths: '<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>',
    strokeInFill: false
  },
  'phone-fill': {
    category: 'Comunicación (Fill)',
    paths: '<path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-2.2 2.2a15.05 15.05 0 0 1-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-.99-1.12z"></path>',
    strokeInFill: false
  },
  'bell-fill': {
    category: 'Comunicación (Fill)',
    paths: '<path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path>',
    strokeInFill: false
  },
  'bell-off-fill': {
    category: 'Comunicación (Fill)',
    paths: '<path d="M20 18.69L4.31 3 3 4.31l3.52 3.52C6.19 8.94 6 10.36 6 11.83v5L4 18.83v1h14.17l2.52 2.52 1.31-1.31-2-2.35zM12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-7.17l-6-6V4.83c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68c-.73.23-1.39.59-1.95 1.05L18 13.56v1.27z"></path>',
    strokeInFill: false
  },
  'globe-fill': {
    category: 'Comunicación (Fill)',
    paths: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>',
    strokeInFill: false
  },
  'thumbs-up-fill': {
    category: 'Comunicación (Fill)',
    paths: '<path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"></path>',
    strokeInFill: false
  },
  'thumbs-down-fill': {
    category: 'Comunicación (Fill)',
    paths: '<path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path>',
    strokeInFill: false
  },
  'heart-fill': {
    category: 'Comunicación (Fill)',
    paths: '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>',
    strokeInFill: false
  },
  'heart-pulse-fill': {
    category: 'Comunicación (Fill)',
    paths: '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>',
    strokeInFill: false
  },
  'star-fill': {
    category: 'Comunicación (Fill)',
    paths: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>',
    strokeInFill: false
  },
  'smile-fill': {
    category: 'Comunicación (Fill)',
    paths: '<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path>',
    strokeInFill: false
  },
  'award-fill': {
    category: 'Comunicación (Fill)',
    paths: '<path d="M12 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-4.79 1.11l-3.21 6.89 8-3 8 3-3.21-6.89A7.95 7.95 0 0 1 12 17c-1.81 0-3.48-.6-4.79-1.69z"></path>',
    strokeInFill: false
  },
  'trophy-fill': {
    category: 'Comunicación (Fill)',
    paths: '<path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H7v2h10v-2h-4v-3.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"></path>',
    strokeInFill: false
  },
  'crown-fill': {
    category: 'Comunicación (Fill)',
    paths: '<path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1h14v1z"></path>',
    strokeInFill: false
  },
  'flag-fill': {
    category: 'Comunicación (Fill)',
    paths: '<path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"></path>',
    strokeInFill: false
  },
  'coffee-fill': {
    category: 'Comunicación (Fill)',
    paths: '<path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 5h-2V5h2v3zM2 21h18v-2H2v2z"></path>',
    strokeInFill: false
  },
  'life-buoy-fill': {
    category: 'Comunicación (Fill)',
    paths: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path>',
    strokeInFill: false
  },

  // --- SOCIAL & BRANDS (FILL) ---
  'facebook-fill': {
    category: 'Marcas & Redes Sociales (Fill)',
    paths: '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>',
    strokeInFill: false
  },
  'github-fill': {
    category: 'Marcas & Redes Sociales (Fill)',
    paths: '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>',
    strokeInFill: false
  },
  'discord-fill': {
    category: 'Marcas & Redes Sociales (Fill)',
    paths: '<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path>',
    strokeInFill: false
  },
  'twitter-fill': {
    category: 'Marcas & Redes Sociales (Fill)',
    paths: '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>',
    strokeInFill: false
  },
  'instagram-fill': {
    category: 'Marcas & Redes Sociales (Fill)',
    paths: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>',
    strokeInFill: false
  },
  'linkedin-fill': {
    category: 'Marcas & Redes Sociales (Fill)',
    paths: '<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.5A1.6 1.6 0 0 0 6.2 8.1c0 .88.72 1.6 1.63 1.6.9 0 1.63-.72 1.63-1.6 0-.89-.73-1.6-1.63-1.6z"></path>',
    strokeInFill: false
  },
  'youtube-fill': {
    category: 'Marcas & Redes Sociales (Fill)',
    paths: '<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>',
    strokeInFill: false
  },
  'twitch-fill': {
    category: 'Marcas & Redes Sociales (Fill)',
    paths: '<path d="M2.149 0L.537 4.11v16.436h5.365V24h3.755l3.219-3.454h4.829l6.295-6.295V0H2.149zm19.298 13.064l-3.755 3.755H12.32L9.1 19.991v-3.172H5.894V2.149h15.553v10.915zm-8.574-7.245h2.145v6.426h-2.145V5.819zm-4.823 0h2.145v6.426H8.05V5.819z"></path>',
    strokeInFill: false
  },
  'tiktok-fill': {
    category: 'Marcas & Redes Sociales (Fill)',
    paths: '<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .57.04.84.11V9.41a6.33 6.33 0 0 0-.84-.05A6.33 6.33 0 0 0 3 15.69a6.33 6.33 0 0 0 10.79 4.47c1.7-1.7 2.05-4.14 2.05-6.49V8.62a8.28 8.28 0 0 0 4.84 1.54V6.71c-.37 0-.74-.01-1.09-.02z"></path>',
    strokeInFill: false
  },
  'slack-fill': {
    category: 'Marcas & Redes Sociales (Fill)',
    paths: '<path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"></path>',
    strokeInFill: false
  },
  'gitlab-fill': {
    category: 'Marcas & Redes Sociales (Fill)',
    paths: '<path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 5.5 2a.43.43 0 0 1 .4.28l2.44 7.49h7.32l2.44-7.49a.43.43 0 0 1 .4-.28.42.42 0 0 1 .79.21l2.44 7.51 1.22 3.78a.84.84 0 0 1-.3.94z"></path>',
    strokeInFill: false
  },
  'figma-fill': {
    category: 'Marcas & Redes Sociales (Fill)',
    paths: '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path>',
    strokeInFill: false
  },
  'dribbble-fill': {
    category: 'Marcas & Redes Sociales (Fill)',
    paths: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.6 4.79a8.03 8.03 0 0 1 1.83 5.09c-.37-.08-2.22-.44-4.34-.23-.1-.23-.2-.46-.31-.69-.97-2.02-2.12-3.8-2.48-4.34 2.29-.69 4.34-.25 5.3.17zM12 3.99c.35.53 1.48 2.27 2.44 4.24-2.88.85-5.44.89-6.31.89-.04-.08-.07-.17-.11-.25C6.72 6.45 8.97 4.41 12 3.99zm-5.4 6.84c.73 0 3.03-.03 5.75-.82.11.23.21.46.3.7-2.67 2.45-5.38 6.45-6.17 7.74-1.57-1.63-2.48-3.9-2.48-6.45 0-.41.03-.8.08-1.19.78.02 1.81.02 2.52.02zm3.32 8.79c.67-1.18 3.12-4.87 5.72-7.14.77 2.1 1.34 4.54 1.54 5.92-1.85 1.53-4.27 2.42-6.9 2.42-.12 0-.24 0-.36-.01zm8.74-2.85c-.21-1.25-.72-3.47-1.42-5.45 1.95-.2 3.63.18 4.01.29-.3 2.16-1.26 4.09-2.59 5.16z"></path>',
    strokeInFill: false
  },
  'whatsapp-fill': {
    category: 'Marcas & Redes Sociales (Fill)',
    paths: '<path d="M12 2C6.477 2 2 6.477 2 12c0 1.758.455 3.411 1.25 4.851L2 22l5.31-1.393C8.694 21.378 10.3 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm5.7 13.9c-.24.67-1.39 1.29-1.92 1.36-.51.07-1.16.1-3.34-.8-2.8-1.15-4.57-4-4.71-4.18-.14-.19-1.14-1.52-1.14-2.89 0-1.37.72-2.05.97-2.33.26-.28.56-.35.75-.35.19 0 .38 0 .54.01.17.01.4-.07.62.47.24.58.8 1.95.87 2.09.07.14.12.31.02.5-.09.19-.14.3-.28.46-.14.16-.3.35-.43.47-.14.14-.29.29-.12.58.17.29.74 1.22 1.6 1.98 1.1 1 2.03 1.31 2.32 1.45.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.64-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.7-.17 1.37z"></path>',
    strokeInFill: false
  },
  'telegram-fill': {
    category: 'Marcas & Redes Sociales (Fill)',
    paths: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"></path>',
    strokeInFill: false
  },
  'reddit-fill': {
    category: 'Marcas & Redes Sociales (Fill)',
    paths: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm7.1 11.23c.06.25.09.5.09.77 0 2.85-3.29 5.16-7.34 5.16-4.06 0-7.35-2.31-7.35-5.16 0-.27.03-.52.09-.77a2.01 2.01 0 0 1-1.09-1.73c0-1.1.9-2 2-2 .57 0 1.08.24 1.45.62 1.34-.84 3.09-1.39 5.01-1.47l1.07-4.78 3.28.7a1.5 1.5 0 1 1 .28 1.07l-2.47-.53-.82 3.65c1.86.1 3.56.65 4.87 1.48.37-.38.88-.62 1.45-.62 1.1 0 2 .9 2 2 0 .73-.4 1.37-1.02 1.72zM9.5 13c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm5 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-5.06 4.34c.26.25.68.25.94 0 .57-.55 1.48-.84 2.12-.84.64 0 1.55.29 2.12.84.26.25.68.25.94 0 .26-.25.26-.66 0-.91-.84-.81-2.09-1.23-3.06-1.23s-2.22.42-3.06 1.23c-.26.25-.26.66 0 .91z"></path>',
    strokeInFill: false
  },
  'google-fill': {
    category: 'Marcas & Redes Sociales (Fill)',
    paths: '<path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.053 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path>',
    strokeInFill: false
  },
  'apple-fill': {
    category: 'Marcas & Redes Sociales (Fill)',
    paths: '<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.66-.8 1.1-1.92.98-3.04-.95.04-2.1.63-2.78 1.43-.59.68-1.11 1.77-.97 2.87 1.06.08 2.11-.51 2.77-1.26z"></path>',
    strokeInFill: false
  },
  'spotify-fill': {
    category: 'Marcas & Redes Sociales (Fill)',
    paths: '<path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.348-1.435-5.304-1.76-8.785-.963-.335.077-.67-.133-.746-.468-.077-.334.132-.67.467-.746 3.808-.87 7.076-.496 9.713 1.115.294.18.388.563.208.855zm1.226-2.724c-.226.367-.707.482-1.074.256-2.687-1.652-6.785-2.131-9.965-1.165-.413.126-.85-.107-.975-.521-.126-.414.107-.85.521-.975 3.633-1.103 8.147-.568 11.238 1.332.366.226.481.707.255 1.073zm.106-2.835C14.692 8.95 9.375 8.775 6.297 9.709c-.494.15-1.02-.128-1.169-.622-.15-.494.128-1.02.622-1.169 3.532-1.072 9.404-.866 13.115 1.337.445.264.59.838.327 1.282-.264.443-.838.59-1.282.327z"></path>',
    strokeInFill: false
  },

  // --- FILES & DOCUMENTS (FILL) ---
  'file-fill': {
    category: 'Archivos & Documentos (Fill)',
    paths: '<path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z"></path>',
    strokeInFill: false
  },
  'file-text-fill': {
    category: 'Archivos & Documentos (Fill)',
    paths: '<path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path>',
    strokeInFill: false
  },
  'file-plus-fill': {
    category: 'Archivos & Documentos (Fill)',
    paths: '<path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"></path>',
    strokeInFill: false
  },
  'file-minus-fill': {
    category: 'Archivos & Documentos (Fill)',
    paths: '<path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 14H8v-2h8v2zm-3-7V3.5L18.5 9H13z"></path>',
    strokeInFill: false
  },
  'file-check-fill': {
    category: 'Archivos & Documentos (Fill)',
    paths: '<path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-3.5 15.5L6.5 13.5l1.41-1.41L10.5 14.67l5.09-5.09L17 11l-6.5 6.5zM13 9V3.5L18.5 9H13z"></path>',
    strokeInFill: false
  },
  'file-x-fill': {
    category: 'Archivos & Documentos (Fill)',
    paths: '<path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 13.59L14.59 17 12 14.41 9.41 17 8 15.59 10.59 13 8 10.41 9.41 9 12 11.59 14.59 9 16 10.41 13.41 13 16 15.59zM13 9V3.5L18.5 9H13z"></path>',
    strokeInFill: false
  },
  'file-code-fill': {
    category: 'Archivos & Documentos (Fill)',
    paths: '<path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-4.7 13.3L7.7 14l1.6-1.3-.7-.7L6.3 14l2.3 2 .7-.7zm4.7 0l.7.7 2.3-2-2.3-2-.7.7 1.6 1.3-1.6 1.3zM13 9V3.5L18.5 9H13z"></path>',
    strokeInFill: false
  },
  'file-pdf-fill': {
    category: 'Archivos & Documentos (Fill)',
    paths: '<path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 9h-3v5H8v-7h4c1.1 0 2 .9 2 2s-.9 2-2 2h-1v-2zm1-2V3.5L18.5 9H14z"></path>',
    strokeInFill: false
  },
  'file-spreadsheet-fill': {
    category: 'Archivos & Documentos (Fill)',
    paths: '<path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-5 4h3v2H8v-2zm5 0h3v2h-3v-2zm-5 4h3v2H8v-2zm5 0h3v2h-3v-2z"></path>',
    strokeInFill: false
  },
  'file-zip-fill': {
    category: 'Archivos & Documentos (Fill)',
    paths: '<path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-3 2h2v2h-2v-2zm0 3h2v2h-2v-2zm0 3h2v2h-2v-2z"></path>',
    strokeInFill: false
  },
  'folder-fill': {
    category: 'Archivos & Documentos (Fill)',
    paths: '<path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path>',
    strokeInFill: false
  },
  'folder-plus-fill': {
    category: 'Archivos & Documentos (Fill)',
    paths: '<path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"></path>',
    strokeInFill: false
  },
  'folder-minus-fill': {
    category: 'Archivos & Documentos (Fill)',
    paths: '<path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-3 8H7v-2h10v2z"></path>',
    strokeInFill: false
  },
  'folder-open-fill': {
    category: 'Archivos & Documentos (Fill)',
    paths: '<path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"></path>',
    strokeInFill: false
  },
  'archive-fill': {
    category: 'Archivos & Documentos (Fill)',
    paths: '<path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.83-1h12l.83 1H5.12z"></path>',
    strokeInFill: false
  },
  'box-fill': {
    category: 'Archivos & Documentos (Fill)',
    paths: '<path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path>',
    strokeInFill: false
  },
  'save-fill': {
    category: 'Archivos & Documentos (Fill)',
    paths: '<path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path>',
    strokeInFill: false
  },
  'clipboard-fill': {
    category: 'Archivos & Documentos (Fill)',
    paths: '<path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path>',
    strokeInFill: false
  },

  // --- DEVICES & HARDWARE (FILL) ---
  'monitor-fill': {
    category: 'Dispositivos (Fill)',
    paths: '<path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h6l-2 3v1h8v-1l-2-3h6c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z"></path>',
    strokeInFill: false
  },
  'smartphone-fill': {
    category: 'Dispositivos (Fill)',
    paths: '<path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"></path>',
    strokeInFill: false
  },
  'tablet-fill': {
    category: 'Dispositivos (Fill)',
    paths: '<path d="M18.5 0h-13C4.12 0 3 1.12 3 2.5v19C3 22.88 4.12 24 5.5 24h13c1.38 0 2.5-1.12 2.5-2.5v-19C21 1.12 19.88 0 18.5 0zm-6.5 22.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm6.5-4H5.5V3h13v15.5z"></path>',
    strokeInFill: false
  },
  'laptop-fill': {
    category: 'Dispositivos (Fill)',
    paths: '<path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"></path>',
    strokeInFill: false
  },
  'mouse-fill': {
    category: 'Dispositivos (Fill)',
    paths: '<path d="M12 2C8.13 2 5 5.13 5 9v6c0 3.87 3.13 7 7 7s7-3.13 7-7V9c0-3.87-3.13-7-7-7zm-1 7V5c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1z"></path>',
    strokeInFill: false
  },
  'keyboard-fill': {
    category: 'Dispositivos (Fill)',
    paths: '<path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z"></path>',
    strokeInFill: false
  },
  'plug-fill': {
    category: 'Dispositivos (Fill)',
    paths: '<path d="M16 7V3h-2v4h-4V3H8v4C5.79 7 4 8.79 4 11v3c0 2.21 1.79 4 4 4v3h2v-3h4v3h2v-3c2.21 0 4-1.79 4-4v-3c0-2.21-1.79-4-4-4z"></path>',
    strokeInFill: false
  },
  'tv-fill': {
    category: 'Dispositivos (Fill)',
    paths: '<path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"></path>',
    strokeInFill: false
  },
  'cpu-fill': {
    category: 'Dispositivos (Fill)',
    paths: '<path d="M4 4v16h16V4H4zm14 14H6V6h12v12zM9 9h6v6H9V9z"></path>',
    strokeInFill: false
  },
  'hard-drive-fill': {
    category: 'Dispositivos (Fill)',
    paths: '<path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-6H6V6h12v6z"></path>',
    strokeInFill: false
  },
  'server-fill': {
    category: 'Dispositivos (Fill)',
    paths: '<path d="M20 2H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 5h-2V5h2v2zm2 7H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm-2 5h-2v-2h2v2z"></path>',
    strokeInFill: false
  },
  'battery-fill': {
    category: 'Dispositivos (Fill)',
    paths: '<path d="M17 5H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-4h-2V7c0-1.1-.9-2-2-2z"></path>',
    strokeInFill: false
  },
  'camera-fill': {
    category: 'Dispositivos (Fill)',
    paths: '<path d="M12 12c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm8-7h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-8 14c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path>',
    strokeInFill: false
  },
  'mic-fill': {
    category: 'Dispositivos (Fill)',
    paths: '<path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"></path>',
    strokeInFill: false
  },
  'volume-fill': {
    category: 'Dispositivos (Fill)',
    paths: '<path d="M3 9v6h4l5 5V4L7 9H3z"></path>',
    strokeInFill: false
  },
  'volume-1-fill': {
    category: 'Dispositivos (Fill)',
    paths: '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"></path>',
    strokeInFill: false
  },
  'volume-2-fill': {
    category: 'Dispositivos (Fill)',
    paths: '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>',
    strokeInFill: false
  },
  'volume-x-fill': {
    category: 'Dispositivos (Fill)',
    paths: '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path>',
    strokeInFill: false
  },

  // --- MEDIA & PLAYER (FILL) ---
  'play-fill': {
    category: 'Multimedia (Fill)',
    paths: '<path d="M8 5v14l11-7z"></path>',
    strokeInFill: false
  },
  'play-circle-fill': {
    category: 'Multimedia (Fill)',
    paths: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"></path>',
    strokeInFill: false
  },
  'pause-fill': {
    category: 'Multimedia (Fill)',
    paths: '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>',
    strokeInFill: false
  },
  'pause-circle-fill': {
    category: 'Multimedia (Fill)',
    paths: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"></path>',
    strokeInFill: false
  },
  'stop-circle-fill': {
    category: 'Multimedia (Fill)',
    paths: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 14H8V8h8v8z"></path>',
    strokeInFill: false
  },
  'skip-forward-fill': {
    category: 'Multimedia (Fill)',
    paths: '<path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"></path>',
    strokeInFill: false
  },
  'skip-back-fill': {
    category: 'Multimedia (Fill)',
    paths: '<path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"></path>',
    strokeInFill: false
  },
  'fast-forward-fill': {
    category: 'Multimedia (Fill)',
    paths: '<path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"></path>',
    strokeInFill: false
  },
  'rewind-fill': {
    category: 'Multimedia (Fill)',
    paths: '<path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"></path>',
    strokeInFill: false
  },
  'image-fill': {
    category: 'Multimedia (Fill)',
    paths: '<path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path>',
    strokeInFill: false
  },
  'video-fill': {
    category: 'Multimedia (Fill)',
    paths: '<path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"></path>',
    strokeInFill: false
  },
  'music-fill': {
    category: 'Multimedia (Fill)',
    paths: '<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"></path>',
    strokeInFill: false
  },
  'headphones-fill': {
    category: 'Multimedia (Fill)',
    paths: '<path d="M12 1a9 9 0 0 0-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7a9 9 0 0 0-9-9z"></path>',
    strokeInFill: false
  },
  'disc-fill': {
    category: 'Multimedia (Fill)',
    paths: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-6c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path>',
    strokeInFill: false
  },

  // --- COMMERCE & FINANCE (FILL) ---
  'shopping-cart-fill': {
    category: 'Comercio & Finanzas (Fill)',
    paths: '<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path>',
    strokeInFill: false
  },
  'shopping-bag-fill': {
    category: 'Comercio & Finanzas (Fill)',
    paths: '<path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"></path>',
    strokeInFill: false
  },
  'credit-card-fill': {
    category: 'Comercio & Finanzas (Fill)',
    paths: '<path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path>',
    strokeInFill: false
  },
  'calculator-fill': {
    category: 'Comercio & Finanzas (Fill)',
    paths: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 4v2H7V7h10zm-8 6H7v-2h2v2zm0 4H7v-2h2v2zm4-4h-2v-2h2v2zm0 4h-2v-2h2v2zm4 0h-2v-6h2v6z"></path>',
    strokeInFill: false
  },
  'ticket-fill': {
    category: 'Comercio & Finanzas (Fill)',
    paths: '<path d="M20 4H4c-1.1 0-1.99.9-1.99 2v3c1.1 0 1.99.9 1.99 2s-.89 2-2 2v3c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-3c-1.1 0-2-.9-2-2s.9-2 2-2V6c0-1.1-.9-2-2-2zm-9 13h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path>',
    strokeInFill: false
  },
  'gift-fill': {
    category: 'Comercio & Finanzas (Fill)',
    paths: '<path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.65-.5-.65C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1h-2V5c0-.55.45-1 1-1zM9 4c.55 0 1 .45 1 1v1H8c-.55 0-1-.45-1-1s.45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76V14h2V8.76L15.38 12 17 10.83 14.92 8H20v6z"></path>',
    strokeInFill: false
  },
  'package-fill': {
    category: 'Comercio & Finanzas (Fill)',
    paths: '<path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18s-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18s.41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9z"></path>',
    strokeInFill: false
  },
  'truck-fill': {
    category: 'Comercio & Finanzas (Fill)',
    paths: '<path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path>',
    strokeInFill: false
  },
  'briefcase-fill': {
    category: 'Comercio & Finanzas (Fill)',
    paths: '<path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"></path>',
    strokeInFill: false
  },
  'wallet-fill': {
    category: 'Comercio & Finanzas (Fill)',
    paths: '<path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path>',
    strokeInFill: false
  },
  'receipt-fill': {
    category: 'Comercio & Finanzas (Fill)',
    paths: '<path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"></path>',
    strokeInFill: false
  },
  'coins-fill': {
    category: 'Comercio & Finanzas (Fill)',
    paths: '<path d="M15 4c-4.42 0-8 1.79-8 4s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zm0 6c-3.31 0-6-.9-6-2s2.69-2 6-2 6 .9 6 2-2.69 2-6 2zM3 12c0-1.3 1.25-2.45 3.24-3.17-.15.37-.24.76-.24 1.17 0 1.53 1.23 2.91 3.25 3.75C7.26 14.54 3 15.65 3 17v3h6v-2H5v-1.13c1.04-.56 2.63-1.07 4.57-1.42-.36-.61-.57-1.3-.57-2.05 0-.14.02-.27.04-.4C7.03 13.56 5 13.06 5 12.5v-.05L3 12zm12 1c-4.42 0-8 1.79-8 4s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zm0 6c-3.31 0-6-.9-6-2s2.69-2 6-2 6 .9 6 2-2.69 2-6 2z"></path>',
    strokeInFill: false
  },
  'banknote-fill': {
    category: 'Comercio & Finanzas (Fill)',
    paths: '<path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-8 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm7-7h-2V7h2v1zM5 17h2v-1H5v1zm14 0h-2v-1h2v1zM5 8h2V7H5v1z"></path>',
    strokeInFill: false
  },
  'store-fill': {
    category: 'Comercio & Finanzas (Fill)',
    paths: '<path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"></path>',
    strokeInFill: false
  },

  // --- SECURITY & TIME (FILL) ---
  'lock-fill': {
    category: 'Seguridad & Tiempo (Fill)',
    paths: '<path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path>',
    strokeInFill: false
  },
  'unlock-fill': {
    category: 'Seguridad & Tiempo (Fill)',
    paths: '<path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5-2.28 0-4.27 1.54-4.84 3.75l1.93.54C10.5 3.85 11.69 3 13 3c1.66 0 3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"></path>',
    strokeInFill: false
  },
  'key-fill': {
    category: 'Seguridad & Tiempo (Fill)',
    paths: '<path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>',
    strokeInFill: false
  },
  'shield-fill': {
    category: 'Seguridad & Tiempo (Fill)',
    paths: '<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"></path>',
    strokeInFill: false
  },
  'shield-check-fill': {
    category: 'Seguridad & Tiempo (Fill)',
    paths: '<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path>',
    strokeInFill: false
  },
  'shield-alert-fill': {
    category: 'Seguridad & Tiempo (Fill)',
    paths: '<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm1 14h-2v-2h2v2zm0-4h-2V7h2v4z"></path>',
    strokeInFill: false
  },
  'fingerprint-fill': {
    category: 'Seguridad & Tiempo (Fill)',
    paths: '<circle cx="12" cy="12" r="10" fill="currentColor"></circle><g fill="none" stroke="#ffffff" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" transform="translate(12, 12) scale(0.68) translate(-12, -12)"><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"></path><path d="M14 13.12c0 2.38 0 6.38-1 8.88"></path><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"></path><path d="M2 12a10 10 0 0 1 18-6"></path><path d="M2 16h.01"></path><path d="M21.8 16c.2-2 .131-5.354 0-6"></path><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"></path><path d="M8.65 22c.21-.66.45-1.32.57-2"></path><path d="M9 6.8a6 6 0 0 1 9 5.2v2"></path></g>',
    strokeInFill: false
  },
  'eye-fill': {
    category: 'Seguridad & Tiempo (Fill)',
    paths: '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>',
    strokeInFill: false
  },
  'calendar-fill': {
    category: 'Seguridad & Tiempo (Fill)',
    paths: '<path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path>',
    strokeInFill: false
  },
  'clock-fill': {
    category: 'Seguridad & Tiempo (Fill)',
    paths: '<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>',
    strokeInFill: false
  },
  'watch-fill': {
    category: 'Seguridad & Tiempo (Fill)',
    paths: '<path d="M12 2c-3.87 0-7 3.13-7 7v6c0 3.87 3.13 7 7 7s7-3.13 7-7V9c0-3.87-3.13-7-7-7zm0 18c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path>',
    strokeInFill: false
  },
  'map-pin-fill': {
    category: 'Seguridad & Tiempo (Fill)',
    paths: '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>',
    strokeInFill: false
  },
  'map-fill': {
    category: 'Seguridad & Tiempo (Fill)',
    paths: '<path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"></path>',
    strokeInFill: false
  },
  'compass-fill': {
    category: 'Seguridad & Tiempo (Fill)',
    paths: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-5.5l2.5-5.5 5.5-2.5-2.5 5.5-5.5 2.5z"></path>',
    strokeInFill: false
  },

  // --- CHARTS & ANALYTICS (FILL) ---
  'bar-chart-fill': {
    category: 'Gráficos & Analítica (Fill)',
    paths: '<path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"></path>',
    strokeInFill: false
  },
  'bar-chart-2-fill': {
    category: 'Gráficos & Analítica (Fill)',
    paths: '<path d="M16 10h4v10h-4zm-6-6h4v16h-4zm-6 8h4v8H4z"></path>',
    strokeInFill: false
  },
  'pie-chart-fill': {
    category: 'Gráficos & Analítica (Fill)',
    paths: '<path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z"></path>',
    strokeInFill: false
  },

  // --- DEVELOPMENT & CODE (FILL) ---
  'terminal-square-fill': {
    category: 'Desarrollo & Código (Fill)',
    paths: '<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-9.5 9l-3.5 3.5L5.5 15l2.1-2.1-2.1-2.1L7 9.4l3.5 3.6zm6 3h-4v-1.5h4v1.5z"></path>',
    strokeInFill: false
  },
  'database-fill': {
    category: 'Desarrollo & Código (Fill)',
    paths: '<path d="M12 2C6.48 2 2 4.24 2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7c0-2.76-4.48-5-10-5zm0 2c4.42 0 8 1.57 8 3s-3.58 3-8 3-8-1.57-8-3 3.58-3 8-3zm0 16c-4.42 0-8-1.57-8-3v-2.1c1.87 1.34 4.76 2.1 8 2.1s6.13-.76 8-2.1V17c0 1.43-3.58 3-8 3zm0-5c-4.42 0-8-1.57-8-3V9.9c1.87 1.34 4.76 2.1 8 2.1s6.13-.76 8-2.1V12c0 1.43-3.58 3-8 3z"></path>',
    strokeInFill: false
  },
  'bug-fill': {
    category: 'Desarrollo & Código (Fill)',
    paths: '<path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"></path>',
    strokeInFill: false
  },
  'sparkles-fill': {
    category: 'Desarrollo & Código (Fill)',
    paths: '<path d="M12 2L9.5 8.5 3 11l6.5 2.5L12 20l2.5-6.5L21 11l-6.5-2.5z"></path>',
    strokeInFill: false
  },
  'bot-fill': {
    category: 'Desarrollo & Código (Fill)',
    paths: '<path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h5a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3h5V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2zM8.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"></path>',
    strokeInFill: false
  },
  'brain-fill': {
    category: 'Desarrollo & Código (Fill)',
    paths: '<path d="M12 4.5v15c-1.38 0-2.5-1.12-2.5-2.5 0-.25.04-.49.11-.72A2.5 2.5 0 0 1 6.5 13a3 3 0 0 1-.34-5.58A2.5 2.5 0 0 1 7.5 3.2 2.5 2.5 0 0 1 12 4.5zm0 0v15c1.38 0 2.5-1.12 2.5-2.5 0-.25-.04-.49-.11-.72A2.5 2.5 0 0 0 17.5 13a3 3 0 0 0 .34-5.58A2.5 2.5 0 0 0 16.5 3.2 2.5 2.5 0 0 0 12 4.5z"></path>',
    strokeInFill: false
  },

  // --- TRANSPORT & TRAVEL (FILL) ---
  'car-fill': {
    category: 'Transporte & Viajes (Fill)',
    paths: '<path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"></path>',
    strokeInFill: false
  },
  'plane-fill': {
    category: 'Transporte & Viajes (Fill)',
    paths: '<path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"></path>',
    strokeInFill: false
  },
  'anchor-fill': {
    category: 'Transporte & Viajes (Fill)',
    paths: '<path d="M12 2c-1.66 0-3 1.34-3 3 0 1.31.84 2.41 2 2.83V10H9v2h2v7.92A7.008 7.008 0 0 1 5.08 14H7v-2H3v2c0 4.63 3.51 8.44 8 8.94V22h2v-7.06c4.49-.5 8-4.31 8-8.94v-2h-4v2h1.92A7.008 7.008 0 0 1 13 19.92V12h2v-2h-2V7.83c1.16-.42 2-1.52 2-2.83 0-1.66-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path>',
    strokeInFill: false
  },
  'locate-fill': {
    category: 'Transporte & Viajes (Fill)',
    paths: '<path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path>',
    strokeInFill: false
  },

  // --- WEATHER & ELEMENTS (FILL) ---
  'sun-fill': {
    category: 'Clima & Elementos (Fill)',
    paths: '<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"></path>',
    strokeInFill: false
  },
  'moon-fill': {
    category: 'Clima & Elementos (Fill)',
    paths: '<path d="M12.3 2a10 10 0 0 0-.19 1.4 10 10 0 0 0 8.7 9.9 10 10 0 1 1-8.51-11.3z"></path>',
    strokeInFill: false
  },
  'cloud-fill': {
    category: 'Clima & Elementos (Fill)',
    paths: '<path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"></path>',
    strokeInFill: false
  },
  'cloud-rain-fill': {
    category: 'Clima & Elementos (Fill)',
    paths: '<path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM15 22h-2l1-4h2l-1 4zm-4 0H9l1-4h2l-1 4z"></path>',
    strokeInFill: false
  },
  'zap-fill': {
    category: 'Clima & Elementos (Fill)',
    paths: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>',
    strokeInFill: false
  },
  'droplet-fill': {
    category: 'Clima & Elementos (Fill)',
    paths: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>',
    strokeInFill: false
  },
  'flame-fill': {
    category: 'Clima & Elementos (Fill)',
    paths: '<path d="M12 23c-4.97 0-9-4.03-9-9 0-3.53 2.04-6.84 4.54-9.08.39-.35.98-.31 1.33.09.28.32.32.79.09 1.15-1.28 1.98-1.96 4.31-1.96 6.84 0 .55.45 1 1 1s1-.45 1-1c0-2.83.94-5.54 2.67-7.71.34-.43.95-.51 1.39-.17.26.2.4.52.37.84-.33 3.65 1.58 7.21 4.77 8.91.48.26.66.86.4 1.34-.17.32-.5.53-.87.53-.13 0-.27-.03-.4-.09-1.95-1.04-3.41-2.82-4.14-4.95-.12-.34-.44-.57-.8-.57s-.68.23-.8.57c-.77 2.24.08 4.71 1.95 5.71 1.48.79 3.23.63 4.55-.42.43-.34 1.05-.27 1.39.16.34.43.27 1.05-.16 1.39C16.88 22.37 14.49 23 12 23z"></path>',
    strokeInFill: false
  },
  'thermometer-fill': {
    category: 'Clima & Elementos (Fill)',
    paths: '<path d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-2V5c0-.55.45-1 1-1s1 .45 1 1v6h-2z"></path>',
    strokeInFill: false
  },
  'umbrella-fill': {
    category: 'Clima & Elementos (Fill)',
    paths: '<path d="M13.5 17c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-4H2c0-.36.03-.71.08-1.06L11 3.21V2c0-.55.45-1 1-1s1 .45 1 1v1.21l8.92 8.73c.05.35.08.7.08 1.06h-8.5v4z"></path>',
    strokeInFill: false
  }
};

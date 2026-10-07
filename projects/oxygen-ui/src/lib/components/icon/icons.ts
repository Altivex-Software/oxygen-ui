import { OxIconName } from './icon.types';
import { OX_FILL_ICONS } from './icons-fill';

export interface IconDefinition {
  paths: string; // Inner SVG contents (paths, circles, rects, lines, polylines, etc.)
  fillPaths?: string; // Optional custom filled SVG paths
  strokeInFill?: boolean; // Default true (false when filled SVG is pure fill and shouldn't inherit stroke)
  category: string;
}

const OX_OUTLINE_ICONS: Partial<Record<OxIconName, IconDefinition>> = {
  // --- UI & GENERAL ---
  'search': {
    category: 'UI & General',
    paths: '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>'
  },
  'home': {
    category: 'UI & General',
    paths: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>'
  },
  'user': {
    category: 'UI & General',
    paths: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>'
  },
  'users': {
    category: 'UI & General',
    paths: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>'
  },
  'user-plus': {
    category: 'UI & General',
    paths: '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line>'
  },
  'user-minus': {
    category: 'UI & General',
    paths: '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="23" y1="11" x2="17" y2="11"></line>'
  },
  'user-check': {
    category: 'UI & General',
    paths: '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline>'
  },
  'user-x': {
    category: 'UI & General',
    paths: '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="18" y1="8" x2="22" y2="12"></line><line x1="22" y1="8" x2="18" y2="12"></line>'
  },
  'id-card': {
    category: 'UI & General',
    paths: '<rect x="3" y="4" width="18" height="16" rx="2"></rect><circle cx="9" cy="10" r="2"></circle><line x1="15" y1="8" x2="17" y2="8"></line><line x1="15" y1="12" x2="17" y2="12"></line><line x1="7" y1="16" x2="17" y2="16"></line>'
  },
  'settings': {
    category: 'UI & General',
    paths: '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>'
  },
  'sliders': {
    category: 'UI & General',
    paths: '<line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line>'
  },
  'filter': {
    category: 'UI & General',
    paths: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>'
  },
  'trash': {
    category: 'UI & General',
    paths: '<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>'
  },
  'trash-2': {
    category: 'UI & General',
    paths: '<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>'
  },
  'edit': {
    category: 'UI & General',
    paths: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>'
  },
  'edit-2': {
    category: 'UI & General',
    paths: '<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>'
  },
  'edit-3': {
    category: 'UI & General',
    paths: '<path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>'
  },
  'copy': {
    category: 'UI & General',
    paths: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>'
  },
  'share': {
    category: 'UI & General',
    paths: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line>'
  },
  'share-2': {
    category: 'UI & General',
    paths: '<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>'
  },
  'more-horizontal': {
    category: 'UI & General',
    paths: '<circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle>'
  },
  'more-vertical': {
    category: 'UI & General',
    paths: '<circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle>'
  },
  'menu': {
    category: 'UI & General',
    paths: '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>'
  },
  'grid': {
    category: 'UI & General',
    paths: '<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>'
  },
  'list': {
    category: 'UI & General',
    paths: '<line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>'
  },
  'list-check': {
    category: 'UI & General',
    paths: '<line x1="10" y1="6" x2="21" y2="6"></line><line x1="10" y1="12" x2="21" y2="12"></line><line x1="10" y1="18" x2="21" y2="18"></line><polyline points="3 6 4 7 6 5"></polyline><polyline points="3 12 4 13 6 11"></polyline><polyline points="3 18 4 19 6 17"></polyline>'
  },
  'layers': {
    category: 'UI & General',
    paths: '<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>'
  },
  'tag': {
    category: 'UI & General',
    paths: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>'
  },
  'pin': {
    category: 'UI & General',
    paths: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>'
  },
  'bookmark': {
    category: 'UI & General',
    paths: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>'
  },
  'external-link': {
    category: 'UI & General',
    paths: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>'
  },
  'link': {
    category: 'UI & General',
    paths: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>'
  },
  'unlink': {
    category: 'UI & General',
    paths: '<path d="M18.84 12.25l1.72-1.71a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M5.16 11.75l-1.72 1.71a5 5 0 0 0 7.07 7.07l1.71-1.71"></path><line x1="2" y1="2" x2="22" y2="22"></line>'
  },
  'mouse-pointer': {
    category: 'UI & General',
    paths: '<path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path><path d="m13 13 6 6"></path>'
  },
  'layout': {
    category: 'UI & General',
    paths: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line>'
  },
  'columns': {
    category: 'UI & General',
    paths: '<path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>'
  },
  'sidebar': {
    category: 'UI & General',
    paths: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line>'
  },
  'table': {
    category: 'UI & General',
    paths: '<path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path>'
  },
  'palette': {
    category: 'UI & General',
    paths: '<circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z"></path>'
  },
  'history': {
    category: 'UI & General',
    paths: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M12 7v5l4 2"></path>'
  },
  'undo': {
    category: 'UI & General',
    paths: '<path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path>'
  },
  'redo': {
    category: 'UI & General',
    paths: '<path d="M21 7v6h-6"></path><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path>'
  },
  'sort': {
    category: 'UI & General',
    paths: '<path d="M11 5h10"></path><path d="M11 9h7"></path><path d="M11 13h4"></path><path d="M3 17l3 3 3-3"></path><path d="M6 18V4"></path>'
  },
  'sort-asc': {
    category: 'UI & General',
    paths: '<path d="M4 6h16"></path><path d="M4 12h10"></path><path d="M4 18h4"></path><path d="M14 18l3 3 3-3"></path><path d="M17 21V9"></path>'
  },
  'sort-desc': {
    category: 'UI & General',
    paths: '<path d="M4 6h4"></path><path d="M4 12h10"></path><path d="M4 18h16"></path><path d="M14 18l3 3 3-3"></path><path d="M17 21V9"></path>'
  },
  'printer': {
    category: 'UI & General',
    paths: '<polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect>'
  },
  'qr-code': {
    category: 'UI & General',
    paths: '<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><path d="M14 14h3v3h-3zM14 20h3M20 14v3M20 20h.01"></path>'
  },
  'scan': {
    category: 'UI & General',
    paths: '<path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>'
  },
  'crosshair': {
    category: 'UI & General',
    paths: '<circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line>'
  },
  'target': {
    category: 'UI & General',
    paths: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>'
  },

  // --- TEXT & FORMATTING ---
  'align-left': {
    category: 'Editor de Texto',
    paths: '<line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line>'
  },
  'align-center': {
    category: 'Editor de Texto',
    paths: '<line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line>'
  },
  'align-right': {
    category: 'Editor de Texto',
    paths: '<line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line>'
  },
  'align-justify': {
    category: 'Editor de Texto',
    paths: '<line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line>'
  },
  'bold': {
    category: 'Editor de Texto',
    paths: '<path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>'
  },
  'italic': {
    category: 'Editor de Texto',
    paths: '<line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line>'
  },
  'underline': {
    category: 'Editor de Texto',
    paths: '<path d="M6 3v7a6 6 0 0 0 12 0V3"></path><line x1="4" y1="21" x2="20" y2="21"></line>'
  },
  'type': {
    category: 'Editor de Texto',
    paths: '<polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line>'
  },
  'list-ordered': {
    category: 'Editor de Texto',
    paths: '<line x1="10" y1="6" x2="21" y2="6"></line><line x1="10" y1="12" x2="21" y2="12"></line><line x1="10" y1="18" x2="21" y2="18"></line><path d="M4 6h1v4"></path><path d="M4 10h2"></path><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>'
  },
  'quote': {
    category: 'Editor de Texto',
    paths: '<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>'
  },
  'scissors': {
    category: 'Editor de Texto',
    paths: '<circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line>'
  },

  // --- ACTIONS & STATES ---
  'plus': {
    category: 'Acciones & Estados',
    paths: '<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>'
  },
  'minus': {
    category: 'Acciones & Estados',
    paths: '<line x1="5" y1="12" x2="19" y2="12"></line>'
  },
  'x': {
    category: 'Acciones & Estados',
    paths: '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>'
  },
  'check': {
    category: 'Acciones & Estados',
    paths: '<polyline points="20 6 9 17 4 12"></polyline>'
  },
  'check-circle': {
    category: 'Acciones & Estados',
    paths: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'
  },
  'x-circle': {
    category: 'Acciones & Estados',
    paths: '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>'
  },
  'plus-circle': {
    category: 'Acciones & Estados',
    paths: '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>'
  },
  'minus-circle': {
    category: 'Acciones & Estados',
    paths: '<circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line>'
  },
  'help-circle': {
    category: 'Acciones & Estados',
    paths: '<circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>'
  },
  'info': {
    category: 'Acciones & Estados',
    paths: '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'
  },
  'alert-circle': {
    category: 'Acciones & Estados',
    paths: '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'
  },
  'alert-triangle': {
    category: 'Acciones & Estados',
    paths: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>'
  },
  'alert-octagon': {
    category: 'Acciones & Estados',
    paths: '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'
  },
  'refresh': {
    category: 'Acciones & Estados',
    paths: '<polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>'
  },
  'refresh-cw': {
    category: 'Acciones & Estados',
    paths: '<polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>'
  },
  'refresh-ccw': {
    category: 'Acciones & Estados',
    paths: '<polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>'
  },
  'rotate-cw': {
    category: 'Acciones & Estados',
    paths: '<polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>'
  },
  'rotate-ccw': {
    category: 'Acciones & Estados',
    paths: '<polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>'
  },
  'loader': {
    category: 'Acciones & Estados',
    paths: '<line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>'
  },
  'power': {
    category: 'Acciones & Estados',
    paths: '<path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line>'
  },
  'log-in': {
    category: 'Acciones & Estados',
    paths: '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line>'
  },
  'log-out': {
    category: 'Acciones & Estados',
    paths: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>'
  },

  // --- NAVIGATION & ARROWS ---
  'arrow-up': {
    category: 'Navegación & Flechas',
    paths: '<line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline>'
  },
  'arrow-down': {
    category: 'Navegación & Flechas',
    paths: '<line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline>'
  },
  'arrow-left': {
    category: 'Navegación & Flechas',
    paths: '<line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>'
  },
  'arrow-right': {
    category: 'Navegación & Flechas',
    paths: '<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>'
  },
  'arrow-up-right': {
    category: 'Navegación & Flechas',
    paths: '<line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline>'
  },
  'arrow-down-left': {
    category: 'Navegación & Flechas',
    paths: '<line x1="17" y1="7" x2="7" y2="17"></line><polyline points="17 17 7 17 7 7"></polyline>'
  },
  'chevron-up': {
    category: 'Navegación & Flechas',
    paths: '<polyline points="18 15 12 9 6 15"></polyline>'
  },
  'chevron-down': {
    category: 'Navegación & Flechas',
    paths: '<polyline points="6 9 12 15 18 9"></polyline>'
  },
  'chevron-left': {
    category: 'Navegación & Flechas',
    paths: '<polyline points="15 18 9 12 15 6"></polyline>'
  },
  'chevron-right': {
    category: 'Navegación & Flechas',
    paths: '<polyline points="9 18 15 12 9 6"></polyline>'
  },
  'chevrons-up': {
    category: 'Navegación & Flechas',
    paths: '<polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline>'
  },
  'chevrons-down': {
    category: 'Navegación & Flechas',
    paths: '<polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline>'
  },
  'chevrons-left': {
    category: 'Navegación & Flechas',
    paths: '<polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline>'
  },
  'chevrons-right': {
    category: 'Navegación & Flechas',
    paths: '<polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline>'
  },
  'corner-down-right': {
    category: 'Navegación & Flechas',
    paths: '<polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path>'
  },
  'corner-up-left': {
    category: 'Navegación & Flechas',
    paths: '<polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>'
  },
  'maximize': {
    category: 'Navegación & Flechas',
    paths: '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>'
  },
  'minimize': {
    category: 'Navegación & Flechas',
    paths: '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>'
  },
  'maximize-2': {
    category: 'Navegación & Flechas',
    paths: '<polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line>'
  },
  'minimize-2': {
    category: 'Navegación & Flechas',
    paths: '<polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" y1="10" x2="21" y2="3"></line><line x1="3" y1="21" x2="10" y2="14"></line>'
  },
  'zoom-in': {
    category: 'Navegación & Flechas',
    paths: '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line>'
  },
  'zoom-out': {
    category: 'Navegación & Flechas',
    paths: '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line>'
  },
  'navigation': {
    category: 'Navegación & Flechas',
    paths: '<polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>'
  },

  // --- COMMUNICATION & SOCIAL ---
  'mail': {
    category: 'Comunicación',
    paths: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>'
  },
  'inbox': {
    category: 'Comunicación',
    paths: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>'
  },
  'message-square': {
    category: 'Comunicación',
    paths: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>'
  },
  'message-circle': {
    category: 'Comunicación',
    paths: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>'
  },
  'message-dots': {
    category: 'Comunicación',
    paths: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><circle cx="9" cy="10" r="1"></circle><circle cx="12" cy="10" r="1"></circle><circle cx="15" cy="10" r="1"></circle>'
  },
  'send': {
    category: 'Comunicación',
    paths: '<line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>'
  },
  'phone': {
    category: 'Comunicación',
    paths: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>'
  },
  'phone-call': {
    category: 'Comunicación',
    paths: '<path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>'
  },
  'phone-off': {
    category: 'Comunicación',
    paths: '<path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path><line x1="1" y1="1" x2="23" y2="23"></line>'
  },
  'bell': {
    category: 'Comunicación',
    paths: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>'
  },
  'bell-off': {
    category: 'Comunicación',
    paths: '<path d="M13.73 21a2 2 0 0 1-3.46 0"></path><path d="M18.63 13A17.89 17.89 0 0 1 18 8"></path><path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"></path><path d="M18 8a6 6 0 0 0-9.33-5"></path><line x1="1" y1="1" x2="23" y2="23"></line>'
  },
  'globe': {
    category: 'Comunicación',
    paths: '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>'
  },
  'thumbs-up': {
    category: 'Comunicación',
    paths: '<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>'
  },
  'thumbs-down': {
    category: 'Comunicación',
    paths: '<path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"></path>'
  },
  'heart': {
    category: 'Comunicación',
    paths: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>'
  },
  'heart-pulse': {
    category: 'Comunicación',
    paths: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"></path>'
  },
  'star': {
    category: 'Comunicación',
    paths: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>'
  },
  'smile': {
    category: 'Comunicación',
    paths: '<circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>'
  },
  'award': {
    category: 'Comunicación',
    paths: '<circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>'
  },
  'trophy': {
    category: 'Comunicación',
    paths: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path>'
  },
  'crown': {
    category: 'Comunicación',
    paths: '<path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path>'
  },
  'flag': {
    category: 'Comunicación',
    paths: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line>'
  },
  'coffee': {
    category: 'Comunicación',
    paths: '<path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line>'
  },
  'at-sign': {
    category: 'Comunicación',
    paths: '<circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>'
  },
  'hash': {
    category: 'Comunicación',
    paths: '<line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line>'
  },
  'life-buoy': {
    category: 'Comunicación',
    paths: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>'
  },

  // --- SOCIAL & BRANDS ---
  'facebook': {
    category: 'Marcas & Redes Sociales',
    paths: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>'
  },
  'github': {
    category: 'Marcas & Redes Sociales',
    paths: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>'
  },
  'discord': {
    category: 'Marcas & Redes Sociales',
    paths: '<circle cx="9" cy="12" r="1"></circle><circle cx="15" cy="12" r="1"></circle><path d="M7.5 7.5c3.5-1 5.5-1 9 0 0 0 2 3.5 2 8.5 0 0-1.5 2-4 2l-.5-1.5c1.5-.5 2-1 2-1-2 1.5-5 2-8 2-3 0-6-.5-8-2 0 0 .5.5 2 1L4.5 18C2 18 .5 16 .5 16c0-5 2-8.5 2-8.5 3.5-1 5.5-1 9 0z"></path>'
  },
  'twitter': {
    category: 'Marcas & Redes Sociales',
    paths: '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>'
  },
  'instagram': {
    category: 'Marcas & Redes Sociales',
    paths: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>'
  },
  'linkedin': {
    category: 'Marcas & Redes Sociales',
    paths: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>'
  },
  'youtube': {
    category: 'Marcas & Redes Sociales',
    paths: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>'
  },
  'twitch': {
    category: 'Marcas & Redes Sociales',
    paths: '<path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>'
  },
  'tiktok': {
    category: 'Marcas & Redes Sociales',
    paths: '<path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>'
  },
  'slack': {
    category: 'Marcas & Redes Sociales',
    paths: '<rect x="13" y="2" width="3" height="8" rx="1.5"></rect><path d="M19 8.5a1.5 1.5 0 0 1-1.5 1.5H16"></path><rect x="8" y="14" width="3" height="8" rx="1.5"></rect><path d="M5 15.5A1.5 1.5 0 0 1 6.5 14H8"></path><rect x="14" y="13" width="8" height="3" rx="1.5"></rect><path d="M15.5 19a1.5 1.5 0 0 1-1.5-1.5V16"></path><rect x="2" y="8" width="8" height="3" rx="1.5"></rect><path d="M8.5 5A1.5 1.5 0 0 1 10 6.5V8"></path>'
  },
  'gitlab': {
    category: 'Marcas & Redes Sociales',
    paths: '<path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 5.5 2a.43.43 0 0 1 .4.28l2.44 7.49h7.32l2.44-7.49a.43.43 0 0 1 .4-.28.42.42 0 0 1 .79.21l2.44 7.51 1.22 3.78a.84.84 0 0 1-.3.94z"></path>'
  },
  'figma': {
    category: 'Marcas & Redes Sociales',
    paths: '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path>'
  },
  'dribbble': {
    category: 'Marcas & Redes Sociales',
    paths: '<circle cx="12" cy="12" r="10"></circle><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path><path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"></path>'
  },
  'whatsapp': {
    category: 'Marcas & Redes Sociales',
    paths: '<path d="M12 2C6.75 2 2.5 6.25 2.5 11.5c0 1.76.48 3.4 1.32 4.82L2.5 21.5l5.36-1.3A9.45 9.45 0 0 0 12 21c5.25 0 9.5-4.25 9.5-9.5S17.25 2 12 2z"></path><path fill="currentColor" stroke="none" d="M16.7 14.2c-.26-.13-1.53-.76-1.77-.85-.24-.09-.41-.13-.59.13-.17.26-.68.85-.83 1.02-.15.17-.3.2-.57.06-.26-.13-1.12-.41-2.13-1.31-.79-.7-1.32-1.57-1.48-1.83-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.07-.13-.59-1.42-.8-1.95-.21-.51-.43-.44-.59-.45h-.51c-.17 0-.46.06-.7.33-.24.26-.92.9-.92 2.2 0 1.3 1 2.55 1.13 2.73.13.17 1.97 3 4.77 4.21 2.8 1.21 2.8.81 3.3.75.51-.06 1.63-.67 1.86-1.31.23-.65.23-1.2.16-1.31-.07-.12-.24-.19-.5-.32z"></path>'
  },
  'telegram': {
    category: 'Marcas & Redes Sociales',
    paths: '<path d="M21.5 2L2 10.5l6.5 3 2.5 6.5 3.5-3.5 6 4.5L21.5 2z"></path><path d="M8.5 13.5l10-8.5-7.5 9"></path>'
  },
  'reddit': {
    category: 'Marcas & Redes Sociales',
    paths: '<circle cx="12" cy="12" r="8"></circle><circle cx="9" cy="11.5" r="1"></circle><circle cx="15" cy="11.5" r="1"></circle><path d="M9.5 15a3.5 3.5 0 0 0 5 0"></path><path d="M12 4l1.5-2h2.5"></path><circle cx="16.5" cy="2" r="1"></circle>'
  },
  'google': {
    category: 'Marcas & Redes Sociales',
    paths: '<path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2c2.72 0 5.187 1.01 7.07 2.67l-2.88 2.88C15.02 6.54 13.62 6 12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.97 0 5.43-1.94 5.89-4.5H12v-3.5h9.72C21.87 10.82 22 11.4 22 12c0 5.523-4.477 10-10 10z"></path>'
  },
  'apple': {
    category: 'Marcas & Redes Sociales',
    paths: '<path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 1.44S8.22 5 6 5a5 5 0 0 0-5 5c0 4.22 3 12.22 6 12.22 1.25 0 2.5-1.06 4-1.06z"></path><path d="M10 2c1 .5 2 2 2 3.5"></path>'
  },
  'spotify': {
    category: 'Marcas & Redes Sociales',
    paths: '<circle cx="12" cy="12" r="10"></circle><path d="M8 11.5c2.5-.5 5.5-.3 8 1"></path><path d="M7 9c3-.6 7-.4 10 1.2"></path><path d="M9 14.5c2-.4 4.5-.2 6.5.8"></path>'
  },

  // --- FILES & DOCUMENTS ---
  'file': {
    category: 'Archivos & Documentos',
    paths: '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline>'
  },
  'file-text': {
    category: 'Archivos & Documentos',
    paths: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>'
  },
  'file-plus': {
    category: 'Archivos & Documentos',
    paths: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line>'
  },
  'file-minus': {
    category: 'Archivos & Documentos',
    paths: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="9" y1="15" x2="15" y2="15"></line>'
  },
  'file-check': {
    category: 'Archivos & Documentos',
    paths: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><polyline points="9 15 11 17 15 13"></polyline>'
  },
  'file-x': {
    category: 'Archivos & Documentos',
    paths: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="9.5" y1="12.5" x2="14.5" y2="17.5"></line><line x1="14.5" y1="12.5" x2="9.5" y2="17.5"></line>'
  },
  'file-code': {
    category: 'Archivos & Documentos',
    paths: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><polyline points="10 13 8 15 10 17"></polyline><polyline points="14 13 16 15 14 17"></polyline>'
  },
  'file-pdf': {
    category: 'Archivos & Documentos',
    paths: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M9 15v-4h2a1 1 0 0 1 1 1v0a1 1 0 0 1-1 1H9"></path>'
  },
  'file-spreadsheet': {
    category: 'Archivos & Documentos',
    paths: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M8 13h8"></path><path d="M8 17h8"></path><path d="M12 10v10"></path>'
  },
  'file-zip': {
    category: 'Archivos & Documentos',
    paths: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="10" y1="11" x2="10.01" y2="11"></line><line x1="10" y1="14" x2="10.01" y2="14"></line><line x1="10" y1="17" x2="10.01" y2="17"></line>'
  },
  'folder': {
    category: 'Archivos & Documentos',
    paths: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>'
  },
  'folder-plus': {
    category: 'Archivos & Documentos',
    paths: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line>'
  },
  'folder-minus': {
    category: 'Archivos & Documentos',
    paths: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="9" y1="14" x2="15" y2="14"></line>'
  },
  'folder-open': {
    category: 'Archivos & Documentos',
    paths: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><path d="M2 10h20"></path>'
  },
  'archive': {
    category: 'Archivos & Documentos',
    paths: '<polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line>'
  },
  'box': {
    category: 'Archivos & Documentos',
    paths: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>'
  },
  'download': {
    category: 'Archivos & Documentos',
    paths: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>'
  },
  'upload': {
    category: 'Archivos & Documentos',
    paths: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line>'
  },
  'download-cloud': {
    category: 'Archivos & Documentos',
    paths: '<polyline points="8 17 12 21 16 17"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path>'
  },
  'upload-cloud': {
    category: 'Archivos & Documentos',
    paths: '<polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>'
  },
  'paperclip': {
    category: 'Archivos & Documentos',
    paths: '<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>'
  },
  'save': {
    category: 'Archivos & Documentos',
    paths: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline>'
  },
  'clipboard': {
    category: 'Archivos & Documentos',
    paths: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>'
  },

  // --- DEVICES & HARDWARE ---
  'monitor': {
    category: 'Dispositivos',
    paths: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>'
  },
  'smartphone': {
    category: 'Dispositivos',
    paths: '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>'
  },
  'tablet': {
    category: 'Dispositivos',
    paths: '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>'
  },
  'laptop': {
    category: 'Dispositivos',
    paths: '<rect x="3" y="4" width="18" height="12" rx="2" ry="2"></rect><line x1="2" y1="20" x2="22" y2="20"></line>'
  },
  'mouse': {
    category: 'Dispositivos',
    paths: '<rect x="6" y="3" width="12" height="18" rx="6"></rect><line x1="12" y1="7" x2="12" y2="11"></line>'
  },
  'keyboard': {
    category: 'Dispositivos',
    paths: '<rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="6" y1="8" x2="6.01" y2="8"></line><line x1="10" y1="8" x2="10.01" y2="8"></line><line x1="14" y1="8" x2="14.01" y2="8"></line><line x1="18" y1="8" x2="18.01" y2="8"></line><line x1="6" y1="12" x2="6.01" y2="12"></line><line x1="10" y1="12" x2="10.01" y2="12"></line><line x1="14" y1="12" x2="14.01" y2="12"></line><line x1="18" y1="12" x2="18.01" y2="12"></line><line x1="7" y1="16" x2="17" y2="16"></line>'
  },
  'plug': {
    category: 'Dispositivos',
    paths: '<path d="M9 2v6"></path><path d="M15 2v6"></path><path d="M6 8h12v4a6 6 0 0 1-6 6v4"></path>'
  },
  'tv': {
    category: 'Dispositivos',
    paths: '<rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline>'
  },
  'cpu': {
    category: 'Dispositivos',
    paths: '<rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line>'
  },
  'hard-drive': {
    category: 'Dispositivos',
    paths: '<line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line>'
  },
  'server': {
    category: 'Dispositivos',
    paths: '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line>'
  },
  'wifi': {
    category: 'Dispositivos',
    paths: '<path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line>'
  },
  'wifi-off': {
    category: 'Dispositivos',
    paths: '<line x1="1" y1="1" x2="23" y2="23"></line><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path><path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line>'
  },
  'bluetooth': {
    category: 'Dispositivos',
    paths: '<polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"></polyline>'
  },
  'battery': {
    category: 'Dispositivos',
    paths: '<rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line>'
  },
  'battery-charging': {
    category: 'Dispositivos',
    paths: '<path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"></path><line x1="23" y1="13" x2="23" y2="11"></line><polyline points="11 6 7 12 13 12 9 18"></polyline>'
  },
  'camera': {
    category: 'Dispositivos',
    paths: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle>'
  },
  'camera-off': {
    category: 'Dispositivos',
    paths: '<line x1="1" y1="1" x2="23" y2="23"></line><path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"></path>'
  },
  'mic': {
    category: 'Dispositivos',
    paths: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line>'
  },
  'mic-off': {
    category: 'Dispositivos',
    paths: '<line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line>'
  },
  'volume': {
    category: 'Dispositivos',
    paths: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>'
  },
  'volume-1': {
    category: 'Dispositivos',
    paths: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>'
  },
  'volume-2': {
    category: 'Dispositivos',
    paths: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>'
  },
  'volume-x': {
    category: 'Dispositivos',
    paths: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>'
  },

  // --- MEDIA & PLAYER ---
  'play': {
    category: 'Multimedia',
    paths: '<polygon points="5 3 19 12 5 21 5 3"></polygon>'
  },
  'play-circle': {
    category: 'Multimedia',
    paths: '<circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon>'
  },
  'pause': {
    category: 'Multimedia',
    paths: '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>'
  },
  'pause-circle': {
    category: 'Multimedia',
    paths: '<circle cx="12" cy="12" r="10"></circle><line x1="10" y1="15" x2="10" y2="9"></line><line x1="14" y1="15" x2="14" y2="9"></line>'
  },
  'stop-circle': {
    category: 'Multimedia',
    paths: '<circle cx="12" cy="12" r="10"></circle><rect x="9" y="9" width="6" height="6"></rect>'
  },
  'skip-forward': {
    category: 'Multimedia',
    paths: '<polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line>'
  },
  'skip-back': {
    category: 'Multimedia',
    paths: '<polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line>'
  },
  'fast-forward': {
    category: 'Multimedia',
    paths: '<polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon>'
  },
  'rewind': {
    category: 'Multimedia',
    paths: '<polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon>'
  },
  'image': {
    category: 'Multimedia',
    paths: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>'
  },
  'video': {
    category: 'Multimedia',
    paths: '<polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>'
  },
  'video-off': {
    category: 'Multimedia',
    paths: '<path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"></path><line x1="1" y1="1" x2="23" y2="23"></line>'
  },
  'music': {
    category: 'Multimedia',
    paths: '<path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>'
  },
  'headphones': {
    category: 'Multimedia',
    paths: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>'
  },
  'disc': {
    category: 'Multimedia',
    paths: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle>'
  },

  // --- COMMERCE & FINANCE ---
  'shopping-cart': {
    category: 'Comercio & Finanzas',
    paths: '<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>'
  },
  'shopping-bag': {
    category: 'Comercio & Finanzas',
    paths: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>'
  },
  'credit-card': {
    category: 'Comercio & Finanzas',
    paths: '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>'
  },
  'dollar-sign': {
    category: 'Comercio & Finanzas',
    paths: '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>'
  },
  'euro': {
    category: 'Comercio & Finanzas',
    paths: '<path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12a7.9 7.9 0 0 0 7.8 8 7.7 7.7 0 0 0 5.2-2"></path><line x1="4" y1="10" x2="14" y2="10"></line><line x1="4" y1="14" x2="14" y2="14"></line>'
  },
  'bitcoin': {
    category: 'Comercio & Finanzas',
    paths: '<path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042l-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.894m-1.215 6.894L7.076 11.15m6.16-5.852l-.348 1.97M7.076 11.15L8.29 4.254m-1.215 6.895L4.646 10.11"></path>'
  },
  'calculator': {
    category: 'Comercio & Finanzas',
    paths: '<rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="18"></line><path d="M8 10h.01"></path><path d="M12 10h.01"></path><path d="M16 10h.01"></path><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path>'
  },
  'ticket': {
    category: 'Comercio & Finanzas',
    paths: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"></path><line x1="13" y1="5" x2="13" y2="19" stroke-dasharray="2 2"></line>'
  },
  'percent': {
    category: 'Comercio & Finanzas',
    paths: '<line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle>'
  },
  'gift': {
    category: 'Comercio & Finanzas',
    paths: '<polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>'
  },
  'package': {
    category: 'Comercio & Finanzas',
    paths: '<line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>'
  },
  'truck': {
    category: 'Comercio & Finanzas',
    paths: '<rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>'
  },
  'briefcase': {
    category: 'Comercio & Finanzas',
    paths: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>'
  },
  'wallet': {
    category: 'Comercio & Finanzas',
    paths: '<path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"></path><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"></path>'
  },
  'receipt': {
    category: 'Comercio & Finanzas',
    paths: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z"></path><line x1="8" y1="8" x2="16" y2="8"></line><line x1="8" y1="12" x2="16" y2="12"></line><line x1="8" y1="16" x2="12" y2="16"></line>'
  },
  'coins': {
    category: 'Comercio & Finanzas',
    paths: '<circle cx="8" cy="8" r="6"></circle><path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path><path d="M7 6h1v4"></path><path d="M16.7 13.7l.7.7"></path>'
  },
  'banknote': {
    category: 'Comercio & Finanzas',
    paths: '<rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path>'
  },
  'store': {
    category: 'Comercio & Finanzas',
    paths: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><path d="M3 9h18"></path><path d="M9 22V12h6v10"></path>'
  },

  // --- SECURITY & TIME ---
  'lock': {
    category: 'Seguridad & Tiempo',
    paths: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>'
  },
  'unlock': {
    category: 'Seguridad & Tiempo',
    paths: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path>'
  },
  'key': {
    category: 'Seguridad & Tiempo',
    paths: '<path d="M21 2l-2 2m-1.5 1.5L19 7l-2 2-1.5-1.5M14 9l-4 4a5.5 5.5 0 1 1-1.4-1.4l4-4a5.5 5.5 0 0 1 7.4-1.6z"></path>'
  },
  'shield': {
    category: 'Seguridad & Tiempo',
    paths: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>'
  },
  'shield-check': {
    category: 'Seguridad & Tiempo',
    paths: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline>'
  },
  'shield-alert': {
    category: 'Seguridad & Tiempo',
    paths: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'
  },
  'fingerprint': {
    category: 'Seguridad & Tiempo',
    paths: '<path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"></path><path d="M14 13.12c0 2.38 0 6.38-1 8.88"></path><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"></path><path d="M2 12a10 10 0 0 1 18-6"></path><path d="M2 16h.01"></path><path d="M21.8 16c.2-2 .131-5.354 0-6"></path><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"></path><path d="M8.65 22c.21-.66.45-1.32.57-2"></path><path d="M9 6.8a6 6 0 0 1 9 5.2v2"></path>'
  },
  'eye': {
    category: 'Seguridad & Tiempo',
    paths: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>'
  },
  'eye-off': {
    category: 'Seguridad & Tiempo',
    paths: '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>'
  },
  'calendar': {
    category: 'Seguridad & Tiempo',
    paths: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>'
  },
  'clock': {
    category: 'Seguridad & Tiempo',
    paths: '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>'
  },
  'watch': {
    category: 'Seguridad & Tiempo',
    paths: '<circle cx="12" cy="12" r="7"></circle><polyline points="12 9 12 12 13.5 13.5"></polyline><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path>'
  },
  'map-pin': {
    category: 'Seguridad & Tiempo',
    paths: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>'
  },
  'map': {
    category: 'Seguridad & Tiempo',
    paths: '<polygon points="1 6 1 22 8 18 15 22 22 18 22 2 15 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="15" y1="6" x2="15" y2="22"></line>'
  },
  'compass': {
    category: 'Seguridad & Tiempo',
    paths: '<circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>'
  },

  // --- CHARTS & ANALYTICS ---
  'bar-chart': {
    category: 'Gráficos & Analítica',
    paths: '<line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>'
  },
  'bar-chart-2': {
    category: 'Gráficos & Analítica',
    paths: '<line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>'
  },
  'pie-chart': {
    category: 'Gráficos & Analítica',
    paths: '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>'
  },
  'trending-up': {
    category: 'Gráficos & Analítica',
    paths: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>'
  },
  'trending-down': {
    category: 'Gráficos & Analítica',
    paths: '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline>'
  },

  // --- DEVELOPMENT & CODE ---
  'code': {
    category: 'Desarrollo & Código',
    paths: '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>'
  },
  'terminal': {
    category: 'Desarrollo & Código',
    paths: '<polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line>'
  },
  'terminal-square': {
    category: 'Desarrollo & Código',
    paths: '<rect x="2" y="4" width="20" height="16" rx="2"></rect><polyline points="7 9 10 12 7 15"></polyline><line x1="13" y1="15" x2="17" y2="15"></line>'
  },
  'database': {
    category: 'Desarrollo & Código',
    paths: '<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>'
  },
  'git-branch': {
    category: 'Desarrollo & Código',
    paths: '<line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path>'
  },
  'git-commit': {
    category: 'Desarrollo & Código',
    paths: '<circle cx="12" cy="12" r="4"></circle><line x1="1.05" y1="12" x2="7" y2="12"></line><line x1="17.01" y1="12" x2="22.96" y2="12"></line>'
  },
  'git-merge': {
    category: 'Desarrollo & Código',
    paths: '<circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M6 21V9a9 9 0 0 0 9 9"></path>'
  },
  'git-pull-request': {
    category: 'Desarrollo & Código',
    paths: '<circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><line x1="6" y1="9" x2="6" y2="21"></line>'
  },
  'command': {
    category: 'Desarrollo & Código',
    paths: '<path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>'
  },
  'bug': {
    category: 'Desarrollo & Código',
    paths: '<rect x="8" y="6" width="8" height="14" rx="4"></rect><path d="M19 7l-3 2"></path><path d="M5 7l3 2"></path><path d="M19 19l-3-2"></path><path d="M5 19l3-2"></path><path d="M20 13h-4"></path><path d="M4 13h4"></path><path d="M10 4l-1-2"></path><path d="M14 4l1-2"></path>'
  },
  'sparkles': {
    category: 'Desarrollo & Código',
    paths: '<path d="M12 3l1.912 5.885a2.001 2.001 0 0 0 1.203 1.203L21 12l-5.885 1.912a2.001 2.001 0 0 0-1.203 1.203L12 21l-1.912-5.885a2.001 2.001 0 0 0-1.203-1.203L3 12l5.885-1.912a2.001 2.001 0 0 0 1.203-1.203L12 3z"></path>'
  },
  'wand': {
    category: 'Desarrollo & Código',
    paths: '<path d="M15 4l5 5L6 23l-5-5L15 4z"></path><path d="M18 1l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"></path>'
  },
  'bot': {
    category: 'Desarrollo & Código',
    paths: '<rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="16" y1="16" x2="16.01" y2="16"></line>'
  },
  'brain': {
    category: 'Desarrollo & Código',
    paths: '<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z"></path>'
  },

  // --- TRANSPORT & TRAVEL ---
  'car': {
    category: 'Transporte & Viajes',
    paths: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 11.2 2 11.6 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle>'
  },
  'plane': {
    category: 'Transporte & Viajes',
    paths: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>'
  },
  'anchor': {
    category: 'Transporte & Viajes',
    paths: '<circle cx="12" cy="5" r="3"></circle><line x1="12" y1="22" x2="12" y2="8"></line><path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>'
  },
  'locate': {
    category: 'Transporte & Viajes',
    paths: '<line x1="2" y1="12" x2="5" y2="12"></line><line x1="19" y1="12" x2="22" y2="12"></line><line x1="12" y1="2" x2="12" y2="5"></line><line x1="12" y1="19" x2="12" y2="22"></line><circle cx="12" cy="12" r="7"></circle>'
  },

  // --- WEATHER & ELEMENTS ---
  'sun': {
    category: 'Clima & Elementos',
    paths: '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>'
  },
  'moon': {
    category: 'Clima & Elementos',
    paths: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>'
  },
  'cloud': {
    category: 'Clima & Elementos',
    paths: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>'
  },
  'cloud-rain': {
    category: 'Clima & Elementos',
    paths: '<line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="15" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>'
  },
  'cloud-snow': {
    category: 'Clima & Elementos',
    paths: '<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="8" y1="20" x2="8.01" y2="20"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="12" y1="22" x2="12.01" y2="22"></line><line x1="16" y1="16" x2="16.01" y2="16"></line><line x1="16" y1="20" x2="16.01" y2="20"></line>'
  },
  'cloud-lightning': {
    category: 'Clima & Elementos',
    paths: '<path d="M19 16.9A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path><polyline points="13 11 9 17 15 17 11 23"></polyline>'
  },
  'zap': {
    category: 'Clima & Elementos',
    paths: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>'
  },
  'wind': {
    category: 'Clima & Elementos',
    paths: '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>'
  },
  'droplet': {
    category: 'Clima & Elementos',
    paths: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>'
  },
  'flame': {
    category: 'Clima & Elementos',
    paths: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>'
  },
  'activity': {
    category: 'Clima & Elementos',
    paths: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>'
  },
  'thermometer': {
    category: 'Clima & Elementos',
    paths: '<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>'
  },
  'umbrella': {
    category: 'Clima & Elementos',
    paths: '<path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"></path>'
  },
  'feather': {
    category: 'Clima & Elementos',
    paths: '<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line>'
  }
};

export const OX_ICONS: Record<OxIconName, IconDefinition> = {
  ...OX_OUTLINE_ICONS,
  ...OX_FILL_ICONS
} as Record<OxIconName, IconDefinition>;


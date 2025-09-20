// TypeScript declarations for CSS modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Global CSS class names for better IntelliSense
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'k-appbar': any;
      'k-appbar-section': any;
      'k-appbar-spacer': any;
      'k-drawer': any;
      'k-drawer-content': any;
      'k-drawer-navigation': any;
      'k-tabstrip': any;
      'k-tabstrip-tab': any;
      'k-card': any;
      'k-card-body': any;
      'k-card-title': any;
    }
  }
}

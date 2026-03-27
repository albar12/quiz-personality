// place files you want to import through the `$lib` alias in this folder.

// layouts
export { default as MainLayout } from './layouts/MainLayout.svelte';

// components
export { default as Navbar } from './components/layout/Navbar.svelte';
export { default as Footer } from './components/layout/Footer.svelte';
export { default as ProgressRow } from './components/layout/ProgressRow.svelte';

// screens
export * from './screens';

// constants
export { colors } from './constants/colors';

//type
export * from './types';

//store
export * from './store'
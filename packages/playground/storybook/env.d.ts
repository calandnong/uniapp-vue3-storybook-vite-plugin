/// <reference types="vite/client" />

declare module 'virtual:uniapp-global-css' {
  const cssModule: Record<string, never>;
  export default cssModule;
}

declare module 'virtual:vue-plugin-for-uniapp' {
  import { Plugin } from 'vue';
  const vuePluginForUniapp: Plugin;
  export default vuePluginForUniapp;
}

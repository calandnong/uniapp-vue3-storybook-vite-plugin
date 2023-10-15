import { StorybookConfig } from '@storybook/vue3-vite';
// import { unPluginUniAppH5 } from '../../../unplugin-uniapp-h5/src/index';
import { unPluginUniAppH5, createVueOptions } from 'unplugin-uniapp-h5';
import * as path from 'node:path';
import { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite'

export function camelToKebab(str: string) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

const config: StorybookConfig = {
  stories: [
    // "../stories/**/*.mdx", 
    // "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../packages/**/*.mdx", 
    "../packages/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal(config) {
    config.css = {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "${path.resolve(__dirname, '../stories/uView2/theme.scss')}";
          `,
          javascriptEnabled: true
        }
      }
    };
    const index = config.plugins?.findIndex((item) => {
      const _item = item as Plugin;
      if(_item.name === 'vite:vue') {
        return true;
      }
      return false;
    });
    if(index && index !== -1 && config.plugins) {    
      console.log('findIndex', config.plugins);  
      config.plugins[index] = vue({
        template: {
          compilerOptions: {
            ...createVueOptions(),
          }
        }
      });
    }
    return {
      ...config,
      plugins: [
        ...(config.plugins || []),
        unPluginUniAppH5(),
        // 自动导入uviewui的组件
        Components({
          dirs: [
            path.resolve(__dirname, '../stories/uView2/components'),
          ]
        }),
      ],
    }
  }
};
export default config;

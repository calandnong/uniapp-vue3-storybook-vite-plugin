import { StorybookConfig } from '@storybook/vue3-vite';
// import { unPluginUniAppH5 } from '../../../unplugin-uniapp-h5/src/index';
import { unPluginUniAppH5 } from 'unplugin-uniapp-h5';
import * as path from 'node:path';

import { Plugin } from 'vite';

function useTest(): Plugin {
  return {
    name: 'vite:xxxxVueTest',
    transform(code, id) {
      if(id.includes('.tsx')) {
        console.log('dasd');
      }
    }
  }
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
    return {
      ...config,
      plugins: [
        ...(config.plugins || []),
        unPluginUniAppH5(),
        // {
        //   name: 'vite:test-config',
        //   config: () => {
        //     return {
        //       resolve: {
        //         alias: {
        //           'vue': path.resolve(__dirname, '../node_modules/vue/dist/vue.esm-bundler.js')
        //         }
        //       }
        //     }
        //   }
        // }
      ],
    }
  }
};
export default config;

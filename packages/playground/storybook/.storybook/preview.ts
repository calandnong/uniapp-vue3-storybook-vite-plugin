import { setup } from '@storybook/vue3';
import { App } from 'vue';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
// import 'virtual:uniapp-global-css';
// import vuePluginForUniapp from 'virtual:vue-plugin-for-uniapp';
// main.js，注意要在use方法之后执行
import uView from '../stories/uView2';
import '../stories/uView2/index.scss';

setup(
  (app: App) =>{
    // app.use(vuePluginForUniapp);
    app.use(uView);
    // 如此配置即可
    uni.$u.config.unit = 'rpx';
  }
)


/** @type { import('@storybook/vue3').Preview } */
const preview = {
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12'
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

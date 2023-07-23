import { Plugin } from "vite";
import { createUniTagToUniComponentTagPlugin } from "../plugins/transform-uniapp-tags";
import { uniEnvConfigPlugin } from "../plugins/transform-env-config";
import vueJsx from '@vitejs/plugin-vue-jsx';
import { virtualGlobalCssPlugin } from "../plugins/global-css";
import { registerGlobalCodePlugin } from "../plugins/tranform-uni-api/index";
import { virtualVuePluginForUniapp } from "../plugins/virtual-vue-plugin-for-uniapp";
import { transformConditionalComment } from "../plugins/transform-conditional-comment";
import { transformRpxPlugin } from "../plugins/transform-rpx";
// @ts-ignore
import { default as commonjs } from 'vite-plugin-commonjs/dist/index.mjs';

/**
 * 支持h5渲染uniapp插件
 * @returns 
 */
export function unPluginUniAppH5(): Plugin[] {
  const plugins: Plugin[] = [];
  // 支持uniapp上下文环境变量
  plugins.push(uniEnvConfigPlugin());
  // 支持条件编译
  plugins.push(transformConditionalComment());
  // 转换rpx为rem插件
  plugins.push(transformRpxPlugin());
  // 创建转换【uniapp标签】为【uniapp组件标签】插件
  plugins.push(createUniTagToUniComponentTagPlugin());
  // 注入全局的代码(uni-api)
  plugins.push(registerGlobalCodePlugin());
  // 增加css虚拟模块
  plugins.push(virtualGlobalCssPlugin());
  // 增加vue插件虚拟模块
  plugins.push(virtualVuePluginForUniapp());
  // 支持jsx
  plugins.push(vueJsx({
    optimize: true,
    isCustomElement: (tag: string) => {
      // 去除自定义标签的告警
      return tag.startsWith('uni-');
    }
  }));
  // 处理commomjs的内容
  plugins.push(commonjs());
  return plugins;
}

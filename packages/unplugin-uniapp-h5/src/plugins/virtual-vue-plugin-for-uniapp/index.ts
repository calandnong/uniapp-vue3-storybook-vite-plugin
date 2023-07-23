import { Plugin } from "vite";
import { UNIAPP_COMPONENTS_PREFIX } from "../common/constants";

export function virtualVuePluginForUniapp(): Plugin {
  const virtualModuleId = 'virtual:vue-plugin-for-uniapp';
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'vite:virtual-vue-plugin-for-uniapp',
    // 真实虚拟模块 ID 转换为内部虚拟模块 ID，其实就是用于判断和分流
    resolveId(id: string) {
      if(virtualModuleId === id) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return {
          code: `
            import * as allComponent from 'unplugin-uniapp-h5/dist/libs/uniapp/uni-components/src/vue/index';
            import { Picker } from 'unplugin-uniapp-h5/dist/libs/uniapp/uni-h5/src/view/components/index';
            import { initView } from 'unplugin-uniapp-h5/dist/libs/uniapp/uni-core/src/view/init/index';

            function camelToKebab(str) {
              return str
                .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
                .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
                .toLowerCase();
            }

            function getComponents() {
              return {
                ...allComponent,
                Picker,
              }
            }

            export const registerComponents = (app) => {
              const components = getComponents();
              Object.keys(components).forEach(key => {
                console.log('allComponent', \`${UNIAPP_COMPONENTS_PREFIX}\${camelToKebab(key)}\`);
                app.component(\`${UNIAPP_COMPONENTS_PREFIX}\${camelToKebab(key)}\`, components[key]);
              });
            };

            const vuePluginForUniapp = {
              install(app) {
                // 初始化uniapp相关运行时视图层依赖
                initView();
                // 初始化全局组件
                registerComponents(app);
              }
            };

            export default vuePluginForUniapp;
          `,
          
        }
      }
    },
  }
}
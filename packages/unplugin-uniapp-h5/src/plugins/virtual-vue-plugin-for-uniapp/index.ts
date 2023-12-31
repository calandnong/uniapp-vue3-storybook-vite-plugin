import { Plugin } from "vite";
import { UNIAPP_COMPONENTS_PREFIX } from "../common/constants";

export function virtualVuePluginForUniapp(): Plugin {
  const virtualModuleId = 'virtual:vue-plugin-for-uniapp';
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    enforce: 'pre',
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
            import { 
              Button,
              Canvas,
              Checkbox,
              CheckboxGroup,
              Editor,
              Form,
              Icon,
              Image,
              Input,
              Label,
              MovableArea,
              MovableView,
              Navigator,
              PickerView,
              PickerViewColumn,
              Progress,
              Radio,
              RadioGroup,
              ResizeSensor,
              RichText,
              ScrollView,
              Slider,
              Swiper,
              SwiperItem,
              Switch,
              Text,
              Textarea,
              View,
              Video,
              WebView,
              Map,
              CoverView,
              CoverImage,
              Picker,
              //Unsupported
              Ad,
              AdContentPage,
              AdDraw,
              Camera,
              LivePlayer,
              LivePusher,
            } from '@dcloudio/uni-h5';
            import initView from '@unplugin-uniapp-h5/framework';

            function camelToKebab(str) {
              return str
                .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
                .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
                .toLowerCase();
            }

            function getComponents() {
              return {
                Button,
                Canvas,
                Checkbox,
                CheckboxGroup,
                Editor,
                Form,
                Icon,
                Image,
                Input,
                Label,
                MovableArea,
                MovableView,
                Navigator,
                PickerView,
                PickerViewColumn,
                Progress,
                Radio,
                RadioGroup,
                ResizeSensor,
                RichText,
                ScrollView,
                Slider,
                Swiper,
                SwiperItem,
                Switch,
                Text,
                Textarea,
                View,
                Video,
                WebView,
                Map,
                CoverView,
                CoverImage,
                Picker,
                //Unsupported
                Ad,
                AdContentPage,
                AdDraw,
                Camera,
                LivePlayer,
                LivePusher,
              }
            }

            export const registerComponents = (app) => {
              const components = getComponents();
              Object.keys(components).forEach(key => {
                // console.log('allComponent', \`${UNIAPP_COMPONENTS_PREFIX}\${camelToKebab(key)}\`);
                app.component(\`${UNIAPP_COMPONENTS_PREFIX}\${camelToKebab(key)}\`, components[key]);
              });
            };

            const vuePluginForUniapp = {
              install(app) {
                // 初始化uniapp相关运行时视图层依赖
                app.use(initView);
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
import { ROOT_PATH } from '../../constant';
import * as path from 'node:path';
import { Plugin } from 'vite';

function resolve(file: string) {
  return path.resolve(ROOT_PATH, file)
}

/**
 * 创建集成uniapp在h5环境下需要的配置插件
 */
export function uniEnvConfigPlugin(): Plugin {
  return {
    name: 'vite:uni-env-config',
    enforce: 'pre',
    config: () => {
      return {
        define: {
          global: 'window',
          __PLATFORM__: "'h5'",
          __DEV__: true,
          __NODE_JS__: false,
          __APP_VIEW__: false,
          __VUE_OPTIONS_API__: true,
          __VUE_PROD_DEVTOOLS__: false,
          __UNI_FEATURE_WX__: true,
          __UNI_FEATURE_PROMISE__: false,
          __UNI_FEATURE_I18N_EN__: true,
          __UNI_FEATURE_I18N_ES__: true,
          __UNI_FEATURE_I18N_FR__: true,
          __UNI_FEATURE_I18N_ZH_HANS__: true,
          __UNI_FEATURE_I18N_ZH_HANT__: true,
          __UNI_FEATURE_WXS__: false,
          __UNI_FEATURE_LONGPRESS__: true,
        },
        resolve: {
          alias: [
            {
              find: 'vue',
              replacement: resolve('./libs/uniapp/uni-h5-vue/src/vue.runtime.esm.js')
            },
            {
              find: '@dcloudio/uni-components',
              replacement: resolve('./libs/uniapp/uni-components/src/index.ts')
            },
            {
              find: '@dcloudio/uni-core',
              replacement: resolve('./libs/uniapp/uni-core/src/index.ts')
            },
            {
              find: '@dcloudio/uni-platform',
              replacement: resolve('./libs/uniapp/uni-h5/src/platform/index.ts')
            },
            {
              find: '@dcloudio/uni-api',
              replacement: resolve('./libs/uniapp/uni-api/src/index.ts')
            },
            {
              find: '@dcloudio/uni-shared',
              replacement: resolve('./libs/uniapp/uni-shared/src/index.ts')
            },
            // {
            //   find: '@vue/shared',
            //   replacement: resolve('./libs/uniapp/vue-shared/src/shared.cjs.js')
            // },
            {
              find: '@dcloudio/uni-h5',
              replacement: resolve('./libs/uniapp/uni-h5/build/uni-h5.es.js')
            },
            {
              find: '@dcloudio/uni-i18n',
              replacement: resolve('./libs/uniapp/uni-i18n/build/uni-i18n.es.js')
            },
            {
              find: '@dcloudio/uni-vue',
              replacement: resolve('./libs/uniapp/uni-vue/src/index.ts')
            },
            {
              find: '@dcloudio/uni-h5-api',
              replacement: resolve('./libs/uniapp/uni-h5/build/uni-h5.es.js')
            },
            {
              find: '@dcloudio/uni-h5-service-bridge',
              replacement: resolve('./libs/uniapp/uni-h5/build/uni-h5.es.js')
            },
            {
              find: '@dcloudio/uni-h5-view-bridge',
              replacement: resolve('./libs/uniapp/uni-h5/build/uni-h5.es.js')
            }
          ],
        }
      }
    }
  }
}
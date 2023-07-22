import { Plugin } from "vite";

function getGlobal(ssr?: boolean) {
  return ssr ? 'global' : 'window'
}
// 兼容 wx 对象
function registerGlobalCode(isVue: boolean = false) {
  const global = getGlobal(false);
  // 目前仅支持部分uni的api
  return `
    import * as uniApi from '@dcloudio/uni-h5-api';
    import { UniServiceJSBridge } from '@dcloudio/uni-h5-service-bridge';
    import { UniViewJSBridge } from '@dcloudio/uni-h5-view-bridge';
    import { getCurrentPages as getCurrentPagesApi } from 'unplugin-uniapp-h5/dist/libs/uniapp/uni-h5/src/framework/setup/page';

    if(!${global}.getCurrentPages) {
      ${global}.getCurrentPages = getCurrentPagesApi;
    }

    if(!${global}.uni) {
      ${global}.uni = Object.assign({}, uniApi);
    }
    const uni = ${global}.uni;
    if(!${global}.wx) {
      ${global}.wx = uni;
    }
    if(!${global}.rpx2px) {
      ${global}.rpx2px = uni.upx2px;
    }
    if(!${global}.UniServiceJSBridge) {
      ${global}.UniServiceJSBridge = UniServiceJSBridge;
    }
    if(!${global}.UniViewJSBridge) {
      ${global}.UniViewJSBridge = UniViewJSBridge;
    }
  `
}

function generateConfig(
  globalName: string,
  pagesJson: Record<string, unknown> = {}
) {
  delete pagesJson.pages
  delete pagesJson.subPackages
  delete pagesJson.subpackages
  pagesJson.compilerVersion = process.env.UNI_COMPILER_VERSION
  const networkTimeout = {
    request: 60000,
    connectSocket: 60000,
    uploadFile: 60000,
    downloadFile: 60000,
  };
  const themeConfig = {
    light: {},
    dark: {},
  };
  return `
    const extend = Object.assign;
    ${globalName}.__uniConfig=extend(${JSON.stringify(pagesJson)},{
        networkTimeout:${JSON.stringify(networkTimeout)},
        themeConfig:${JSON.stringify(themeConfig)},
        router: {},
    });
  `
}

export function replaceTagContent(template: string, replaceContent: string) {
  const result = template.replace(
    /<script([\s\S]*?)>([\s\S]*?)<\/script>/, 
    (_, attr, content) => {  
      return `<script${attr}>${replaceContent+content}</script>`;
    }
  );
  return result;
}


export function registerGlobalCodePlugin(): Plugin {
  return {
    name: 'vite:register-global-code-plugin',
    enforce: 'pre',
    transform(code, id) {
      // console.log('id---', id);      
      // 处理vue文件中uni的api使用
      if((/\.vue$/.test(id))) {
        return {
          code: replaceTagContent(code, `${registerGlobalCode(true)}\n`),
        }
      }
      // 处理非vite插件（unplugin-uniapp-h5）的js/ts中uni的api使用
      if(
        (!id.includes('unplugin-uniapp-h5'))
        // && (!id.includes('uView2'))
        && ((/\.ts$/.test(id)) || (/\.js$/.test(id)) || (/\.tsx$/.test(id)) || (/\.jsx$/.test(id)))
      ) {
        return {
          code: `${generateConfig(getGlobal())}\n${registerGlobalCode()}\n${code}`,
        }
      }
      return null;
    }
  }
}
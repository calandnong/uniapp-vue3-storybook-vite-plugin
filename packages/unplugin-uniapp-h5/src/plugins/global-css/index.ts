import { Plugin } from "vite";
import * as path from 'node:path';
import * as fs from 'node:fs';
import { ROOT_PATH } from "../../constant";

function getGlobalCss() {
  return fs.readFileSync(path.resolve(ROOT_PATH, './global.css')).toString();
}

export function virtualGlobalCssPlugin(): Plugin {
  const virtualModuleId = 'virtual:uniapp-global-css';
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'vite:virtual-global-css-plugin',
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
              if (typeof window !== 'undefined') {
                function loadCss() {
                  var body = document.body;
                  var styleDom = document.getElementById('${virtualModuleId}');
                  if(!styleDom) {
                    styleDom = document.createElement('style');
                  }
                  styleDom.innerHTML = ${JSON.stringify(getGlobalCss())};
                  styleDom.setAttribute('id', '${virtualModuleId}')
                  body.appendChild(styleDom);
                  console.log('加载啦！', styleDom)
                }
                loadCss();
              }
              export default {};
          `,
          
        }
      }
    },
  }
}
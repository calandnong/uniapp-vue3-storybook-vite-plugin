import { Plugin } from 'vite';
import { transformTag, transformTagArray, Options, camelToKebab } from './helper/index';
import { allComponents } from './constants';

export {
  transformTag,
  transformTagArray,
  type Options,
};

/**
 * 替换标签插件
 * @param options
 */
export function transformTagPlugin(options?: Options | Options[]): Plugin {
  return {
    name: 'vite:vite-plugin-transform-tag',
    enforce: 'pre',
    transform(code, id) {
      if (
        !/\.vue$/.test(id)
      ) {
        return null;
      }
      return {
        // 转换
        code: transformTagArray(code, options),
      };
    },
  };
}

/**
 * 创建uniapp标签转uniapp组件标签插件
 */
export function createUniTagToUniComponentTagPlugin(): Plugin {
  return transformTagPlugin(allComponents.map((key) => {
    const tag = camelToKebab(key);
    return {
      matchTag: tag,
      replaceTag: `uniapp-${tag}`
    }
  }));
}

import { Plugin } from "vite";
import { esbuildPrePlugin } from "./libs/esbuild";
import { initPostcssPlugin } from "./libs/postcss";
import { extend, isString } from "@vue/shared";
import fs from 'fs';

import {
  defaultRpx2Unit,
  defaultMiniProgramRpx2Unit,
  once,
} from '../../libs/uniapp/uni-shared/src/index';
import path from "path";
import { preCss } from "../transform-conditional-comment/helper";

const parseRpx2UnitOnce = once(
  (inputDir: string, platform: UniApp.PLATFORM = 'h5') => {
    const rpx2unit =
      platform === 'h5' || platform === 'app'
        ? defaultRpx2Unit
        : defaultMiniProgramRpx2Unit;
    return extend({}, rpx2unit)
  }
)
/**
 * 重写 readFileSync
 * 目前主要解决 scss 文件被 @import 的条件编译
 */
function rewriteReadFileSync() {
  const { readFileSync } = fs
  fs.readFileSync = ((filepath, options) => {
    const content = readFileSync(filepath, options)
    if (
      isString(filepath) &&
      isString(content) &&
      path.extname(filepath) === '.scss' &&
      content.includes('#endif')
    ) {
      return preCss(content)
    }
    return content
  }) as typeof fs['readFileSync']
}



export function transformRpxPlugin(): Plugin {
  rewriteReadFileSync();
  return {
    name: 'vite:transform-rpx-plugin',
    config() {
      const inputDir = process.env.UNI_INPUT_DIR || path.resolve(process.cwd(), 'stories')
      return {
        css: {
          postcss: {
            plugins: initPostcssPlugin({
              uniApp: parseRpx2UnitOnce(inputDir, 'h5'),
            }) as any,
          },
        },
        optimizeDeps: {
          esbuildOptions: {
            plugins: [esbuildPrePlugin()],
          },
        },
      }
    }
  }
}
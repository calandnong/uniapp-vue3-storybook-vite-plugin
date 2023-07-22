import { resolve } from 'node:path';
import { defineConfig } from 'rollup';
import type { Plugin } from 'rollup';
import dts from 'rollup-plugin-dts';
import esbuildPlugin from 'rollup-plugin-esbuild';
import NodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import pkg from '../package.json';

/**
 * 打包路径
 */
const DIST_ROOT_PATH = resolve(__dirname, '../dist');

/**
 * 公共插件
 */
const commonPlugins: Plugin[] = [json()];

// 处理ts
commonPlugins.push(esbuildPlugin({
  target: 'es2020',
}));

// 处理commonjs
commonPlugins.push(commonjs());

// 处理node模块
commonPlugins.push(NodeResolve({
  preferBuiltins: true,
}));

/**
 * 不打包进入dist的依赖
 */
const externals: string[] = [
  // 依赖external
  ...Object.keys(pkg.dependencies),
];

export default defineConfig([
  // mjs
  {
    input: 'src/index.ts',
    output: {
      file: `${DIST_ROOT_PATH}/index.mjs`,
      format: 'es',
    },
    external: [
      ...externals,
    ],
    plugins: [
      ...commonPlugins,
    ],
  },
  // cjs
  {
    input: 'src/index.ts',
    output: {
      file: `${DIST_ROOT_PATH}/index.cjs`,
      format: 'cjs',
    },
    external: [
      ...externals,
    ],
    plugins: [
      ...commonPlugins,
    ],
  },
  // d.ts
  {
    input: 'src/index.ts',
    output: {
      file: `${DIST_ROOT_PATH}/index.d.ts`,
      format: 'es',
    },
    external: [
      ...externals,
    ],
    plugins: [
      dts(),
    ],
  },
]);

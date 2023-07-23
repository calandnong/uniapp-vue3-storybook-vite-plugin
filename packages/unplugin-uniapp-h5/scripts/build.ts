import { execSync } from 'node:child_process';
import consola from 'consola';

function build() {
  consola.info('Rollup build');
  // 合并生成uniapp的css依赖
  execSync('pnpm run merge', { stdio: 'inherit' });
  // 打包插件代码
  execSync('pnpm run build:rollup', { stdio: 'inherit' });
  // 打包uniapp的组件源码和相关依赖
  execSync('pnpm run copy', { stdio: 'inherit' });
}

build();

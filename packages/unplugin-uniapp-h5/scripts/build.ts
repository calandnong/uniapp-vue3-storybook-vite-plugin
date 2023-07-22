import { execSync } from 'node:child_process';
import consola from 'consola';

function build() {
  consola.info('Rollup build');
  execSync('pnpm run merge', { stdio: 'inherit' });
  execSync('pnpm run build:rollup', { stdio: 'inherit' });
  execSync('pnpm run copy', { stdio: 'inherit' });
}

build();


import { execSync } from 'node:child_process';
import * as Fs from 'fs-extra';
import * as path from 'path';

const cwd = process.cwd();

function build() {
  console.info('preview build');
  if(!Fs.existsSync(path.resolve(cwd, './packages/unplugin-uniapp-h5/dist'))) {
    execSync('pnpm run plugin-build', { stdio: 'inherit' });
  }
}

build();

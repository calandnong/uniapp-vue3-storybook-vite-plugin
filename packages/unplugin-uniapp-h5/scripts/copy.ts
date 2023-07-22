import * as Fs from 'fs-extra';
import * as path from 'path';

const resolve = (src: string) => {
  return path.resolve(process.cwd(), src)
};

const DIST_PATH = resolve('./dist');
const SRC_PATH = resolve('./src');

try {
  Fs.rmSync(path.resolve(DIST_PATH, './libs'), {
    recursive: true
  });
}
catch(e) {
}

// 复制libs
Fs.copySync(path.resolve(SRC_PATH, './libs'), path.resolve(DIST_PATH, './libs'));

// 复制
Fs.copySync(path.resolve(SRC_PATH, './global.css'), path.resolve(DIST_PATH, './global.css'));

console.log('复制成功！');
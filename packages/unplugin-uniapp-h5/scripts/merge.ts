import * as path from "node:path";
import * as fs from "node:fs";

function writeGlobalCssFile(css: string) {
  const outputFilePath = path.join(__dirname, "../src/global.css");
  fs.writeFileSync(outputFilePath, css);
}

function loadCss(cssDir: string) {
  let css = '';
  const files = fs.readdirSync(cssDir);
  files.forEach((file) => {
    if (path.extname(file) === ".css") {
      const fileContent = fs.readFileSync(path.join(cssDir, file), "utf-8");
      css += fileContent;
    }
  });
  return css;
}

let mergedCSS = "";

// 加载component的样式
mergedCSS += loadCss(path.join(__dirname, "../src/libs/uniapp/uni-components/style"));
// 加载h5-api的样式
mergedCSS += loadCss(path.join(__dirname, "../src/libs/uniapp/uni-h5/style/api"));
// 加载h5-framework的样式
mergedCSS += loadCss(path.join(__dirname, "../src/libs/uniapp/uni-h5/style/framework"));
// 加载h5的样式
mergedCSS += loadCss(path.join(__dirname, "../src/libs/uniapp/uni-h5/style"));
// 去除跟随系统（夜间）的样式
mergedCSS = mergedCSS.replaceAll('prefers-color-scheme: dark', `prefers-color-scheme: ''`);

writeGlobalCssFile(mergedCSS);

console.log('成功生成global.css');

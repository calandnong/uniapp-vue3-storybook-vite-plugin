# uniapp-vue3-storybook-vite-plugin
支持storybook中渲染uniapp的标签和组件（基于vue3和vite）

---
## 运行环境
- node
- pnpm/npm
- storybook
- vite
- vue3

---
## 安装
pnpm
```bash
pnpm add unplugin-uniapp-h5 -D
```
npm
```bash
npm install unplugin-uniapp-h5 -D
```

## 使用
项目示例：[点击此处跳转](https://github.com/calandnong/uniapp-vue3-storybook-vite-plugin/tree/dev/packages/playground/storybook)
在.storybook下的main.ts中使用此插件
```diff
import { StorybookConfig } from '@storybook/vue3-vite';
+ import { unPluginUniAppH5 } from 'unplugin-uniapp-h5';

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal(config) {
    return {
      ...config,
      plugins: [
        ...(config.plugins || []),
+        unPluginUniAppH5(),
      ],
    }
  }
};
export default config;

```

## 其他
暂无
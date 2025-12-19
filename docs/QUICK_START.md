# 快速开始 - 3 步接入 whyDidYouRender

## 步骤 1: 安装依赖

```bash
pnpm add -D @welldone-software/why-did-you-render
```

## 步骤 2: 配置打包工具

### Vite 配置

在 `vite.config.js` 中：

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // ⚠️ 重要：只在开发环境使用 why-did-you-render 的 jsx-runtime
      jsxImportSource: process.env.NODE_ENV === 'development' 
        ? '@welldone-software/why-did-you-render' 
        : 'react',
    }),
  ],
});
```

### Webpack 配置

在 `babel.config.js` 或 `.babelrc` 中：

```json
{
  "presets": [
    [
      "@babel/preset-react",
      {
        "runtime": "automatic",
        "importSource": process.env.NODE_ENV === 'development' 
          ? "@welldone-software/why-did-you-render" 
          : "react"
      }
    ]
  ]
}
```

## 步骤 3: 创建并引入 wdyr.ts

### Vite 项目

创建 `src/wdyr.js`：

```javascript
import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import { enterpriseWdyrConfig } from '@wdyr-template/shared';

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    ...enterpriseWdyrConfig,
  });
}
```

在 `src/main.jsx` 中**第一个引入**：

```javascript
import './wdyr';  // ⚠️ 必须在最前面
import React from 'react';
// ... 其他导入
```

### Webpack 项目

创建 `src/wdyr.js`：

```javascript
import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  const { enterpriseWdyrConfig } = require('@wdyr-template/shared');
  
  whyDidYouRender(React, {
    ...enterpriseWdyrConfig,
  });
}
```

在 `src/index.jsx` 中**第一个引入**：

```javascript
import './wdyr';  // ⚠️ 必须在最前面
import React from 'react';
// ... 其他导入
```

## 完成！

现在你可以：

1. **自动追踪所有纯组件**（React.memo、PureComponent）- 无需手动设置
2. **追踪所有 Hook** - 自动发现 Hook 相关问题
3. **查看详细日志** - 在浏览器控制台查看组件重新渲染的原因

## 为特定组件启用监听

如果 `trackAllPureComponents: false`，可以手动启用：

```javascript
import { enableWdyr } from '@wdyr-template/shared';

const MyComponent = enableWdyr(() => {
  return <div>Hello</div>;
});
```

或者直接设置：

```javascript
const MyComponent = () => <div>Hello</div>;

if (process.env.NODE_ENV === 'development') {
  MyComponent.whyDidYouRender = true;
}
```

## 查看输出

1. 打开浏览器开发者工具
2. 切换到 Console 标签
3. 与页面交互
4. 观察 why-did-you-render 的输出

## 下一步

查看 [配置说明](./CONFIG.md) 了解所有配置选项的使用场景。


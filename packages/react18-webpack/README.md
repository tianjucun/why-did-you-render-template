# React 18 + Webpack 示例

这是 React 18 与 Webpack 打包工具的 why-did-you-render 集成示例。

## 运行项目

```bash
pnpm dev
```

项目将在 http://localhost:3001 启动。

## 项目结构

```
react18-webpack/
├── src/
│   ├── index.tsx              # 入口文件，引入 wdyr
│   ├── wdyr.ts                # whyDidYouRender 配置
│   ├── App.tsx                # 主应用组件
│   └── index.css
├── public/
│   └── index.html
├── package.json
├── webpack.config.js
└── tsconfig.json
```

## 查看 why-did-you-render 输出

1. 打开浏览器开发者工具
2. 切换到 Console 标签
3. 与页面上的组件交互
4. 观察控制台中的 why-did-you-render 输出

## 配置说明

whyDidYouRender 的配置在 `src/wdyr.ts` 文件中。


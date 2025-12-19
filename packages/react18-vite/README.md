# React 18 + Vite 示例

这是 React 18 与 Vite 打包工具的 why-did-you-render 集成示例。

## 运行项目

```bash
pnpm dev
```

项目将在 http://localhost:3000 启动。

## 项目结构

```
react18-vite/
├── src/
│   ├── main.tsx              # 入口文件，引入 wdyr
│   ├── wdyr.ts              # whyDidYouRender 配置
│   ├── App.tsx              # 主应用组件
│   ├── pages/               # 示例页面
│   │   ├── ComponentsDemo.tsx
│   │   ├── HooksDemo.tsx
│   │   ├── MemoDemo.tsx
│   │   └── OptionsDemo.tsx
│   └── index.css
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 查看 why-did-you-render 输出

1. 打开浏览器开发者工具
2. 切换到 Console 标签
3. 与页面上的组件交互
4. 观察控制台中的 why-did-you-render 输出

## 配置说明

whyDidYouRender 的配置在 `src/wdyr.ts` 文件中。你可以修改配置来测试不同的选项。

## 示例页面

- **组件示例**: 展示各种组件类型的 whyDidYouRender 集成
- **Hook 示例**: 展示各种 Hook 的使用和监听
- **Memo 优化**: 展示 React.memo、useMemo、useCallback 的使用
- **配置选项**: 展示不同配置选项的效果


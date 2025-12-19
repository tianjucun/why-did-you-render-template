# why-did-you-render-template

**简单、易用、直接套用** - 让开发者无需阅读文档即可快速接入 whyDidYouRender

> 基于 [@welldone-software/why-did-you-render](https://www.npmjs.com/package/@welldone-software/why-did-you-render) 的配置模板和最佳实践示例
>
> 📦 [npm 包](https://www.npmjs.com/package/@welldone-software/why-did-you-render) | 🐙 [GitHub 仓库](https://github.com/welldone-software/why-did-you-render)

## 🎯 核心特性

- ✅ **3 步快速接入** - 复制配置即可使用
- ✅ **企业最佳实践配置** - trackAllPureComponents + trackHooks + trackExtraHooks 组合
- ✅ **React 18 + Vite/Webpack** - 最常用的技术栈
- ✅ **开箱即用** - 无需阅读文档，直接套用配置

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 运行示例项目

```bash
# React 18 + Vite（推荐）
pnpm dev:react18-vite

# React 18 + Webpack
pnpm dev:react18-webpack
```

## 📁 项目结构

```
why-did-you-render-template/
├── packages/
│   ├── react18-vite/     # React 18 + Vite 示例
│   └── react18-webpack/  # React 18 + Webpack 示例
├── shared/               # 核心工具和配置
│   └── src/
│       ├── configs/      # 企业最佳实践配置
│       └── utils/        # 工具函数（enableWdyr）
└── docs/                 # 核心文档
    ├── QUICK_START.md    # 快速开始
    └── CONFIG.md         # 配置说明
```

## 📖 文档

- **[快速开始](./docs/QUICK_START.md)** - 3 步接入，直接套用
- **[配置说明](./docs/CONFIG.md)** - 企业最佳实践配置和使用场景

## ⚠️ 重要提示

### 配置要点

1. **Vite**: 必须在 `vite.config.ts` 中配置 `jsxImportSource`
2. **Webpack**: 必须在 `babel.config.js` 中配置 `importSource`
3. **引入顺序**: `wdyr.ts` 必须在应用入口文件的**第一个**引入
4. **开发环境**: 确保只在 `development` 环境启用

详细说明请查看：[快速开始](./docs/QUICK_START.md)

## 🛠️ 技术栈

- **React**: 18
- **打包工具**: Vite、Webpack
- **包管理**: pnpm
- **Monorepo**: pnpm workspace

## 📝 使用场景

1. **快速接入**: 复制配置到你的项目，3 步完成接入
2. **企业级配置**: 使用最佳实践配置，自动追踪所有组件和 Hook
3. **性能调试**: 快速定位组件重新渲染问题

## 🤝 贡献

欢迎贡献！请查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解详情。

## 📄 许可证

MIT


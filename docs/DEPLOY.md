# GitHub Pages 部署指南

本指南介绍如何将项目部署到 GitHub Pages，并可以在线访问编译后的项目页面（development 模式）。

## 📋 前置要求

1. GitHub 仓库已创建
2. 仓库已启用 GitHub Pages
3. 已配置 GitHub Actions 权限

## 🚀 快速部署

### 步骤 1: 启用 GitHub Pages

1. 进入 GitHub 仓库的 **Settings** → **Pages**
2. 在 **Source** 中选择 **GitHub Actions**
3. 保存设置

### 步骤 2: 推送代码

将代码推送到 `main` 或 `master` 分支：

```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

### 步骤 3: 查看部署状态

1. 进入 GitHub 仓库的 **Actions** 标签
2. 查看 `Deploy to GitHub Pages` workflow 的执行状态
3. 等待构建完成

### 步骤 4: 访问部署的页面

部署完成后，可以通过以下地址访问：

- **Vite 项目**: `https://<username>.github.io/<repository-name>/`
- **Webpack 项目**: `https://<username>.github.io/<repository-name>/webpack/`

## 🔧 配置说明

### GitHub Actions Workflow

工作流文件位于 `.github/workflows/deploy.yml`，主要步骤：

1. **安装依赖**: 使用 pnpm 安装所有依赖
2. **构建项目**: 在 development 模式下构建 Vite 和 Webpack 项目
3. **部署**: 将构建结果部署到 GitHub Pages

### Development 模式构建

为了保持 development 模式（whyDidYouRender 正常工作），构建时：

- **Vite**: 使用 `build:dev` 脚本，设置 `NODE_ENV=development`
- **Webpack**: 使用 `build:dev` 脚本，设置 `NODE_ENV=development`

### 构建脚本

```bash
# Vite 项目（development 模式）
cd packages/react18-vite
pnpm build:dev

# Webpack 项目（development 模式）
cd packages/react18-webpack
pnpm build:dev
```

## 📝 自定义配置

### 修改部署路径

如果仓库名称不是 `why-did-you-render-template`，需要修改 `vite.config.js` 中的 `base` 配置：

```javascript
base: process.env.GITHUB_PAGES ? '/your-repo-name/' : '/',
```

### 只部署一个项目

如果只想部署 Vite 项目，修改 `.github/workflows/deploy.yml`：

```yaml
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: packages/react18-vite/dist
```

## ⚠️ 注意事项

1. **Development 模式**: 构建时保持 `NODE_ENV=development`，确保 whyDidYouRender 正常工作
2. **Source Map**: 已启用 Source Map，控制台中的代码位置可点击
3. **文件大小**: Development 模式构建的文件较大，适合演示，不适合生产环境
4. **GitHub Pages 限制**: 
   - 只能托管静态文件
   - 不支持服务端功能
   - 有文件大小限制

## 🔍 验证部署

部署成功后，打开浏览器控制台：

1. 应该能看到 whyDidYouRender 的日志输出
2. 点击调用栈中的文件路径，应该能跳转到代码位置
3. 配置面板应该能正常工作

## 🛠️ 手动触发部署

如果需要手动触发部署：

1. 进入 GitHub 仓库的 **Actions** 标签
2. 选择 `Deploy to GitHub Pages` workflow
3. 点击 **Run workflow** 按钮
4. 选择分支并运行

## 📚 相关文档

- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
- [Webpack 部署指南](https://webpack.js.org/guides/production/)


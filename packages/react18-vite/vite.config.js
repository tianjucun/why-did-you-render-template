import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development' || process.env.NODE_ENV === 'development';
  
  return {
    plugins: [
      react({
        jsxRuntime: 'automatic',
        // ⚠️ 重要：whyDidYouRender 需要重写 jsx/jsxs 函数
        // 开发环境从 why-did-you-render 导入，生产环境从 react 导入
        jsxImportSource: isDevelopment
          ? '@welldone-software/why-did-you-render'
          : 'react',
      }),
    ],
    // 启用 Source Map，让控制台中的代码位置可点击
    build: {
      sourcemap: true,
      // 开发模式构建时，保持 development 环境
      minify: !isDevelopment,
    },
    // 如果部署到 GitHub Pages，需要设置 base
    base: process.env.GITHUB_PAGES ? '/why-did-you-render-template/' : '/',
    server: {
      port: 3000,
      open: true,
      // 确保 Source Map 在开发模式下可用
      sourcemapIgnoreList: false,
    },
  };
});

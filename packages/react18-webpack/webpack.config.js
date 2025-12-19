const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    entry: './src/index.jsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true,
    },
    // 启用 Source Map，让控制台中的代码位置可点击
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    resolve: {
      extensions: ['.jsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: { node: 'current' } }],
                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic',
                    development: isDevelopment,
                    // ⚠️ 重要：whyDidYouRender 需要重写 jsx/jsxs 函数
                    // 开发环境从 why-did-you-render 导入，生产环境从 react 导入
                    importSource: isDevelopment
                      ? '@welldone-software/why-did-you-render'
                      : 'react',
                  },
                ],
              ],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      // 定义环境变量，确保代码中可以使用 process.env.NODE_ENV
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          isDevelopment ? 'development' : 'production'
        ),
      }),
    ],
    devServer: {
      port: 3001,
      open: true,
      hot: true,
    },
  };
};

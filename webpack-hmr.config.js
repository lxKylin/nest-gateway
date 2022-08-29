/**
 * 借助 Webpack 的 HMR，使得每次更新只需要替换更新的内容，减少编译的时间与过程。
 * 使用 CLI安装的工程模板，直接使用 HotModuleReplacementPlugin 创建配置，减少工作量。
 * yarn add webpack-node-externals run-script-webpack-plugin webpack
 */

const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100']
      })
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/.js$/, /.d.ts$/]
      }),
      new RunScriptWebpackPlugin({ name: options.output.filename })
    ]
  };
};

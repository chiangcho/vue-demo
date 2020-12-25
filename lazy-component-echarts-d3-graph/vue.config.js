const resolve = dir => require('path').join(__dirname, dir)
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  publicPath: '/', // 使用相对路径可以满足大多数情况需求，如遇特殊情况满足不了请调整该值，请参考Vue Cli文档中关于“相对 baseUrl 的限制”：https://cli.vuejs.org/zh/config/#baseurl
  outputDir: 'dist',
  assetsDir: 'static',
  runtimeCompiler: true,
  productionSourceMap: true,
  chainWebpack: config => {
    // 重新设置 alias
    config.resolve.alias.set('@', resolve('src'))
  },
  devServer: {
    publicPath: '/',
    proxy: {
      '/cboard': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    plugins: [new CopyWebpackPlugin([{ from: 'node_modules/xcom-cboard/dist/static',to:'static' }])]
  }
}

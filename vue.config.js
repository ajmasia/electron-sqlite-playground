process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'TEST',
    },
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    },
  },
  configureWebpack: {
    devtool: 'source-map',
  },
}

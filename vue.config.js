const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  port: 8080
}),
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080
  },
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/album-frontend-1/',
}


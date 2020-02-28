module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/resources.scss";`
      }
    }
  },
  devServer: {
    port: 3010,
    proxy: {
      '/api/': {
        target: 'http://geekgram.test/api/',
      }
    }
  }
};

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    },
    resolve: {
      alias: {
        moment: "moment/src/moment"
      }
    }
  }
};

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    resolve: {
      alias: {
        moment: "moment/src/moment"
      }
    }
  }
};

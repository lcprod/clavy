module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: (config) => {
    config.module
      .rule("mjs")
      .test(/\.mjs$/)
      .type("javascript/auto")
      .include.add(/node_modules/)
      .end();
  }
}
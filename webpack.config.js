const path = require('path');

const config = {
    mode: 'development', // "production" | "development" | "none"
    resolve: {
      extensions: ['*', '.mjs', '.js', '.json']
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        }
      ]
    },
    performance: {
      maxEntrypointSize: 400000,
      maxAssetSize: 100000,
    }
  }
  
  module.exports = config
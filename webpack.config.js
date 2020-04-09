const path = require('path')

module.exports = (env, argv) => {
  let entryFilePath = './src/index.ts'
  if (argv.mode === 'development') entryFilePath = './src/examples/index.ts'
  return {
    entry: entryFilePath,
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: [/node_modules/]
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      compress: true,
      port: 8000
    }
  }
}

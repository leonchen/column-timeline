const path = require('path');

const PATHS = {
  dist: path.resolve(__dirname, 'dist'),
  src: path.resolve(__dirname, 'src')
};

module.exports = {
  entry: './src/index.ts',
  resolve: {
    alias: { '@src':  PATHS.src},
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  output: {
    publicPath: '/dist/',
    path: PATHS.dist,
    filename: 'chart.js'
  },
  devServer: {
    port: 9000
  }
}

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = () => {
  const CSSExtract = new ExtractTextPlugin('main.css');
  return {
    entry: './app/index.js',
    output: {
      path: path.join(__dirname, 'public/assets/'),
      filename: 'bundle.js'
    },
    module: {
      rules:[
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: 'css-loader',
                options: {sourceMap: true}
              },
              {
                loader: 'sass-loader',
                options: {sourceMap: true}
              }
            ]
          })
        }
      ]
    },
    plugins: [CSSExtract],
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      publicPath: '/assets/',
      port: 3000
    }
  }
}
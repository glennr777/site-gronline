const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    clean: true,
    path: __dirname + '/dist',
    filename: 'bundle.[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.webmanifest$/,
        exclude: /node_modules\//,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          },
          {
            loader: 'webmanifest-loader',
            options: {
              name: 'Foobar',
              shortName: 'Foobar',
              description: 'Just an example.'
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader' },
      {
        test: /\.(jpg|png|ico)$/,
        exclude: /node_modules\//,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.template.ejs',
      inject: 'html',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
  },
};

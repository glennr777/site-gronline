const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin');
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default;
const RemovePlugin = require('remove-files-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./webpack.common.js');

const config =
  merge(common, {
    mode: 'production',
    devtool: false,
    output: {
      clean: true,
      path: __dirname + '/dist',
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.template.ejs',
        inject: 'body',
        filename: 'index.html',
        scriptLoading: 'defer'
      }),
      new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/.+[.]js/]),
      new HTMLInlineCSSWebpackPlugin(),
      new RemovePlugin({
        // remove the main JS file as we're inlining
        after: {
          root: __dirname + '/dist',
          include: ['main.js']
        }
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
        }),
        new CssMinimizerPlugin(),
      ],
    },
  });

module.exports = config;
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin');
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default;
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
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
        new ImageMinimizerPlugin({
          deleteOriginalAssets: false,
          generator: [
            {
              // You can apply generator using `?as=webp`, you can use any name and provide more options
              preset: "webp",
              implementation: ImageMinimizerPlugin.squooshGenerate,
              options: {
                encodeOptions: {
                  // Please specify only one codec here, multiple codecs will not work
                  webp: {
                    quality: 90,
                  },
                },
              },
            },
          ],
          minimizer: {
            implementation: ImageMinimizerPlugin.squooshMinify,
            options: {
              encodeOptions: {
                mozjpeg: {
                  // That setting might be close to lossless, but it’s not guaranteed
                  // https://github.com/GoogleChromeLabs/squoosh/issues/85
                  quality: 100,
                },
                webp: {
                  lossless: 1,
                },
                avif: {
                  // https://github.com/GoogleChromeLabs/squoosh/blob/dev/codecs/avif/enc/README.md
                  cqLevel: 0,
                },
              },
            },
          },
        }),
      ],
    },
  });

module.exports = config;
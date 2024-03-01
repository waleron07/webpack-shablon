import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import webpack, { DefinePlugin } from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';
import { Configuration } from 'webpack';
import { BuildOptions } from './types';

export function buildPlugins({
  paths,
  mode,
  analyzer,
  platform,
}: BuildOptions): Configuration['plugins'] {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const plugins: Configuration['plugins'] = [
    // генерация html файла и добавление скриптов и иконку через favicon(слева от url)
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, 'favicon.ico'),
    }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
      __ENV__: JSON.stringify(mode),
    }),
  ];
  if (isDev) {
    // ProgressPlugin - показвает процент сборки
    plugins.push(new webpack.ProgressPlugin());
    plugins.push(new ForkTsCheckerWebpackPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());
  }
  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      })
    );
    // try {
    //   plugins.push(
    //     new CopyPlugin({
    //       patterns: [
    //         {
    //           // from: './node_modules/@pdftron/webviewer/public',
    //           // to: './public/webviewer',
    //           from: path.resolve(paths.public, 'locales'),
    //           to: path.resolve(paths.output, 'locales'),
    //         },
    //       ],
    //     })
    //   );
    // } catch (err) {
    //   console.log(err, 'errrrrr');
    // }
  }
  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }
  return plugins;
}

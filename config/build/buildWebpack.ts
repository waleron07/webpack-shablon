import { WebpackConfiguration } from 'webpack-dev-server';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';

export function buildWebpack(options: BuildOptions): WebpackConfiguration {
  const { paths, mode } = options;
  const isDev = mode === 'development';

  const config: webpack.Configuration = {
    // формат сборки, для примера два формата
    mode: mode ?? 'development',
    entry: paths.entry,
    output: {
      path: paths.output,
      // шаблон для имени файла
      filename: '[name].[contenthash].js',
      // очистка старой сборки
      clean: true,
      chunkFilename: '[name][id].js',
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    // исходный код в браузере отображается читабельным, в доке есть и другие настройки source-map
    devtool: isDev ? 'inline-source-map' : 'source-map',
    devServer: isDev ? buildDevServer(options) : undefined,
  };
  return config;
}

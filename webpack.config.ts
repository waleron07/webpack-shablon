import 'webpack-dev-server';
import path from 'path';
import webpack from 'webpack';
import { buildWebpack } from './config/build/buildWebpack';
import { BuildMode, BuildPaths, BuildPlatform } from './config/build/types';

// переменные окружения
interface EnvVariables {
  mode: BuildMode;
  port?: number;
  analyzer?: boolean;
  platform?: BuildPlatform;
}
export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    // путь к точке выхода
    output: path.resolve(__dirname, 'build'),
    // путь к точке входа
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    public: path.resolve(__dirname, 'public'),
    src: path.resolve(__dirname, 'src'),
  };
  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    // формат сборки, для примера два формата
    mode: env.mode ?? 'development',
    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? 'desktop',
  });
  return config;
};

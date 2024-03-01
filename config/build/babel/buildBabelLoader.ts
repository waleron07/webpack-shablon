import { BuildOptions } from '../types/types';
import { removeDataTestIdBabelPlugin } from './removeDataTestIdBabelPlugin';

export function buildBabelLoader({ mode }: BuildOptions) {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const plugins = [];

  if (isProd) {
    // удаление ноды data-testid
    // в режиме разработки можно оставить тестовые ноды, а в проде их выпиливать
    plugins.push([
      removeDataTestIdBabelPlugin,
      {
        props: ['data-testid'],
      },
    ]);
  }

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          [
            '@babel/preset-react',
            {
              runtime: isDev ? 'automatic' : 'classic',
            },
          ],
        ],
        plugins: plugins.length ? plugins : undefined,
      },
    },
  };
}

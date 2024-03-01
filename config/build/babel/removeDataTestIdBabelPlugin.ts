import { PluginItem } from '@babel/core';

// работа с нодами
export function removeDataTestIdBabelPlugin(): PluginItem {
  return {
    visitor: {
      Program(path, state) {
        // достаем пропсы которые удаляем
        const forbiddenProps = state.opts.props || [];
        // поиск ноды которые удаляем
        path.traverse({
          JSXIdentifier(current) {
            const nodeName = current.node.name;
            if (forbiddenProps.includes(nodeName)) {
              // удаление ноды
              current.parentPath.remove();
            }
          },
        });
      },
    },
  };
}

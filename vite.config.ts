import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

type ViteConfigProps = {
  mode: string;
  command: string;
};

export default (args: ViteConfigProps) => {
  const generateScopedName =
    args.mode === 'production' ? '[hash:base64:5]' : '[local]__[hash:base64:5]';

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@pages': '/src/App/pages',
        '@utils': '/src/utils',
        '@configs': '/src/configs',
        '@assets': '/src/assets',
      },
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName,
      },
    },
  });
};

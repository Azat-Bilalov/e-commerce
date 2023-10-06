module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const plugins = [
    process.env.NODE_ENV === 'development' && 'react-refresh/babel',
  ].filter(Boolean);

  return {
    presets: [
      '@babel/preset-env',
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins,
  };
};

module.exports = (api) => {
  api.cache(true);

  const isDev = process.env.NODE_ENV === 'development';
  const isProd = !isDev;

  return {
    plugins: [
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: false,
        },
      ],
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      isDev && 'react-refresh/babel',
    ].filter(Boolean),
    presets: [
      [
        '@babel/preset-env',
        {
          bugfixes: true,
          corejs: {
            version: '3.13',
          },
          modules: false,
          useBuiltIns: 'usage',
        },
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
      ['@babel/preset-typescript', {}],
    ],
  };
};

module.exports = (api) => {
  api.cache(true);

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
      'react-refresh/babel',
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          bugfixes: true,
          corejs: {
            version: '3.13',
          },
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

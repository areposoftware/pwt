const path = require('path');
const webpack = require('webpack');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { BundleStatsWebpackPlugin } = require('bundle-stats-webpack-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const appName = 'Pro Wrestling Tycoon';
const dbVersion = 1;

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const gitRevisionPlugin = isDev
  ? undefined
  : new GitRevisionPlugin({ lightweightTags: true });

module.exports = (env) => ({
  context: __dirname,

  mode: isDev ? 'development' : 'production',

  entry: {
    react: {
      import: 'react',
      filename: isDev ? 'js/[name].js' : 'js/[id].[contenthash].js',
    },
    'react-dom': {
      import: 'react-dom',
      filename: isDev ? 'js/[name].js' : 'js/[id].[contenthash].js',
    },
    '@chakra-ui': {
      import: '@chakra-ui/react',
      filename: isDev ? 'js/[name].js' : 'js/[id].[contenthash].js',
    },
    'prop-types': {
      import: 'prop-types',
      filename: isDev ? 'js/[name].js' : 'js/[id].[contenthash].js',
    },
    app: {
      dependOn: ['react', 'react-dom', '@chakra-ui', 'prop-types'],
      import: path.resolve(__dirname, 'src', 'app.tsx'),
    },
  },

  output: {
    filename: isDev ? 'js/[name].js' : 'js/[name].[git-revision-version].js',
    path: isDev
      ? path.resolve(__dirname, 'dev')
      : path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  plugins: [
    isProd && gitRevisionPlugin,

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __APP_NAME__: JSON.stringify(appName),
      __DB_VERSION__: JSON.stringify(dbVersion),
      __APP_VERSION__: isDev
        ? 'dev'
        : JSON.stringify(gitRevisionPlugin.version),
    }),

    new webpack.BannerPlugin({
      banner: 'name: [name],file: [file],version:[git-revision-version]',
    }),

    new ForkTsCheckerPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
    }),

    new HtmlPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),

    isDev && new webpack.HotModuleReplacementPlugin(),
    isDev && new ReactRefreshWebpackPlugin(),

    isProd &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        generateStatsFile: true,
        openAnalyzer: false,
        reportFilename: '../analysis/report.html',
        statsFilename: '../analysis/stats.json',
      }),

    isProd &&
      new BundleStatsWebpackPlugin({
        compare: true,
        baseline: true,
        html: true,
        outDir: '../analysis',
        stats: {
          context: __dirname,
          assets: true,
          entrypoints: true,
          chunks: true,
          modules: true,
          builtAt: true,
          hash: true,
        },
      }),
  ].filter(Boolean),

  target: 'web',

  devtool: isDev ? 'source-map' : 'hidden-nosources-source-map',

  devServer: {
    contentBase: path.resolve(__dirname, 'dev'),
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 3000,
    writeToDisk: true,
  },

  optimization: {
    minimize: isProd,
    splitChunks: {
      automaticNameDelimiter: '.',
      chunks: 'all',
      enforceSizeThreshold: 50000,
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },

  stats: {
    assets: true,
    entrypoints: true,
    chunks: true,
    modules: true,
    builtAt: true,
    hash: true,
  },

  experiments: {
    topLevelAwait: true,
  },
});

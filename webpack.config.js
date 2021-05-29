const path = require('path');
const webpack = require('webpack');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
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
    app: path.resolve(__dirname, 'src', 'app.tsx'),
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
      __APP_NAME__: JSON.stringify(appName),
      __DB_VERSION__: JSON.stringify(dbVersion),
      __APP_VERSION__: isDev
        ? 'dev'
        : JSON.stringify(gitRevisionPlugin.version),
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
        reportFilename: '../analysis/report.html',
        statsFilename: '../analysis/stats.json',
      }),
  ].filter(Boolean),
  target: 'web',
  devtool: isDev ? 'source-map' : false,
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
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },
  experiments: {
    topLevelAwait: true,
  },
});

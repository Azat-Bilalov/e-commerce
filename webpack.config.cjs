const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');
const isProd = process.env.NODE_ENV === 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

const getSettingsForStyles = (withModules = false) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    !withModules
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            modules: {
              exportLocalsConvention: 'camelCase',
              localIdentName: !isProd
                ? '[path][name]__[local]'
                : '[hash:base64]',
            },
          },
        },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    'sass-loader',
  ];
};

module.exports = {
  target: !isProd ? 'web' : 'browserslist',
  entry: path.join(srcPath, 'main.tsx'),
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.[tj]sx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
    }),
    new TsCheckerPlugin(),
  ].filter(Boolean),
  devServer: {
    host: '127.0.0.1',
    host: 'localhost',
    port: 3000,
    hot: true,
    historyApiFallback: true,
    static: path.resolve(__dirname, 'public'),
  },
  resolve: {
    extensions: ['.tsx', '.jsx', '.js', '.ts'],
    alias: {
      '@': srcPath,
      '@components': path.resolve(srcPath, 'components'),
      '@pages': path.resolve(srcPath, 'app/pages'),
      '@utils': path.resolve(srcPath, 'utils'),
      '@configs': path.resolve(srcPath, 'configs'),
      '@store': path.resolve(srcPath, 'app/store'),
      '@assets': path.resolve(srcPath, 'assets'),
    },
  },
};

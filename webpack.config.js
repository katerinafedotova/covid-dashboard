const path = require('path');

const PATHS = {
  src: path.join(__dirname, 'src'),
};
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, './src/template.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: `${PATHS.src}/assets/`, to: 'assets/' },
      ],
    }),
  ],
  resolve: {
    alias: {
      './images/layers.png$': path.resolve(
        __dirname,
        './node_modules/leaflet/dist/images/layers.png',
      ),
      './images/layers-2x.png$': path.resolve(
        __dirname,
        './node_modules/leaflet/dist/images/layers-2x.png',
      ),
      './images/marker-icon.png$': path.resolve(
        __dirname,
        './node_modules/leaflet/dist/images/marker-icon.png',
      ),
      './images/marker-icon-2x.png$': path.resolve(
        __dirname,
        './node_modules/leaflet/dist/images/marker-icon-2x.png',
      ),
      './images/marker-shadow.png$': path.resolve(
        __dirname,
        './node_modules/leaflet/dist/images/marker-shadow.png',
      ),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(?:gif|png|jpg|jpeg|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[ext]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    content: './src/content.js',
    popup: './src/popup/popup.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: ({ chunk: { name } }) => {
      return name === 'popup' ? '[name]/[name].js' : '[name].js';
    },
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/, // Match CSS files
        use: ['style-loader', 'css-loader'], // Use style-loader and css-loader
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/manifest.json', to: 'manifest.json' }, // Copy manifest.json
        { from: 'src/background.js', to: 'background.js' }, // Copy background.js
        { from: 'src/options.html', to: 'options.html' }, // Copy options.html
        { from: 'src/popup/popup.html', to: 'popup/popup.html' }, // Copy popup.html
        { from: 'src/images', to: 'images' }, // Copy the 'images' directory
      ],
    }),
  ],
};

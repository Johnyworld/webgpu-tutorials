const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        include: path.resolve(__dirname, 'src'),
        type: 'javascript/esm',
      },
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
};

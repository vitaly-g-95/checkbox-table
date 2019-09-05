const path = require('path');

module.exports = {
  mode: 'development',
  entry: './app/app.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'app/dist')
  }
};

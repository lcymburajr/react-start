/**
 * Created by lcymbura on 10/13/15.
 */
module.exports = function () {
  var config = {
    dist: './dist/',

    alljs: [
      './src/**/*.js',
      './*.js'
    ],

    react: './src/client/index.js',

    less: './src/client/styles/styles.less',

    nodeServer: './src/server/server.js'

  };

  return config;
};
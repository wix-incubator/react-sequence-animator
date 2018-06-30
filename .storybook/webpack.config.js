const yoshiWebpackConfig = require('yoshi/config/webpack.config.storybook');

module.exports = (config, env, defaultConfig) => {
  return yoshiWebpackConfig(defaultConfig);
};

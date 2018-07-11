const yoshiWebpackConfig = require('yoshi/config/webpack.config.storybook');
const remove = require('lodash/remove');

module.exports = (config, env, defaultConfig) => {
  const storybookConfig = yoshiWebpackConfig(defaultConfig);
  try {
    remove(storybookConfig.module.rules, (rule) => String(rule.test) === String(/\.md$/));
    storybookConfig.module.rules.push({
      test: /\.md$/,
      use: [
        {
          loader: 'html-loader',
        },
        {
          loader: 'markdown-loader',
        },
      ],
    });
  } catch (err) {
    console.log('webpack.config.js:10', err);
  }
  return storybookConfig;
};

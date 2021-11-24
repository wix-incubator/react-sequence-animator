const yoshiWebpackConfig = require('@wix/yoshi-flow-library/storybook');

module.exports = {
  stories: ['../stories/*.story.tsx'],
  addons: ['@storybook/addon-essentials'],
  webpackFinal: async (config) =>  yoshiWebpackConfig(config),
  core: {
    builder: 'webpack5'
  },
  typescript: {
        check: false,
        reactDocgen: false,
    },
}

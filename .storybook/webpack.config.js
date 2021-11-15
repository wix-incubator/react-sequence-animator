const yoshiWebpackConfig = require('@wix/yoshi-flow-library/storybook');

console.log('adler', 'webpack.config.js:3', typeof yoshiWebpackConfig);

const remove = require('lodash/remove');

module.exports = yoshiWebpackConfig;
// module.exports = (config, env, defaultConfig) => {
//   const storybookConfig = yoshiWebpackConfig(config);
//   try {
//     remove(storybookConfig.module.rules, (rule) => String(rule.test) === String(/\.md$/));
//     storybookConfig.module.rules.push({
//       test: /\.md$/,
//       use: [
//         {
//           loader: 'html-loader',
//         },
//         {
//           loader: 'markdown-loader',
//         },
//       ],
//     });
//   } catch (err) {
//     console.log('webpack.config.js:10', err);
//   }
//   return storybookConfig;
// };

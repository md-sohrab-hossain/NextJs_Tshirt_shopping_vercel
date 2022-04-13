const sassGlobImporter = require('node-sass-glob-importer');
const path = require('path');

module.exports = {
  stories: ['../src/components/**/*.stories.@(jsx|tsx|mdx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@whitespace/storybook-addon-html'],

  webpack: function (config) {
    // ...add your webpack config
    config.module.rules.push({
      test: /\.scss$/,
      include: path.resolve(__dirname, '../src'),
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            sassOptions: { importer: sassGlobImporter() },
          },
        },
      ],
    });

    config.resolve.extensions.push('*', '.js', '.jsx', '.ts', '.tsx', '.json', '.gif', '.png', '.jpg');
    config.resolve.modules.push('./node_modules', '../src');
    config.resolve.alias = {
      '*': path.resolve(__dirname, '../src'),
      story: path.resolve(__dirname, '../.storybook'),
    };

    return {
      ...config,
      plugins: [...config.plugins],
    };
  },
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
};

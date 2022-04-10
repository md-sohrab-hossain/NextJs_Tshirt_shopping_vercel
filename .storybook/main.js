const globImporter = require('node-sass-glob-importer');

module.exports = {
  stories: [
    '../src/components/atoms/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/molecules/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/organisms/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],

  webpack: function (config) {
    // ...add your webpack config
    config.module.rules.push(
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.scss$/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                importer: globImporter(),
              },
            },
          },
        ],
        exclude: /\.module\.scss$/,
      }
    );

    return config;
  },
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
};

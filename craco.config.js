const sassResourcesLoader = require('craco-sass-resources-loader');
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/components/pages'),
      '@commons': path.resolve(__dirname, 'src/components/commons'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@saga': path.resolve(__dirname, 'src/saga'),
    },
  },
  mode: 'development',
  output: {
    path: __dirname,
  },
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: './src/index.scss',
      },
    },
  ],
};

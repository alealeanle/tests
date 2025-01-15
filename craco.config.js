const sassResourcesLoader = require('craco-sass-resources-loader');
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/components/pages'),
      '@commons': path.resolve(__dirname, 'src/components/commons'),
      '@store': path.resolve(__dirname, 'src/redux/store'),
      '@models': path.resolve(__dirname, 'src/redux/models'),
      '@sagas': path.resolve(__dirname, 'src/redux/sagas'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@EditPage': path.resolve(__dirname, 'src/components/pages/EditPage'),
      '@TestListPage': path.resolve(
        __dirname,
        'src/components/pages/TestListPage',
      ),
      '@TestPassingPage': path.resolve(
        __dirname,
        'src/components/pages/TestPassingPage',
      ),
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

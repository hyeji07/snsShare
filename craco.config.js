const CracoAlias = require('craco-alias');
const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          process: require.resolve('process/browser'),
          zlib: require.resolve('browserify-zlib'),
          stream: require.resolve('stream-browserify'),
          util: require.resolve('util'),
          buffer: require.resolve('buffer'),
          asset: require.resolve('assert/'),
          url: require.resolve('url/'),
          os: require.resolve('os-browserify/browser'),
          https: require.resolve('https-browserify'),
          http: require.resolve('stream-http'),
          crypto: require.resolve('crypto-browserify'),
          fs: false,
        },
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
            resolve: {
              fullySpecified: false,
            },
          },
        ],
      },
      plugins: [
        new webpack.ProvidePlugin({
          process: 'process/browser',
        }),
      ],
    },
  },

  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.json',
        debug: false,
      },
    },
  ],
};

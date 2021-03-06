const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = env => {
  // Build mode
  const mode = env.MODE ? env.MODE : 'development';
  const target = env.TARGET ? env.TARGET : 'node';
  const outputFilename = target === 'web' ? 'tendermint.umd.js' : 'tendermint.js';

  return {
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: outputFilename,
      library: 'TendermintJS',
      libraryExport: 'default',
      libraryTarget: 'umd'
    },
    target,
    mode,
    entry: './src/index.ts',
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)$/,
          loader: 'babel-loader',
        },
        {
          test: /\.js$/,
          use: ['source-map-loader'],
          enforce: 'pre'
        }
      ]
    },
    plugins: [
      // new BundleAnalyzerPlugin()
    ]
  };
}

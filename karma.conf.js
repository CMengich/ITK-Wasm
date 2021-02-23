/* eslint-disable global-require */
/* eslint-disable react/require-extension */
var path = require('path')

var webpack = require('webpack')

var sourcePath = path.resolve(__dirname, './dist')

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'test'

if (!process.env.CHROME_BIN) {
  process.env.CHROME_BIN = require('puppeteer').executablePath()
}

module.exports = function init (config) {
  config.set({
    plugins: [
      require('karma-webpack'),
      require('karma-tap'),
      require('karma-chrome-launcher'),
      require('karma-tap-pretty-reporter')
    ],

    basePath: '',
    frameworks: ['tap', 'webpack'],
    files: [
      './test/Browser/tests.js',
      { pattern: './dist/ImageIOs/**', watched: true, served: true, included: false },
      { pattern: './dist/MeshIOs/**', watched: true, served: true, included: false },
      { pattern: './dist/PolyDataIOs/**', watched: true, served: true, included: false },
      { pattern: './dist/WebWorkers/**', watched: true, served: true, included: false },
      { pattern: './dist/Pipelines/**', watched: true, served: true, included: false },
      { pattern: './build/ExternalData/test/**', watched: true, served: true, included: false }
    ],

    preprocessors: {
      './test/Browser/*.js': ['webpack']
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [].concat()
      },
      resolve: {
        modules: [
          path.resolve(__dirname, 'node_modules'),
          sourcePath
        ],
        fallback: {
          path: false,
          fs: false,
        },
        alias: {
          './itkConfig$': path.resolve(__dirname, 'test', 'Browser', 'config', 'itkConfigBrowserTest.js'),
          stream: 'stream-browserify',
        }
      },
      plugins: [
        new webpack.DefinePlugin({
          __BASE_PATH__: "'/base'",
        }),
        new webpack.ProvidePlugin({ process: ['process/browser'] }),
      ],
    },

    webpackMiddleware: {
      noInfo: true
    },

    reporters: [
      'tap-pretty'
    ],

    client: {
      useIframe: true
    },

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    // browserNoActivityTimeout: 600000,
    // browserDisconnectTimeout: 600000,

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true
  })
}

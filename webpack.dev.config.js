const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.join(__dirname, '/dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
        
                /* These folders are transpiled by babel - the fewer items, the faster the process */
                include: [
                  path.resolve(__dirname, "src"),
                ],
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true
                }
            },
            {
                test: /\.(css|scss)$/,
                use: [
                  {
                    loader: 'style-loader',
                  },
                  {
                    loader: 'css-loader',
                    options:
                    {
                      sourceMap: true,
                      importLoaders: true,
                      modules: false,
                      localIdentName: '[name]__[local]___[hash:base64:5]',
                      minimize: false,
                    },
                  },
                  {
                    loader: 'sass-loader'
                  }
                ]
            }
        ]
    },
    resolve: {
        alias: {
          '~': path.resolve(__dirname, './'),
          '@src': path.resolve(__dirname, 'src'),
          '@styles': path.resolve(__dirname, 'src/styles')
        },
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            options: {
              commit: 'local',
              newRelic: ''
            },
            template: './src/index.html',
            minify: {
              removeComments: true,
              collapseWhitespace: true
            },
            inject: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            __DEV__: true,
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: true,
            noInfo: true,
            options: {
              sassLoader: {
                includePaths: [path.resolve(__dirname, 'src', 'scss')]
              },
              context: '/',
              postcss: () => [autoprefixer],
            }
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development'
        })
    ],
    devServer: {
      contentBase: './dist',
      port: 3000
    }
}
const webpack = require('webpack');

module.exports = [{
    devServer: {
        inline:true,
        port: 8008
    },
    devtool: 'none',
    entry: ["babel-polyfill", "./src/app.jsx"],
    output: {
        path: __dirname + '/src',
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['babel-preset-latest', 'react']
            }
        }]
    },
    plugins: [
        new webpack.DefinePlugin({ // <-- key to reducing React's size
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.optimize.UglifyJsPlugin(), //minify everything
        new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
      ]
}];
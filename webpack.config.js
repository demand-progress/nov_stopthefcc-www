const webpack = require('webpack');


module.exports = [{
    devServer: {
		port: 8008,
		historyApiFallback: true,
    },
    devtool: 'none',
    entry: ["babel-polyfill", "./src/app.jsx"],
    output: {
        path: __dirname + '/src',
		filename: "bundle.js",
		publicPath: '/'
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
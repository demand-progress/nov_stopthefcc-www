const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-3-webpack-plugin");


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
        rules : [{
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
        new UglifyJsPlugin({
        		uglifyOptions: {
        			warnings: false,
        			ie8: false,
        			output: {
        				comments: false
        			}
        		}
        	}),
        new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
      ]
}];
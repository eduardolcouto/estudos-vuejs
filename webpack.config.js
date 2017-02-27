const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
let extractCSS = new ExtractTextPlugin("../css/app.css");

module.exports = {
	devtool: 'source-map',
	entry: './src/js/main.js',
	output: {
 		path: __dirname + '/dist/js',
 		filename: 'app.bundle.js',
 		publicPath: '/dist/js/'
	},
	plugins: [
		new webpack.ProvidePlugin({
			'window.$' : 'jquery',
			'window.jQuery' : 'jquery'
		}),
		extractCSS,
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders:[
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query:{
					presets:['es2015']
				}
			},
			{
				test: /\.(woff|woff2|ttf|svg|eot)$/,
				loader: 'url-loader?limit=100000'
			},
			{
				test: /\.scss$/,
				loader: extractCSS.extract(['css-loader','sass-loader'])
			},
			{
				test: /\.(jpg|png|gif)$/,
				loader: 'file-loader'
			}
		]
	},
	devServer:{
		host: '0.0.0.0',
	    inline: true,
		watchOptions:{
			poll: true,
			aggregateTimeout: 300
		}
	}
};

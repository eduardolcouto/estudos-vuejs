module.exports = {
	entry: './src/js/main.js',
	output: {
 		path: __dirname + '/dist/js',
 		filename: 'app.bundle.js',
 		publicPath: '/dist/js/'
	},
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
				loaders:['style-loader','css-loader','sass-loader']
			},
			{
				test: /\.(jpg|png|gif)$/,
				loader: 'file-loader'
			}
		]
	}
};

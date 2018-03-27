const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devServer = ({ host, port } = {}) => ({
	devServer: {
		stats: 'errors-only',
		host, // default is localhost
		port, // default is 8080
		overlay: {
			errors: true,
			warnings: true
		},
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		}
	}
});

exports.loadSCSS = ({ include, exclude, sourceMap = false, host = 'localhost', port = '8080' } = {}) => {
	const base = {
		module: {
			rules: [
				{
					test: /\.(css|scss)$/,
					include,
					exclude,
					use: _SCSSLoaders({ sourceMap, postLoaders: ['style-loader'] })
				}
			]
		}
	};

	if (sourceMap) {
		base.output = {
			publicPath: `http://${host}:${port}/`
		};
	}

	return base;
};

exports.extractSCSS = ({ include, exclude } = {}) => {
	const plugin = new ExtractTextPlugin({
		allChunks: true,
		filename: '[name].css'
	});

	return {
		module: {
			rules: [
				{
					test: /\.(css|scss)$/,
					include,
					exclude,
					use: plugin.extract({
						use: _SCSSLoaders({ minimize: { discardComments: { removeAll: true } } })
					})
				}
			]
		},
		plugins: [plugin]
	};
};

const _SCSSLoaders = ({ preLoaders = [], postLoaders = [], minimize = false, sourceMap = false } = {}) =>
	postLoaders
		.concat([
			{
				loader: 'css-loader',
				options: {
					importLoaders: 2,
					minimize,
					sourceMap
				}
			},
			{
				loader: 'postcss-loader',
				options: {
					plugins: () => [require('autoprefixer')],
					sourceMap
				}
			},
			{
				loader: 'sass-loader',
				options: {
					sourceMap
				}
			}
		])
		.concat(preLoaders);

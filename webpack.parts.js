import ExtractTextPlugin from 'extract-text-webpack-plugin';
import GoogleFontsPlugin from 'google-fonts-webpack-plugin';
import autoprefixer from 'autoprefixer';

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

exports.loadCSS = ({ include, exclude } = {}) => ({
	module: {
		rules: [
			{
				test: /\.css$/,
				include,
				exclude,
				use: _CSSLoaders({ postLoaders: ['style-loader'] })
			}
		]
	}
});

exports.extractCSS = ({ include, exclude, filename = '[name].css', minimize = false } = {}) => {
	const plugin = new ExtractTextPlugin({
		allChunks: true,
		filename
	});

	return {
		module: {
			rules: [
				{
					test: /\.css$/,
					include,
					exclude,
					use: plugin.extract({
						use: _CSSLoaders({ minimize })
					})
				}
			]
		},
		plugins: [plugin]
	};
};

exports.loadJavaScript = ({ include, exclude } = {}) => ({
	module: {
		rules: [
			{
				test: /\.js$/,
				include,
				exclude,
				use: 'babel-loader'
			}
		]
	}
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
	module: {
		rules: [
			{
				test: /\.(png|jpg)$/,
				include,
				exclude,
				use: {
					loader: 'url-loader',
					options
				}
			}
		]
	}
});

exports.loadSvg = ({ include, exclude, options } = {}) => ({
	module: {
		rules: [
			{
				test: /\.svg$/,
				include,
				exclude,
				use: {
					loader: 'file-loader',
					options
				}
			}
		]
	}
});

exports.loadGoogleFonts = options => ({
	plugins: [new GoogleFontsPlugin(options)]
});

exports.generateSourceMaps = ({ type }) => ({
	devtool: type
});

const _CSSLoaders = ({ preLoaders = [], postLoaders = [], minimize = false } = {}) =>
	postLoaders
		.concat([
			{
				loader: 'css-loader',
				options: {
					importLoaders: 2,
					minimize,
					modules: true
				}
			},
			{
				loader: 'postcss-loader',
				options: {
					plugins: () => [autoprefixer]
				}
			}
		])
		.concat(preLoaders);

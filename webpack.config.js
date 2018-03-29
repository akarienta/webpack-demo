const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const parts = require('./webpack.parts');

const PATHS = {
	app: path.join(__dirname, 'src')
};

const commonConfig = merge([
	{
		plugins: [
			new HtmlWebpackPlugin({
				title: 'Webpack demo',
				minify: {
					collapseWhitespace: true
				}
			})
		]
	},
	parts.loadJavaScript({ include: PATHS.app })
]);

const productionConfig = merge([
	{
		output: {
			filename: 'bundle.[hash].js'
		}
	},
	parts.extractSCSS({
		minimize: { discardComments: { removeAll: true } },
		filename: 'styles.[hash].css'
	}),
	parts.loadImages({
		options: {
			limit: 15000,
			name: './images/image.[hash].[ext]'
		}
	}),
	parts.loadSvg({
		options: {
			name: './images/image.[hash].[ext]'
		}
	}),
	parts.loadGoogleFonts({
		fonts: [{ family: 'Gloria Hallelujah' }],
		path: 'fonts/',
		filename: 'fonts/fonts.css'
	})
]);

const developmentConfig = merge([
	{
		plugins: [
			new webpack.WatchIgnorePlugin([path.join(__dirname, 'node_modules')]),
			new WebpackNotifierPlugin(),
			new FriendlyErrorsWebpackPlugin()
		]
	},
	parts.devServer({
		host: process.env.HOST,
		port: process.env.PORT
	}),
	parts.loadSCSS({
		sourceMap: true,
		host: process.env.HOST,
		port: process.env.PORT
	}),
	parts.loadImages(),
	parts.loadSvg(),
	parts.loadGoogleFonts({
		fonts: [{ family: 'Gloria Hallelujah' }]
	})
]);

module.exports = mode => {
	if (mode === 'production') {
		return merge(commonConfig, productionConfig, { mode });
	}

	return merge(commonConfig, developmentConfig, { mode });
};

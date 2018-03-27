const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const glob = require('glob');
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
				title: 'Webpack demo'
			})
		]
	},
	parts.loadJavaScript({ include: PATHS.app })
]);

const productionConfig = merge([
	parts.extractSCSS({ minimize: { discardComments: { removeAll: true } } }),
	parts.purifyCSS({
		paths: glob.sync(`${PATHS.app}/**/*.(js|jsx)`, { nodir: true }),
		minimize: true
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
	})
]);

module.exports = mode => {
	if (mode === 'production') {
		return merge(commonConfig, productionConfig, { mode });
	}

	return merge(commonConfig, developmentConfig, { mode });
};

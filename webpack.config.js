const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const parts = require('./webpack.parts');

const commonConfig = merge([
	{
		plugins: [
			new HtmlWebpackPlugin({
				title: 'Webpack demo'
			})
		]
	}
]);

const productionConfig = merge([parts.loadSCSS()]);

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

import webpack from 'webpack';
import merge from 'webpack-merge';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';

import parts from './webpack.parts';

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
			filename: '[name].js'
		},
		optimization: {
			splitChunks: {
				chunks: 'initial'
			}
		}
	},
	parts.extractCSS({
		minimize: { discardComments: { removeAll: true } },
		filename: 'styles.css'
	}),
	parts.loadImages({
		options: {
			limit: 15000,
			name: './images/[name].[ext]'
		}
	}),
	parts.loadSvg({
		options: {
			name: './images/[name].[ext]'
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
	parts.loadCSS(),
	parts.loadImages(),
	parts.loadSvg(),
	parts.loadGoogleFonts({
		fonts: [{ family: 'Gloria Hallelujah' }]
	}),
	parts.generateSourceMaps({ type: 'source-map' })
]);

module.exports = mode => {
	process.env.BABEL_ENV = mode;

	if (mode === 'production') {
		return merge(commonConfig, productionConfig, { mode });
	}

	return merge(commonConfig, developmentConfig, { mode });
};

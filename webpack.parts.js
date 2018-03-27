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
					test: /\.scss$/,
					include,
					exclude,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								importLoaders: 2,
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
					]
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

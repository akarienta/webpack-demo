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

module.exports = {
	devServer: {
		port:'8081',
		host:'localhost',
		proxy: 'http://localhost:8080',
	},
};

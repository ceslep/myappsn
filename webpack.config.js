const webpack = require("@nativescript/webpack");

module.exports = (env,options={}) => {
	webpack.init(env);

	// Learn how to customize:
	// https://docs.nativescript.org/webpack
	webpack.resolveConfig().resolve.conditionNames = ['svelte'];
	const mode = options.mode || 'development';
	webpack.resolveConfig().mode = mode;

	
	return webpack.resolveConfig();
};
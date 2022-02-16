const baseConfig = require('./umd.base.config');
const PATH = require('./build_path');
module.exports = {
	...baseConfig,
	output: {
		...baseConfig.output,
		path: PATH.ROOT_PATH + '/lib',
	},
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
};

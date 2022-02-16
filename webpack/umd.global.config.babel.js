const baseConfig = require('./umd.base.config.babel.js');
const PATH = require('./build_path');
module.exports = {
	...baseConfig,
	entry: PATH.ROOT_PATH + 'src/js/component/index.global.ts',
	output: {
		...baseConfig.output,
		path: PATH.ROOT_PATH + '/lib',
	},
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
};

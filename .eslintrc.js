module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	plugins: ['import', 'prettier'],
	extends: ['recommended', 'prettier'],
	rules: {
		'import/prefer-default-export': 'off',
		'import/extensions': 'off',
		'import/order': ['warn', { alphabetize: { order: 'asc' } }],
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: [
					'**/*.test.jsx',
					'**/*.test.ts',
					'**/*.test.tsx',
					'**/*.test.js',
					'**/*.spec.jsx',
					'**/*.spec.ts',
					'**/*.spec.tsx',
					'**/*.spec.js',
					'**/*.stories.jsx',
					'**/*.stories.ts',
					'**/*.stories.tsx',
					'**/*.stories.js',
				],
			},
		],

		'no-unused-expressions': [
			'error',
			{ allowShortCircuit: true, allowTernary: true },
		],
		'no-plusplus': 'off',
		'no-restricted-syntax': 'off',
		'no-console': 'warn',
		'no-underscore-dangle': 'off',
		'no-case-declarations': 'off',
		'no-param-reassign': 'off',
		'no-use-before-define': 'off',
		radix: 'off',
		'consistent-return': 'off',
		'guard-for-in': 'off',
	},
}

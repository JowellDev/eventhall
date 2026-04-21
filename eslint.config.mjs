import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import nextPlugin from '@next/eslint-plugin-next'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals'

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
	js.configs.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		plugins: {
			'@typescript-eslint': tsPlugin,
			'react-hooks': reactHooksPlugin,
			'@next/next': nextPlugin,
		},
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: { jsx: true },
			},
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			...reactHooksPlugin.configs.recommended.rules,
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs['core-web-vitals'].rules,
			'no-undef': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_' },
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'prefer-const': 'error',
		},
	},
	prettierConfig,
	{
		ignores: ['.next/', 'node_modules/', 'dist/'],
	},
]

export default eslintConfig

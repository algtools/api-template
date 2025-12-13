import js from "@eslint/js";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default [
	{
		ignores: [
			"coverage/**",
			"dist/**",
			".wrangler/**",
			"node_modules/**",
			"worker-configuration.d.ts",
		],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	eslintConfigPrettier,
	{
		files: ["**/*.{ts,mts,cts}"],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
			},
			globals: {
				...globals.node,
			},
		},
		rules: {
			"no-console": "off",
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
			],
		},
	},
	{
		files: ["**/*.cjs"],
		languageOptions: {
			sourceType: "commonjs",
			globals: {
				...globals.node,
				...globals.commonjs,
			},
		},
	},
	{
		files: ["**/*.d.ts"],
		rules: {
			"@typescript-eslint/no-empty-object-type": "off",
		},
	},
	{
		files: ["tests/**/*.{ts,mts,cts}"],
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
		},
	},
];

import javascriptEslint from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import * as typescriptEslintParserForExtraFiles from 'typescript-eslint-parser-for-extra-files';
import svelteEslintParser from 'svelte-eslint-parser';
import svelteEslintPlugin from 'eslint-plugin-svelte';
import svelteConfig from './svelte.config.js';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';

export default typescriptEslint.config(
    globalIgnores(['eslint.config.mjs', 'svelte.config.js', 'vite.config.ts']),
    {
        extends: [
            javascriptEslint.configs.recommended,
            typescriptEslint.configs.recommendedTypeChecked,
            svelteEslintPlugin.configs['flat/recommended'],
        ],
        files: [
            '**/*.{js,mjs,ts,svelte}',
        ],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType:  'module',
            globals:     {
                ...globals.browser,
                ...globals.es2020,
            },
            parser:        typescriptEslintParserForExtraFiles,
            parserOptions: {
                project: [
                    'tsconfig.app.json',
                ],
                extraFileExtensions: ['.svelte'],
            },
        },
        plugins: {
            '@typescript-eslint': typescriptEslint.plugin,
        },
    },
    {
        files: [
            '**/*.svelte',
            '**/*.svelte.ts',
        ],
        languageOptions: {
            parser:        svelteEslintParser,
            // Parse the `<script>` in `.svelte` as TypeScript by adding the following configuration.
            parserOptions: {
                parser:              typescriptEslintParserForExtraFiles,
                extraFileExtensions: ['.svelte'],
                svelteConfig:        svelteConfig,
            },
        },
    },
);

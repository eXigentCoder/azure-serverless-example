'use strict';

module.exports = {
    env: {
        browser: false,
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'script',
        ecmaFeatures: {
            globalReturn: true,
            impliedStrict: false,
            jsx: false,
        },
    },
    plugins: ['node', 'prettier', 'jest', 'jsdoc', 'json', 'security'],
    extends: [
        'eslint:recommended',
        'plugin:node/recommended',
        'plugin:prettier/recommended',
        'plugin:jest/recommended',
        //'plugin:jsdoc/recommended',
        'plugin:json/recommended',
        'plugin:security/recommended',
    ],
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        'linebreak-style': ['error', 'unix'],
        quotes: ['warn', 'single', { avoidEscape: true }],
        semi: ['error', 'always'],
        'no-console': ['off'],
        'node/exports-style': ['error', 'module.exports'],
        strict: ['error', 'global'],
        'no-shadow': ['error'],
        'require-atomic-updates': ['off'],
    },
    overrides: [
        {
            files: ['**/*.test.js', '**/test-init.js'],
            env: {
                mocha: true,
            },
            rules: {
                'node/no-unpublished-require': ['off'],
                'node/no-extraneous-require': ['off'],
            },
            globals: {
                chai: true,
                expect: true,
                assert: true,
                should: true,
            },
        },
        {
            files: ['**/*.ts'],
            parser: '@typescript-eslint/parser',
        },
    ],
};

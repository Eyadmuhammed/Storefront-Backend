module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
        'prettier/prettier': 2, // mean error
        quotes: ['error', 'single'],
        //'no-console': 1, // meaning warning
        // 'no-var': 1,
        'prefer-const': 'error'
    }
}

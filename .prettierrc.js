module.exports = {
    "printWidth": 100,
    "tabWidth": 4,
    "useTabs": false,
    "semi": true,
    "singleQuote": true,
    "trailingComma": "es5",
    "bracketSpacing": true,
    "jsxBracketSameLine": false,
    "arrowParens": "avoid",
    "overrides": [
        {
            "files": "*.md",
            "options": {
                "tabWidth": 2,
                "printWidth": 9999
            }
        },
        {
            "files": ["package.json", "package-lock.json"],
            "options": {
                "tabWidth": 2,
                "printWidth": 9999
            }
        },
        {
            "files": "*.yml",
            "options": {
                "tabWidth": 2,
                "printWidth": 9999
            }
        }
    ]
}
;

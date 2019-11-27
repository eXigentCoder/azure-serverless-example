module.exports = {
	runner: `groups`,
	transform: {
		"^.+\\.(t|j)sx?$": `ts-jest`,
	},
	testRegex: `(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$`,
	moduleFileExtensions: [`ts`, `tsx`, `js`, `jsx`, `json`, `node`],
	testEnvironment: `node`,
	coverageThreshold: {
		global: {
			statements: 40,
			branches: 80,
			functions: 25,
			lines: 40,
		},
	},
};

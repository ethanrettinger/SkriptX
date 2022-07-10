import chalk from "chalk";

export function SyntaxError(text) {
	return `${chalk.bgRed.white.bold(' SYNTAX ERROR ')} ${text}`
}

export function TypeError(text) {
	return `${chalk.bgRed.white.bold(' TYPE ERROR ')} ${text}`;
}

export function ParseError(text) {
	return `${chalk.bgRed.white.bold(' PARSER ERROR ')} ${text}`
}
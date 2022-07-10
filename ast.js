import {
	error,
	success,
	warning,
	status,
	time,
	getMicSecTime
} from "./index.js"
import chalk from "chalk";

export default function ast(program) {
	console.log(status("Generating abstract syntax tree of tokens"));
	// program memory, such as variables & functions
	let memory = {};
	for(let i = 0; i < program.length; i++) {
		let token = program[i];

		if(token.tokenType === 'Type') {
			// if next token is func,
			// add func to memory stack
			
			if(program[i+1].tokenType === 'IdentifierFunction') {

				memory[program[i+1].value] = {
					obj: 'FUNCTION',
					type: program[i+1].returnType,
					name: token.value,
					scope: token.scope,
					block: []
				};
			} else {
				if(program[i+2].value === '=') {
					var tempValue = program[i+3].value
				} else {
					console.log(SyntaxError("Invalid assignment operator for variable."));
				}
				memory[token.scope].block.push({
					obj: 'VARIABLE',
					type: token.type,
					name: program[i+1].value,
					scope: token.scope,
					value: tempValue.replaceAll('"','')
				});
			}
		}
	}
	console.log(success(`Program generated in ${chalk.greenBright((getMicSecTime() - time) / 1000) + 'ms'}`));
	console.log(JSON.stringify(memory, null, 2));
}
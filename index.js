import fs from "fs";
import path from "path";
import chalk from "chalk";
import tokenize from "./tokenizer.js";
import ast from "./ast.js";

export const error     = text => `${chalk.bgRed.bold(' ERROR ')} ${text}`;
export const success   = text => `${chalk.bgGreen.bold(' SUCCESS ')} ${text}`;
export const warning   = text => `${chalk.bgYellow.bold(' WARNING ')} ${text}`;
export const status    = text => `${chalk.bgHex('#0777FF').bold.white(' STATUS ')} ${text}`;
export let time;

export function getMicSecTime() {
  var hrTime = process.hrtime();
  return hrTime[0] * 1000000 + parseInt(hrTime[1] / 1000);
}

async function main() {
	time = getMicSecTime()
    if(process.argv.length < 3 || process.argv.length > 3) {
        console.log(error("Too many input arguments"));
        process.exit(0);
    }

    if(!fs.existsSync(process.argv[2])) {
        console.log(error("Invalid input file."));
        process.exit(0);
    }

    if(path.extname(process.argv[2]).toLowerCase() !== '.skx') {
        console.log(error("Input file must be of type SKX"));
        process.exit(0);
    }

    console.log(status("Beginning transpilation process"))
	
	let file = await fs.promises.readFile(process.argv[2], 'utf8');
	
	let tokens = tokenize(file);
	console.log(success("Tokenization complete"))
	ast(tokens);
    return;
}

await main();
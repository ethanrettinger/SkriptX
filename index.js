import fs from "fs";
import path from "path";
import chalk from "chalk";
import tokenize from "./tokenizer.js";

const error     = text => `${chalk.bgRed.bold(' ERROR ')} ${text}`;
const success   = text => `${chalk.bgGreen.bold(' SUCCESS ')} ${text}`;
const warning   = text => `${chalk.bgYellow.bold(' WARNING ')} ${text}`;
const status    = text => `${chalk.bgHex('#0777FF').bold.white(' STATUS ')} ${text}`;

async function main() {

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
	
	console.log(tokenize(file))
    // TODO: Write the transpiler, lol.
    console.log(success("Tokenization complete"))
    return;
}

await main();
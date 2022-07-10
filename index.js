import { fs } from "fs";
import { path } from "path";
import { chalk } from "chalk";

const error     = text => `${chalk.bgRed.bold(' ERROR ')}\t${text}`;
const success   = text => `${chalk.bgGreen.bold(' SUCCESS ')}\t${text}`;
const warning   = text => `${chalk.bgYellow.bold(' WARNING ')}\t${text}`;
const status    = text => `${chalk.bgHex('#0777FF').bold.white(' STATUS ')}\t${text}`;

async function main() {

    if(process.argv.length < 2 || process.argv.length > 2) {
        console.log(error("Too many input arguments"));
        process.exit(0);
    }

    if(!fs.existsSync(process.argv[0])) {
        console.log(error("Invalid input file."));
        process.exit(0);
    }

    if(path.extname(process.argv[0]).toLowerCase() !== '.sk') {
        console.log(error("Input file must be of type SK"));
        process.exit(0);
    }

    console.log(status("Beginning transpilation process"))

    // TODO: Write the transpiler, lol.
    
    return;
}

await main();
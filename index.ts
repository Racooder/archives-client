import pug from 'pug';
import compilationData from './compilationData';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

const ROOT_DIR = "src/";
const OUTPUT_DIR = "dist/";

type CompilationData = {
    file: string,
    outFile: string,
    data: any
}

function compilePug(data: CompilationData) {
    const compiledFunction = pug.compileFile(ROOT_DIR + data.file);
    const compiledFile = compiledFunction(data.data);
    writeFileSync(OUTPUT_DIR + data.outFile, compiledFile);
}

function main() {
    if (!existsSync(OUTPUT_DIR)) {
        mkdirSync(OUTPUT_DIR);
    }

    compilationData.forEach((data) => {
        compilePug(data);
    });
}

main();

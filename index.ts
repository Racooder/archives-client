import pug from 'pug';
import { existsSync, mkdirSync, writeFileSync, cpSync, rmSync, readdirSync } from 'fs';

const ROOT_DIR = "src/";
const OUTPUT_DIR = "dist/";
const LAYOUT_DIR = "layouts";

function copyFile(file) {
}

function compilePug(file: string) {
    const compiledFunction = pug.compileFile(ROOT_DIR + file);
    const compiledFile = compiledFunction({});
    const newFilename = file.replace(".pug", ".html");
    writeFileSync(OUTPUT_DIR + newFilename, compiledFile);
}

function main() {
    if (existsSync(OUTPUT_DIR)) {
        rmSync(OUTPUT_DIR, { recursive: true });
    }
    mkdirSync(OUTPUT_DIR);

    const allFiles = readdirSync(ROOT_DIR)
    const pugFiles = allFiles.filter((file) => file.endsWith(".pug"));
    const copyFiles = allFiles.filter((file) => !file.endsWith(".pug") && file !== LAYOUT_DIR);

    copyFiles.forEach((file) => {
        cpSync(ROOT_DIR + file, OUTPUT_DIR + file, { recursive: true });
    });

    pugFiles.forEach((file) => {
        compilePug(file);
    });
}

main();

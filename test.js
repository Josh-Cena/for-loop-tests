import FS from "node:fs/promises";
import { $ } from "bun";

const baselineFiles = await FS.readdir("baseline");
baselineFiles.sort();
const baselineRes = {};
for (const file of baselineFiles) {
  const res = await $`bun baseline/${file}`.quiet();
  baselineRes[file] = res.stdout.toString();
}

const dirs = await FS.readdir(".");
const outputDirs = dirs.filter((dir) => dir.startsWith("output-"));
for (const dir of outputDirs) {
  const compiler = dir.replace("output-", "");
  const compilerRes = {};
  for (const file of baselineFiles) {
    try {
      compilerRes[file] = (await $`bun ${dir}/${file}`.quiet()).stdout.toString();
    } catch (error) {
      compilerRes[file] = `Threw error: ${error.stderr.toString().replaceAll(import.meta.dir, '')}`;
    }
  }
  for (const file of baselineFiles) {
    if (baselineRes[file] !== compilerRes[file]) {
      console.log(`\n${compiler} failed to compile ${file}:\n${await FS.readFile(`baseline/${file}`, "utf-8")}`);
      console.log(`baseline: ${JSON.stringify(baselineRes[file])}`);
      console.log(`${compiler}: ${JSON.stringify(compilerRes[file])}`);
    }
  }
}

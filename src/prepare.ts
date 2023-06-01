import fs from "fs";
import { resolve } from "path";
import config from "./config";
import { genNvmInstallSh } from "./template";
import { getNodeVersion, writeFile } from "./util";
import shelljs from 'shelljs'

function main() {
  const sh = config
    .filter((x) => !x.disabled && x.nodeV !== getNodeVersion())
    .map((x) => genNvmInstallSh(x.nodeV))
    .join("\n");

  // const dir = resolve(__dirname, "../temp");
  // if (!fs.existsSync(dir)) {
  //   fs.mkdirSync(dir);
  // }
  // writeFile(resolve(dir, './prepare.sh'), sh, false)
  
  shelljs.exec(sh)
}

main();

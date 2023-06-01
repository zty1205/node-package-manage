import fs from "fs";
import path from "path";
import shell from "shelljs";
import minimist from "minimist";
import log from "./util/log";
import {
  checkNVM,
  writeFile,
  deleteFolderRecursive,
  checkNodeV,
  genPackageDirName,
} from "./util/index";
import { genPackageFile, genShFile } from "./template";
import config from "./config/index";
import { ConfigItem } from "./types";

const CMD = {
  NO_RUN: "no_run",
  CLEAR: "clear",
};

function filterConfig(config: ConfigItem[], args: string[] = []) {

  if (!args || !args.length) return config;
  const map = new Map();
  args.forEach((ag) => {
    map.set(ag, true);
  });
  return config.filter((item) => {

    // 某个包管理器下 全部生成
    if (map.has(item.name)) return true;

    // 固定某个包的某个版本
    if (
      map.has(`${item.name}@${item.version[0]}`) ||
      map.has(`${item.name}@${item.version}`)
    )
      return true;

    return false;
  });
}

function step(item: ConfigItem, noShRun: boolean) {
  const {
    name,
    version,
    nodeV,
    packageCtor = genPackageFile,
    shCtor = genShFile,
    onBeforeShStart,
    onAfterShEnd,
    noRun,
    disabled,
    notes
  } = item;

  const dirName = genPackageDirName(name, version)

  log.desc(`开始生成 ${dirName} 文件夹`);

  if (disabled) {
    log.desc(`暂无法生成：${notes}`);
    return
  }


  const dir = path.resolve(__dirname, `../${dirName}`);
  if (fs.existsSync(dir)) {
    deleteFolderRecursive(dir, false);
  } else {
    fs.mkdirSync(dir);
  }

  writeFile(
    path.resolve(dir, "./package.json"),
    packageCtor(name, version, nodeV)
  );

  const sh = shCtor(name, version, nodeV);
  writeFile(path.resolve(dir, "./index.sh"), sh, false);

  if (noShRun || noRun) return;

  if (onBeforeShStart) {
    log.hooks("onBeforeShStart");
    onBeforeShStart(sh, dir, item);
  }

  log.desc(`执行sh脚本 ${dirName} 开始安装依赖`);

  shell.cd(`./${dirName}`);

  shell.exec(sh);

  log.desc(`${dirName} 生成结束`);

  log.desc("");

  shell.cd("../");

  if (onAfterShEnd) {
    log.hooks("onBeforeShStart");
    onAfterShEnd(sh, dir, item);
  }
}

function main() {
  if (!checkNVM() || !checkNodeV()) return;

  const args = minimist(process.argv.slice(2))._;

  const pck = args.filter((cmd) => cmd !== CMD.NO_RUN && cmd !== CMD.CLEAR);

  const noRun = args.some((x) => x === CMD.NO_RUN);
  const clear = args.some((x) => x === CMD.CLEAR);

  const configList = filterConfig(config, pck);

  log.info("程序开始运行");

  if (clear) {
    // 清除包管理器缓存
    try {
      shell.exec("npm cache verify");
      shell.exec("yarn cache clean");
      shell.exec("pnpm store prune");

      log.info("缓存清理完毕");
    } catch (err) {
      console.warn(err);
    }
  }

  for (let i = 0; i < configList.length; i++) {
    setTimeout(() => {
      step(configList[i], noRun);
    }, (i - 1) * 100)
  }

  log.info("程序运行结束");
}

main();

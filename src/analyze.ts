import fs from "fs";
import { resolve } from "path";
import config from "./config";
import { genPackageDirName, writeFile } from "./util";
import { ConfigItem, TreeNode } from "./types";
import log from "./util/log";
import { analyzeModules, analyzePnpm, analyzeYarn, formatTreeToText } from "./util/analyser";


function step(item: ConfigItem) {
  const { name, version } = item;
  const v = version[0];

  const dirName = genPackageDirName(name, version)

  const dir = resolve(__dirname, `../${dirName}`);
  if (!fs.existsSync(dir)) {
    return;
  }

  log.info(`分析${dirName}中...`);

  const root: TreeNode = {
    name: "root",
    version: "",
    depth: -1,
    children: [],
  };

  // 添加一个node_module节点
  analyzeModules(dir, root, 1);

 
  if(name === 'pnpm') {
     /** pnpm 的.pnpm文件夹兼容 */  
    analyzePnpm(dir, root, 1)
  } else if (name === 'yarn') {
    /** yarn2,3 的.yarn文件夹兼容 */
    if (root.children.length === 0) {
      analyzeYarn(dir, root, 1)
    }
  }

  


  
  log.desc(`开始生成依赖分析JSON`);
  writeFile(resolve(dir, `./dep.json`), JSON.stringify(root), true)

  log.desc(`开始生成依赖分析文本图`);
  const text = formatTreeToText(root)
  writeFile(resolve(dir, `./dep.text`), text, false)

  log.info(`${dirName}分析结束`);
}

function main() {
  const configList = config.filter((x) => !x.disabled);

  if (configList.length === 0) return;

  log.desc(`开始分析项目`);

  for (let i = 0; i < configList.length; i++) {
    step(configList[i]);
  }

  log.desc(`分析结束`);
}

main();

import { ConfigItem } from "../types";
import { genOldPnpmShFile, genNpmShFile } from "../template";
import { genEmptyYarnLock, getNodeVersion } from "../util";
import { NODE_CORE_PACK_VERSION } from "../constant";

const nodeVersion = getNodeVersion();

const config: Array<ConfigItem> = [
  // {
  //   name: 'npm',
  //   version: '1.2.14',
  //   nodeV: '0.10.0',
  //   disabled: true,
  //   notes: '太老了以至于安装不下来',
  //   shCtor: genNpmShFile,
  // },
  // {
  //   name: 'npm',
  //   version: '2.14.2',
  //   nodeV: "4.0.0",
  //   shCtor: genNpmShFile
  // },
  // {
  //   name: 'npm',
  //   version: '3.10.8',
  //   nodeV: "7.0.0",
  //   shCtor: genNpmShFile,
  // },
  // {
  //   name: "npm",
  //   version: "4.1.2",
  //   nodeV: "7.7.0",
  //   shCtor: genNpmShFile,
  // },
  // {
  //   name: 'npm',
  //   version: '5.6.0',
  //   nodeV: "10.0.0",
  //   shCtor: genNpmShFile
  // },
  // {
  //   name: 'npm',
  //   version: "6.4.1",
  //   nodeV: '11.0.0',
  //   shCtor: genNpmShFile
  // },
  // {
  //   name: 'npm',
  //   version: "7.0.1",
  //   nodeV: NODE_CORE_PACK_VERSION,
  // },
  // {
  //   name: 'npm',
  //   version: "8.1.0",
  //   nodeV: NODE_CORE_PACK_VERSION,
  // },
  // {
  //   name: 'npm',
  //   version: "9.5.1",
  //   nodeV: NODE_CORE_PACK_VERSION,
  // },
  // {
  //   name: "pnpm",
  //   version: "1.0.1",
  //   nodeV: "4.0.0",
  //   shCtor: genOldPnpmShFile,
  // },
  // {
  //   name: "pnpm",
  //   version: "2.0.1",
  //   nodeV: "7.1.0",
  //   shCtor: genOldPnpmShFile,
  // },
  // {
  //   name: "pnpm",
  //   version: "3.0.1",
  //   nodeV: "10.0.0",
  //   shCtor: genOldPnpmShFile,
  // },
  // {
  //   name: "pnpm",
  //   version: "4.0.1",
  //   nodeV: nodeVersion
  // },
  // {
  //   name: "pnpm",
  //   version: '5.0.1',
  //   nodeV: nodeVersion,
  // },
  {
    name: "pnpm",
    version: '6.0.1',
    nodeV: nodeVersion,
  },
  {
    name: "pnpm",
    version: '7.0.1',
    nodeV: nodeVersion,
  },
  {
    name: "pnpm",
    version: '8.1.0',
    nodeV: nodeVersion,
  },
  // {
  //   name: "yarn",
  //   version: "1.22.19",
  //   nodeV: nodeVersion,
  // },
  // {
  //   name: "yarn",
  //   version: "2.4.3",
  //   nodeV: nodeVersion,
  //   onBeforeShStart(sh, dir) {
  //     genEmptyYarnLock(dir)
  //   },
  // },
  // {
  //   name: "yarn",
  //   version: "3.2.0",
  //   nodeV: nodeVersion,
  //   onBeforeShStart(sh, dir) {
  //     genEmptyYarnLock(dir)
  //   },
  // },
];

export default config;

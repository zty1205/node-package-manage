import { writeFileSync, existsSync, readdirSync, lstatSync, unlinkSync, rmdirSync } from 'fs'
import { exec } from 'shelljs'
import log from "./log";
import { format as _format } from 'prettier'
import { resolve, join } from 'path'
import { NODE_CORE_PACK_VERSION } from '../constant';


export function getNodeVersion() {
  return (process.version || exec('node -v', { silent: true }).stdout).replace(/[\r|\n|v]/g, '')
}

export function genNvmSH(sh: string) {
  return `
. ~/.nvm/nvm.sh
${sh}
`
}

export function checkNVM(): boolean {
  const res = exec(genNvmSH('nvm -v'), { silent: true })
  if (res.stdout) return true
  
  return false
}

export function checkNodeV(): boolean {
  const flag = compareVersion(getNodeVersion(), NODE_CORE_PACK_VERSION)
  if (flag < 0) {
    log.error(`请使用>= ${NODE_CORE_PACK_VERSION} 的node环境`)
    return false
  }
  return true
}

export function compareVersion(version1: string, version2: string): 1 | 0 | -1 {
  let v1 = version1.split('.')
  let v2 = version2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}

export function genEmptyYarnLock(dir: string) {
  writeFile(resolve(dir, './yarn.lock'), '', false)
}

export function writeFile(path: string, content: string, format = true) {
  const data = format ? _format(content, { parser: 'json' }) : content;
  return writeFileSync(path, data, { encoding: 'utf-8' })
}

export function deleteFolderRecursive(folderPath: string, rmSelf = false) {
  if (existsSync(folderPath)) {
    readdirSync(folderPath).forEach((file) => {
      const curPath = join(folderPath, file);
      if (lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        unlinkSync(curPath);
      }
    });
    rmSelf && rmdirSync(folderPath);
  }
}

export function genPackageDirName(name: string, version: string) {
  const v1 = version.replace('v', '').split('.')[0]
  return `${name}${v1}`
}
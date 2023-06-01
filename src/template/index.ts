import { NODE_CORE_PACK_VERSION } from "../constant";
import { compareVersion, getNodeVersion, genNvmSH } from "../util";

export function genPackageFile(name: string, version: string, nodeV: string): string {
  const pre = `
  {
    "name": "${name}${version[0]}",
    "version": "1.0.0",
    "description": "${name}@${version} node@${nodeV} test",
    "main": "index.js",
  `

  const after = `
    "scripts": {
      "test": ""
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "babel": "4.0.1",
      "jquery": "3.7.0",
      "rollup": "0.20.0"
    },
    "repository": {}
  }
  `

  const middle = `"packageManager": "${name}@${version}",`;

  return compareVersion(nodeV, NODE_CORE_PACK_VERSION) > -1 ? pre + middle + after : pre + after
}

export function genShFile(name: string, version: string, nodeV: string): string {
  const curNodeV = getNodeVersion()
  const corepackSh =  genNvmSH('nvm use ' + curNodeV) + `
corepack enable
corepack prepare ${name}@${version} --activate
corepack ${name} install
`
  if (nodeV && nodeV !== curNodeV) {
    return genNvmSH('nvm install ' + nodeV) + corepackSh
  }
  return corepackSh
}

export function genOldPnpmShFile(name: string, version: string, nodeV: string): string {
  const curNodeV = getNodeVersion()

  return genNvmSH('nvm use ' + curNodeV) + '\ncorepack disable\n' + genNvmSH(`nvm install v${nodeV}`) + `
npm install -g ${name}@${version}
pnpm install
`
}

export function genNpmShFile(name: string, version: string, nodeV: string): string {
  const curNodeV = getNodeVersion()

  return genNvmSH('nvm use ' + curNodeV) + '\ncorepack disable\n' + genNvmSH(`nvm install v${nodeV}`) + `
npm install
`
}

export function genNvmInstallSh(nodeV: string) {
  const curNodeV = getNodeVersion();
  return genNvmSH('nvm use ' + curNodeV) + genNvmSH(`nvm install v${nodeV}`)
}
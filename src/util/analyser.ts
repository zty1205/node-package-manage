import fs from 'fs'
import { resolve, join } from 'path'
import { TreeNode } from '../types';

const IGNORE_FILES = new Map([
  [".bin", 1],
  ["bin", 1],
  ["dist", 1],
  ["src", 1],
  [".yarn", 1],
  [".pnpm", 1],
]);

export function analyzeModules(dir: string, tree: TreeNode, depth: number) {
  if (depth > 3) return;

  const modules = resolve(dir, "./node_modules");
  if (!fs.existsSync(modules)) {
    return;
  }

  const files = fs.readdirSync(modules);
  if (!files || !files.length) return;


  files.forEach((file) => {

    if (IGNORE_FILES.has(file)) return

    const filePath = join(modules, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile()) return;

    const node: TreeNode = {
      name: file,
      version: "unknown",
      children: [],
      depth: depth,
    };
    try {
      const packageJson = fs.readFileSync(join(filePath, "package.json"), {
        encoding: "utf-8",
      });
      const mt = packageJson.match(/"version": "(.+)"/);
      if (mt && mt[1]) {
        node.version = mt[1];
      }
      tree.children.push(node);
      analyzeModules(filePath, node, depth + 1);
    } catch (err) {
      console.warn(err);
      return;
    }
  });
}

function getPrefix(depth: number, idx: number, childLength: number): string {
  if (depth === 0) return 'node_modules'
  if (depth === 1) {
    if (childLength > 0) return '├─┬ '
    return '├── '
  }
  if (depth === 2) {
    if (childLength > 0) return '│ ├─┬ '
    if (idx === childLength - 1) return '│ └── '
    return '│ ├── '
  }
  if (depth === 3) {
    if (childLength > 0) return '│ │ └─┬ '
    if (idx === childLength - 1) return '│ │ └── '
    return '│ │ ├── '
  }
  return ''
}

function format(node: TreeNode, idx: number, arr: string[]) {
  const name = node.depth === 0 ? node.name : getPrefix(node.depth, idx, node.children.length) + `${node.name}@${node.version}`
  arr.push(name)
  if (!node.children || !node.children.length) return
  for (let i = 0; i < node.children.length; i++) {
    format(node.children[i], i, arr)
  }
}

export function formatTreeToText(tree: TreeNode) {
  const strArr: string[] = []
  format(tree, 0, strArr)
  return strArr.join('\n')
}

export function analyzePnpm(dir: string, tree: TreeNode, depth: number) {

}

export function analyzeYarn(dir: string, tree: TreeNode, depth: number) {
}
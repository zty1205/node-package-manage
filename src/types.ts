/**
 * @param nodeV 需要在 nvm ls-remote 中存在的版本
 */
export interface ConfigItem {
  name: string;
  version: string;
  nodeV: string; 
  noRun?: boolean; // 是否运行sh脚本
  disabled?: boolean; // 是否忽略该item
  notes?: string;
  packageCtor?: (name: string, version: string, nodeV: string) => string;
  shCtor?: (name: string, version: string, nodeV: string) => string;
  onBeforeShStart?: (sh: string, dir: string, item: ConfigItem) => void;
  onAfterShEnd?: (sh: string, dir: string, item: ConfigItem) => void;
}

export interface TreeNode {
  name: string;
  version: string;
  children: TreeNode[];
  depth: number;
}
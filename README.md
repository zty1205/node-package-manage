# node-package-manage
npm, yarn, pnpm, 仅学习使用

# 如何使用

## 使用前须知

- 必须安装nvm
- node版本  >= 18.16.0


### 注意

- 下载中fsevents可能会因node版本问题而出错，但不是关键，可忽略
- 如果遇到下载依赖慢，或失败可以尝试从失败的地方重新开始运行 （常见于npm, pnpm低版本包管理器， 如果使用多线程应该可以解决）
- 分析命令只分析下载依赖后的文件夹结构，如果要分析依赖可直接分析lock文件

## 命令解释


- gen: 清除包管理器缓存并执行脚本
- gen:file: 执行脚本但只生成文件，不执行安装依赖
- gen:npm: 执行脚本但只会处理npm相关
- gen:yarn: 执行脚本但只会处理yarn相关
- gen:pnpm: 执行脚本但只会处理pnpm相关
- dev: 同gen:file命令
- build: 同gen命令
- pre: 预先使用nvm下载所需要的node版本
- analyze: 分析生成的项目的依赖结构到对应的文件夹下
- all: 先build在analyze


###  某个包的某几个版本生成 

```sh
npm run gen pnpm@1 npm@2
```




## 原理

node >= 18.16.0 的版本提供了 corepack 特性 可以用于切换包管理器，所以需要使用时，node版本需要满足要求。

但在包管理器低版本时，会存在不兼容的情况，这个时候就不能使用该特性，所以必须切换node版本和包管理器版本。同时下载会有点慢 因为需要安装相应版本的管理器（低版本的pnpm）

### 耗时

- 由于无法真正模拟以前的环境，所以暂无法统计install的耗时。

- node7.0.0下的pnpm和npm会下载很慢，运行时建议单独



## 使用依赖

生成的项目内使用的依赖，下图为嵌套化展示

```sh
node_modules
├── jquery@3.7.0 # 普通包
└── rollup@0.20.0
    └── source-map-support@0.3.3
        └── source-map@0.1.32
└── babel@4.0.1
    └── source-map@0.1.43
    └── source-map-support@0.2.9
        └── source-map@0.1.32
```



## 只做记录

- node v0.10.0 (npm v1.2.14)
- node v0.11.1 (npm v1.2.18)
- node v4.0.0 (npm 2.14.2)
- node v7.0.0 (npm 3.0.18)
- node v7.7.0 (npm v4.1.2)
- node v8.0.0 (npm v5.0.0)
- node v10.0.0 (npm 5.6.0)
- node v11.0.0 (npm v6.4.1)
- node v18.16.0 (npm 9.5.1)

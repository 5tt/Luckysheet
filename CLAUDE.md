# CLAUDE.md

此文件为 Claude Code (claude.ai/code) 提供在此代码库中工作的指导。

## 项目概览

Luckysheet 是一个类似 Excel 的在线电子表格应用，使用原生 JavaScript 构建。**重要提示：此项目已停止维护，官方推荐使用 [Univer](https://github.com/dream-num/univer) 作为替代方案。**

## 核心架构

- **入口文件**: `src/index.js` - 主模块导出，负责初始化
- **核心逻辑**: `src/core.js` - 应用初始化和主要 API
- **状态管理**: `src/store/index.js` - 全局状态容器（Store 单例对象）
- **功能模块**: `src/controllers/` - 功能控制器（工作表管理、键盘事件、格式化等）
- **工具函数**: `src/global/` - 核心工具函数（数据处理、渲染、公式计算）
- **公式引擎**: `src/function/` - 公式解析和计算引擎
- **API方法**: `src/methods/` - 公共 API 方法（数据获取/设置）

## 开发命令

### 环境准备
```bash
npm install           # 安装项目依赖
npm install gulp -g   # 全局安装 Gulp（如未安装）
```

### 开发运行
```bash
npm run dev          # 启动开发服务器，支持热重载
npm run build        # 生产环境构建，输出到 dist/
npm run docs:dev     # 启动文档开发服务器（localhost:8080）
npm run docs:build   # 构建静态文档站点
```

### 代码规范
```bash
npm run prettier     # 检查代码格式规范
npm run prettier:fix # 自动修复代码格式问题
```

## 构建系统

使用 Gulp 4 构建系统，主要流程：
- **esbuild**: 快速打包（`src/index.js` → `dist/luckysheet.umd.js`）
- **Rollup**: 生产环境额外生成 ES 模块
- **资源处理**: CSS合并压缩、静态资源复制
- **开发服务器**: Browser-sync 提供热重载和代理支持

## 目录结构

```
src/                    # 源代码目录
├── controllers/        # 功能控制器
│   ├── sheetmanage.js  # 工作表管理
│   ├── handler.js      # 事件处理器
│   ├── keyboard.js     # 键盘事件
│   └── ...
├── global/            # 全局工具函数
│   ├── getdata.js     # 数据获取
│   ├── setdata.js     # 数据设置
│   └── refresh.js     # 渲染刷新
├── function/          # 公式引擎
│   ├── functionlist.js # 函数列表
│   └── luckysheet_function.js # 公式实现
├── methods/           # 公共API
├── store/             # 全局状态管理
├── locale/            # 国际化（zh/en/es）
├── plugins/           # 第三方插件
├── expendPlugins/     # 扩展插件
└── demoData/          # 示例数据
```

## 技术栈

- **jQuery 2.2.4** - DOM操作和事件处理
- **Canvas API** - 电子表格网格渲染
- **ES6+** - 现代JavaScript语法，Babel转译
- **WebSocket** - 实时协作编辑
- **LocalStorage** - 本地数据存储
- **第三方库**: flatpickr（日期）、pako（压缩）、numeral（数字格式化）

## 开发要点

### 状态管理
- 所有状态通过 `Store` 单例管理，位于 `src/store/index.js`
- 重要状态：当前工作表、选区、数据、配置等

### 数据流
1. 用户操作 → 事件控制器（controllers/）
2. 数据更新 → Store 状态变更
3. 渲染触发 → global/refresh.js 重绘画布

### 公式系统
- 公式解析在 `src/function/` 目录
- 支持400+ Excel函数
- 国际化支持（中英文函数名）

### 插件机制
- 支持外部插件扩展（expendPlugins/）
- 内置图表、导出、打印等插件

## 浏览器兼容性

- **支持**: Chrome 58+、Firefox、Safari、Edge
- **兼容**: IE 11+（通过 Babel polyfill）
- **移动**: iOS Safari 10+、Android Chrome 58+
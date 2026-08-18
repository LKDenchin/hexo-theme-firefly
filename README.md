# Firefly (Hexo Theme)

[English](README.en.md) | 中文

Firefly 是一款基于 [Hexo](https://hexo.io/) 博客框架的个人博客主题，从 [Astro 版 Firefly](https://github.com/CuteLeaf/Firefly) 迁移而来。

它采用模块化的组件架构与 EJS 模板引擎，支持双侧边栏布局、暗黑模式切换、动态色相调节、多端响应式适配及 Spine / Live2D 看板娘集成。

## 开发者预览

Firefly 主题目前处于 _开发者预览_ 阶段，正在持续优化迭代。**配置项与组件接口可能随版本更新微调。**

## 运行与安装

### 通过 Git 安装

在 Hexo 博客根目录下克隆主题仓库至 `themes/firefly` 目录：

```sh
git clone https://github.com/LKDenchin/hexo-theme-firefly.git themes/firefly
```

### 配置启用

修改 Hexo 博客根目录下的 `_config.yml` 文件：

```yaml
theme: firefly
```

> **注意**：Hexo 根目录 `_config.yml` 中的 `theme_config:` 字段会覆盖主题主配置文件。建议将相关配置直接在 `themes/firefly/_config.yml` 中完成。

### 安装依赖插件

```sh
npm install hexo-generator-search hexo-wordcount --save
```

### 本地编译与运行

```sh
# 清除构建缓存
npx hexo clean

# 编译静态文件
npx hexo generate

# 启动本地服务 (默认地址 http://127.0.0.1:4000)
npx hexo server
```

---

## 页面路由与分页面指南

Firefly 支持多种系统页面与自定义分页面，详细路由及配置要求如下：

### 1. 系统核心页面

| 页面名称 | 路由路径 | 模板文件 | 说明 |
|:---|:---|:---|:---|
| **首页** | `/` | `layout/index.ejs` | 显示文章列表（支持 List 与 Grid 视图）及首页 Banner |
| **归档页** | `/archives/` | `layout/archive.ejs` | 按年份与月份归档展示所有文章 |
| **分类汇总页** | `/categories/` | `layout/categories.ejs` | 聚合全站文章分类 |
| **分类详情页** | `/categories/:name/` | `layout/category.ejs` | 展示指定分类下的文章列表 |
| **标签汇总页** | `/tags/` | `layout/tags.ejs` | 聚合全站标签云 |
| **标签详情页** | `/tags/:name/` | `layout/tag.ejs` | 展示指定标签下的文章列表 |
| **文章详情页** | `/:year/:month/:day/:title/` | `layout/post.ejs` | 文章正文、TOC 浮动目录、版权信息与评论区 |

### 2. 自定义功能分页面

需通过 `hexo new page <name>` 创建，并在其 Front-matter 中显式指定 `type` 或 `layout` 属性：

#### 分类页 (`/categories/`)
命令：`hexo new page categories`  
文件路径：`source/categories/index.md`  
Front-matter 配置：
```yaml
---
title: 分类
type: categories
---
```

#### 标签页 (`/tags/`)
命令：`hexo new page tags`  
文件路径：`source/tags/index.md`  
Front-matter 配置：
```yaml
---
title: 标签
type: tags
---
```

#### 关于页 (`/about/`)
命令：`hexo new page about`  
文件路径：`source/about/index.md`  
Front-matter 配置：
```yaml
---
title: 关于
layout: about
---
```

#### 动态 / 说说页 (`/dynamic/`)
由 `scripts/generators/dynamic.js` 脚本**自动生成**，无需手动执行 `hexo new page`。  
数据源：在博客根目录的 `source/_dynamics/` 目录下创建 Markdown 文件（如 `source/_dynamics/status-01.md`）：
```yaml
---
title: 今日随想
date: 2026-01-01 12:00:00
author: Firefly
location: 上海
sticky: true
images:
  - /img/cover.avif
---
动态正文内容，支持 Markdown 渲染。
```

#### 友链页 (`/friends/`)
命令：`hexo new page friends`  
文件路径：`source/friends/index.md`  
Front-matter 配置：
```yaml
---
title: 友链
type: friends
---
```
数据源：可选择在 `source/_data/friends.yml` 文件中配置友链数据列表。

#### 赞助页 (`/sponsor/`)
命令：`hexo new page sponsor`  
文件路径：`source/sponsor/index.md`  
Front-matter 配置：
```yaml
---
title: 赞助
type: sponsor
---
```
配置文件：在 `_config.yml` 的 `sponsor:` 节点下配置二维码图片与赞助列表。

#### 相册页 (`/gallery/`)
命令：`hexo new page gallery`  
文件路径：`source/gallery/index.md`  
Front-matter 配置：
```yaml
---
title: 相册
type: gallery
---
```
配置文件：在 `_config.yml` 的 `gallery:` 节点下配置图片瀑布流列宽与相册项目。

#### 追番 / 番组页 (`/bangumi/`)
命令：`hexo new page bangumi`  
文件路径：`source/bangumi/index.md`  
Front-matter 配置：
```yaml
---
title: 追番
type: bangumi
---
```

#### 留言板页 (`/guestbook/`)
命令：`hexo new page guestbook`  
文件路径：`source/guestbook/index.md`  
Front-matter 配置：
```yaml
---
title: 留言板
type: guestbook
---
```



---

## 文章 Front-matter 配置规范

在 Markdown 文章头部通过 Front-matter 配置参数：

```yaml
---
title: 文章标题
date: 2026-01-01 12:00:00
updated: 2026-01-02 18:00:00
categories: [技术]
tags: [Hexo, 前端]
description: 文章简短描述
cover: /img/cover.jpg  # 文章封面图
top: true               # 置顶文章
toc: true               # 显示浮动目录
comments: true          # 允许评论
copyright: true         # 显示版权声明
password: ""            # 加密密码（留空不加密）
---
```

---

## 参与贡献

参见 [CONTRIBUTING.md](CONTRIBUTING.md)。

欢迎通过 [GitHub Issues](https://github.com/LKDenchin/hexo-theme-firefly/issues) 提交 Bug 反馈或 Pull Request。

---

## 致谢

- 博客框架：[Hexo](https://hexo.io/)
- 模板引擎：[EJS](https://ejs.co/)
- 视觉与概念设计：[Firefly (Astro 版)](https://github.com/CuteLeaf/Firefly) by CuteLeaf / [fuwari](https://github.com/saicaca/fuwari) by saicaca

---

## 许可证

[MIT License](LICENSE)

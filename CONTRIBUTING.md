# 参与贡献指南 (Contributing Guide)

感谢您关注并有意参与 Hexo Theme Firefly 的开发与维护！无论是提交 Bug 报告、提出功能建议还是提交代码 PR，我们都非常欢迎。

## 提交 Issue

在提交 Issue 前，请确认以下事项：

1. **查阅文档与已有 Issue**：请先在 [GitHub Issues](https://github.com/LKDenchin/hexo-theme-firefly/issues) 中搜索，确认该问题是否已被提出或解决。
2. **重现步骤与环境**：提交 Bug 时，请提供完整的 Node.js 版本、Hexo 版本、浏览器名称以及详细的重现步骤。
3. **错误日志**：涉及页面渲染或脚本错误时，请附上控制台（Console）日志或终端构建输出日志。

---

## 本地开发指南

### 1. 环境依赖

- **Node.js** >= 16.0.0
- **Hexo** >= 6.0.0
- **Git**

### 2. 初始化开发环境

克隆项目并将其关联至本地 Hexo 调试博客：

```sh
# 克隆主题仓库
git clone https://github.com/LKDenchin/hexo-theme-firefly.git

# 或在 Hexo 测试站点的 themes 目录下创建软链接
cd your-hexo-blog/themes
ln -s /path/to/hexo-theme-firefly firefly
```

在测试站点的 `_config.yml` 中设置：
```yaml
theme: firefly
```

运行本地调试：
```sh
npx hexo clean && npx hexo server
```

---

## 代码开发规范

1. **EJS 模板**：
   - 保持视图结构清晰，逻辑代码与页面渲染分离。
   - 复用组件应放置于 `layout/_partials/` 目录下，并使用 `<%- partial(...) %>` 引入。

2. **CSS 样式**：
   - 遵循主题的 OKLCH 色彩体系与 CSS 变量规范（`var(--hue)`、`var(--card-bg)` 等）。
   - 新增页面样式请在 `source/css/` 下创建独立的 CSS 文件，并在 `layout/_partials/head.ejs` 中按序引入。
   - 确保移动端响应式样式写在相应的 `@media (max-width: 768px)` 媒体查询块中。

3. **JavaScript 脚本**：
   - 使用原生 JavaScript (ES6+)，避免引入冗余的重型依赖。
   - 功能性脚本按照类别存放在 `source/js/core/`、`source/js/ui/` 或 `source/js/features/` 目录下。

4. **多语言 i18n**：
   - 若新增了页面文本或配置标签，请同步在 `languages/` 目录下的多语言文件（`zh-CN.yml`、`zh-TW.yml`、`en.yml`、`ja.yml`、`ru.yml`）中添加对应的键值。

---

## 提交 Pull Request (PR)

1. Fork 本仓库并基于 `master` 分支创建您的特性分支（如 `feature/my-feature` 或 `fix/bug-fix`）。
2. 在本地修改并充分测试（包含桌面端与移动端响应式测试）。
3. 提交 Commit，Commit 信息请简明扼要描述本次改动（如 `fix: 修复移动端导航栏遮罩层层级问题`）。
4. Push 至您的 Fork 仓库，并向本仓库提交 Pull Request。

---

## 开源协议

提交代码即表示您同意将所贡献的代码基于 [MIT License](LICENSE) 协议开源。

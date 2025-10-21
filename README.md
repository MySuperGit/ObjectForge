# ObjectForge — Image & Video Commerce Studio (MVP)

> 基于模板与图库的一键改图平台。前端 **Vite/React/TS/Tailwind**，后端 **FastAPI (Python 3.10.9)**。  
> 特色：左侧功能卡自动轮播、右侧效果对比（上传→抠图→下载）；文生图内容页（左：生成+对话，右：图片墙可放大阅览）；图片广场（瀑布流）；评价轮播；计费页（包月/积分/终身）。  
> **色板**：严格使用 Claude 色系；高亮 `#2B83DA`，NEW 红 `#E53935`。

## Monorepo

objectforge/
├─ objectforge-api/ # FastAPI 后端（/api）
└─ objectforge-web/ # 前端 (Vite + React + TS)

## 快速开始

### 后端

  ```bash
  cd objectforge-api
  python -m venv .venv && source .venv/bin/activate
  pip install -r requirements.txt
  # 复制 .env.example -> .env 并填入本地配置
  uvicorn app:app --reload --port 8000
  ```

### 前端

  ```bash
  cd objectforge-web
  npm i
  npm run dev
  # 打开 http://localhost:5173
  # Vite 将 /api 代理到 FastAPI (localhost:8000)


## API（MVP）

- `POST /api/v1/bg/remove`：抠图（rembg），入参：`image_file` 或 `image_url`；出：`image/png`
- `GET /features`：功能清单（含 `availability`/`isNew`/`newBadgeUntil`/`releaseAt`/`group`/`tags`）
- `GET /gallery`：图片广场数据
- `GET /reviews`：用户评价（10条）
- `GET /pricing`：计费方案
- `GET /i18n/{lang}.json`：国际化词条（en/zh）

## 设计规范

- 颜色（Claude 色板）：全部通过 CSS 变量与 Tailwind 扩展；按钮/标签/高亮仅用 `--brand`，点缀 `--accent-2`/`--accent-1`，NEW 用 `--new`。
- Header：下滑隐藏；上滑或鼠标靠近顶部 80px 显示；无操作 3s 自动隐藏；输入聚焦时常驻。
- Sidebar：圆形 56px，热门/推荐/全部；隐藏时内容区自适应变宽。
- 所有能直达功能操作页的入口右上角保留 NEW 位（24×14 占位，不显示也保留）；Coming Soon 显示“敬请期待 + 上线日期”。

## 安全

- `.env` 文件不入库；改用 `.env.example` 提供示例变量。
- 若曾提交过真实密钥，请立刻旋转密钥并（可选）用 `git filter-repo` 清理历史。

## 许可证

MIT

---

## D. 验收（本步骤完成即视为通过）

- [ ] 根目录**不再出现** `.env`；`git status` 显示 `.env` 为 **未跟踪**（被忽略）。  
- [ ] 有新的 `.env.example`，内容包含前后端所需示例键。  
- [ ] `.gitignore` 新增了 `.env` 与 `.env.*` 规则。  
- [ ] 如曾推送敏感值：已完成密钥旋转，并评估是否执行历史清理（A3）。  
- [ ] 新 PR 已创建：`chore(security): sanitize env handling (.env ignored, example added)`。  
- [ ] README 已替换为 ObjectForge 专属版本（启动步骤、色板、交互与 API 均对齐我们的规范）。

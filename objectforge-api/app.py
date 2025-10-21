# app.py — clean version after merge
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.staticfiles import StaticFiles

app = FastAPI(
    title="ObjectForge API",
    version="0.2.0",
    docs_url=None,             # 我们自定义 /docs（本地静态资源）
    redoc_url=None,
    openapi_url="/openapi.json",
)

# CORS：前端开发端口
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 本地化 swagger 静态资源；若未安装 swagger-ui-bundle，会退化到简单提示
try:
    import swagger_ui_bundle  # pip install swagger-ui-bundle
    from importlib.resources import files

    swagger_dist_path = files(swagger_ui_bundle).joinpath("static")
    app.mount("/_docs_static", StaticFiles(directory=str(swagger_dist_path)), name="swagger")

    @app.get("/docs", include_in_schema=False)
    def custom_swagger_ui():
        return get_swagger_ui_html(
            openapi_url="/openapi.json",
            title="ObjectForge API Docs",
            swagger_js_url="/_docs_static/swagger-ui-bundle.js",
            swagger_css_url="/_docs_static/swagger-ui.css",
            swagger_favicon_url="/_docs_static/favicon-32x32.png",
        )
except Exception:  # 安装缺失时的兜底
    @app.get("/docs", include_in_schema=False)
    def docs_fallback():
        return RedirectResponse(url="/openapi.json")

# 根路径跳转到 /docs
@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse(url="/docs")

# 健康检查
@app.get("/healthz", include_in_schema=False)
def healthz():
    return {"status": "ok"}

# 示例 API（可留可删）
@app.get("/api/v1/ping")
def ping():
    return {"ok": True}

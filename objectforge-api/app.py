<<<<<<< HEAD
<<<<<<< HEAD
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.gzip import GZipMiddleware
from config import settings
from routers import health, content, images

app = FastAPI(title=settings.APP_NAME, version="0.2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(o) for o in settings.CORS_ALLOW_ORIGINS] or ["*"] if settings.DEBUG else [str(o) for o in settings.CORS_ALLOW_ORIGINS],
=======
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from starlette.exceptions import HTTPException as StarletteHTTPException

from config import settings
from middleware import RequestLoggingMiddleware, logger, request_id_ctx
from routers import content, health, images, tasks
from swagger_ui_bundle import swagger_ui_3_path

app = FastAPI(
    title=settings.APP_NAME,
    version="0.3.0",
    docs_url=None,
    redoc_url=None,
)

logger.setLevel(settings.LOG_LEVEL.upper())

app.add_middleware(RequestLoggingMiddleware)

cors_origins = settings.cors_origins or (["http://localhost:5173"] if settings.DEBUG else [])
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
>>>>>>> pr-local-swagger
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(GZipMiddleware, minimum_size=1024)

<<<<<<< HEAD
app.include_router(health.router)
app.include_router(content.router)
app.include_router(images.router)

@app.get("/")
def root():
    return {"name": settings.APP_NAME, "version": "0.2.0"}
=======
app.mount("/_docs_static", StaticFiles(directory=swagger_ui_3_path), name="swagger-ui")

app.include_router(health.router)
app.include_router(content.router, prefix=settings.API_PREFIX)
app.include_router(images.router)
app.include_router(tasks.router, prefix=settings.API_PREFIX)


@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui() -> HTMLResponse:
    return get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title=f"{settings.APP_NAME} - Docs",
        swagger_js_url="/_docs_static/swagger-ui-bundle.js",
        swagger_css_url="/_docs_static/swagger-ui.css",
    )


@app.get("/", include_in_schema=False)
async def root() -> RedirectResponse:
    return RedirectResponse(url="/docs", status_code=302)


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException) -> JSONResponse:
    logger.warning("HTTP error %s on %s", exc.status_code, request.url.path)
    response = JSONResponse(
        status_code=exc.status_code,
        content={"code": exc.status_code, "message": exc.detail or "error", "details": ""},
    )
    response.headers["X-Request-ID"] = request_id_ctx.get("-")
    return response


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    logger.warning("Validation error on %s: %s", request.url.path, exc.errors())
    response = JSONResponse(
        status_code=422,
        content={
            "code": 422,
            "message": "validation_error",
            "details": exc.errors(),
        },
    )
    response.headers["X-Request-ID"] = request_id_ctx.get("-")
    return response


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.exception("Unhandled error on %s", request.url.path)
    response = JSONResponse(
        status_code=500,
        content={"code": 500, "message": "internal_error", "details": ""},
    )
    response.headers["X-Request-ID"] = request_id_ctx.get("-")
    return response
>>>>>>> pr-local-swagger
=======
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from rembg import remove
from urllib.parse import urlparse
import io, os, requests

app = FastAPI(title="ObjectForge API", version="0.1.0")
origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/healthz")
@app.get("/api/healthz")
def healthz():
    return {"ok": True}


@app.get("/features")
@app.get("/api/features")
def features():
    return [
        {
            "id": "bg-remove",
            "title": "Background Remove",
            "slug": "remove-bg",
            "group": "edit",
            "icon": "cut",
            "isNew": True,
            "newBadgeUntil": "2025-12-01",
            "availability": "available",
            "tags": ["热门", "推荐"],
        },
        {
            "id": "virtual-human",
            "title": "Virtual Human",
            "slug": "virtual-human",
            "group": "generate",
            "icon": "user",
            "isNew": True,
            "newBadgeUntil": "2026-06-01",
            "availability": "coming_soon",
            "releaseAt": "2026-01-10",
            "tags": ["技术"],
        },
    ]


@app.get("/gallery")
@app.get("/api/gallery")
def gallery():
    return [
        {
            "id": f"g{i}",
            "thumb": f"https://picsum.photos/seed/{i}/400/300",
            "full": f"https://picsum.photos/seed/{i}/1200/900",
            "tags": ["灵感"],
            "author": f"User{i}",
        }
        for i in range(1, 25)
    ]


@app.get("/reviews")
@app.get("/api/reviews")
def reviews():
    return [
        {
            "id": f"r{i}",
            "user": f"User {i}",
            "avatar": None,
            "rating": 5,
            "content": "Great!",
            "country": "US",
        }
        for i in range(10)
    ]


@app.get("/pricing")
@app.get("/api/pricing")
def pricing():
    return [
        {
            "id": "monthly",
            "title": "Monthly",
            "price": "$19",
            "features": ["HD export", "Priority queue"],
            "cta": "Subscribe",
        },
        {
            "id": "credits",
            "title": "Credits",
            "price": "$10/200",
            "features": ["Pay as you go"],
            "cta": "Buy",
        },
        {
            "id": "lifetime",
            "title": "Lifetime",
            "price": "$199",
            "features": ["Forever access"],
            "cta": "Purchase",
        },
    ]


@app.get("/i18n/{lang}.json")
@app.get("/api/i18n/{lang}.json")
def i18n(lang: str):
    if lang.startswith("zh"):
        return {
            "nav": {"home": "首页", "plaza": "图片广场", "reviews": "用户评价", "pricing": "计费"},
            "cta": {"start": "开始处理"},
        }
    return {
        "nav": {"home": "Home", "plaza": "Plaza", "reviews": "Reviews", "pricing": "Pricing"},
        "cta": {"start": "Start"},
    }


@app.post("/api/v1/bg/remove")
async def bg_remove(image_file: UploadFile = File(None), image_url: str = Form(None)):
    if image_file:
        raw = image_file.file.read()
    elif image_url:
        parsed = urlparse(image_url)
        if parsed.scheme not in {"http", "https"} or not parsed.netloc:
            return JSONResponse({"error": "invalid url"}, status_code=400)
        r = requests.get(image_url, timeout=20)
        r.raise_for_status()
        if int(r.headers.get("Content-Length", 0)) > 5 * 1024 * 1024:
            return JSONResponse({"error": "file too large"}, status_code=413)
        raw = r.content
    else:
        return JSONResponse({"error": "image_file or image_url required"}, status_code=400)
    cut = remove(raw)
    buf = io.BytesIO(cut)
    buf.seek(0)
    return StreamingResponse(buf, media_type="image/png")
>>>>>>> pr-ui-cors

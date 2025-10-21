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

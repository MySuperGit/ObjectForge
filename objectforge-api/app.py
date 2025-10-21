from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.gzip import GZipMiddleware
from config import settings
from routers import health, content, images

app = FastAPI(title=settings.APP_NAME, version="0.2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(o) for o in settings.CORS_ALLOW_ORIGINS] or ["*"] if settings.DEBUG else [str(o) for o in settings.CORS_ALLOW_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(GZipMiddleware, minimum_size=1024)

app.include_router(health.router)
app.include_router(content.router)
app.include_router(images.router)

@app.get("/")
def root():
    return {"name": settings.APP_NAME, "version": "0.2.0"}

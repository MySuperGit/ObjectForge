from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl
from typing import List

class Settings(BaseSettings):
    APP_NAME: str = "ObjectForge API"
    API_PREFIX: str = "/api"
    DEBUG: bool = True

    CORS_ALLOW_ORIGINS: List[AnyHttpUrl] = []

    REQ_TIMEOUT: int = 15
    MAX_IMAGE_BYTES: int = 20 * 1024 * 1024
    MAX_IMAGE_PIXELS: int = 20_000_000
    REMBG_PASSTHROUGH: bool = False

    class Config:
        env_file = ".env"

settings = Settings()

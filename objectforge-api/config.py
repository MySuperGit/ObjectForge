from pydantic_settings import BaseSettings
<<<<<<< HEAD
from pydantic import AnyHttpUrl
from typing import List

class Settings(BaseSettings):
    APP_NAME: str = "ObjectForge API"
    API_PREFIX: str = "/api"
    DEBUG: bool = True

    CORS_ALLOW_ORIGINS: List[AnyHttpUrl] = []
=======
from typing import List


class Settings(BaseSettings):
    APP_NAME: str = "ObjectForge API"
    API_PREFIX: str = "/api"
    MODE: str = "dev"
    PORT: int = 8000
    DEBUG: bool = True
    LOG_LEVEL: str = "INFO"

    CORS_ALLOW_ORIGINS: List[str] = []
>>>>>>> pr-local-swagger

    REQ_TIMEOUT: int = 15
    MAX_IMAGE_BYTES: int = 20 * 1024 * 1024
    MAX_IMAGE_PIXELS: int = 20_000_000
    REMBG_PASSTHROUGH: bool = False

<<<<<<< HEAD
    class Config:
        env_file = ".env"

=======
    DB_URL: str | None = None
    REDIS_URL: str | None = None

    class Config:
        env_file = ".env"

    @property
    def cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ALLOW_ORIGINS if origin]


>>>>>>> pr-local-swagger
settings = Settings()

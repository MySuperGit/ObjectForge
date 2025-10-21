import logging
import time
import uuid
from contextvars import ContextVar
from typing import Optional

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

request_id_ctx: ContextVar[str] = ContextVar("request_id", default="-")


class RequestIDLogFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        record.request_id = request_id_ctx.get("-")
        return True


logger = logging.getLogger("objectforge")
if not logger.handlers:
    handler = logging.StreamHandler()
    formatter = logging.Formatter(
        "%(asctime)s | %(levelname)s | request_id=%(request_id)s | %(message)s"
    )
    handler.setFormatter(formatter)
    logger.addHandler(handler)
logger.addFilter(RequestIDLogFilter())


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
        token = request_id_ctx.set(request_id)
        start = time.perf_counter()
        logger.info("→ %s %s", request.method, request.url.path)
        response: Optional[Response] = None
        try:
            response = await call_next(request)
            return response
        except Exception:
            logger.exception("Unhandled error on %s %s", request.method, request.url.path)
            raise
        finally:
            elapsed = (time.perf_counter() - start) * 1000
            status = getattr(response, "status_code", "error")
            logger.info(
                "← %s %s status=%s %.2fms",
                request.method,
                request.url.path,
                status,
                elapsed,
            )
            request_id_ctx.reset(token)
            if response is not None:
                response.headers["X-Request-ID"] = request_id

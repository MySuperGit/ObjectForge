import httpx, ipaddress, socket, re
from urllib.parse import urlparse
from typing import Tuple
from config import settings

PRIVATE_NETS = [
    ipaddress.ip_network("10.0.0.0/8"),
    ipaddress.ip_network("172.16.0.0/12"),
    ipaddress.ip_network("192.168.0.0/16"),
    ipaddress.ip_network("127.0.0.0/8"),
    ipaddress.ip_network("::1/128"),
    ipaddress.ip_network("fc00::/7"),
    ipaddress.ip_network("169.254.0.0/16"),
]

def _is_private_ip(host: str) -> bool:
    try:
        infos = socket.getaddrinfo(host, None)
        for family, _, _, _, sockaddr in infos:
            ip_str = sockaddr[0]
            ip_obj = ipaddress.ip_address(ip_str)
            if any(ip_obj in net for net in PRIVATE_NETS):
                return True
        return False
    except Exception:
        return True

def safe_url(url: str) -> Tuple[bool, str]:
    try:
        u = urlparse(url)
        if u.scheme not in ("http", "https"):
            return False, "unsupported_scheme"
        if not u.hostname:
            return False, "invalid_host"
        if _is_private_ip(u.hostname):
            return False, "private_address"
        return True, ""
    except Exception:
        return False, "parse_error"

async def fetch_image_bytes(url: str) -> bytes:
    ok, reason = safe_url(url)
    if not ok:
        raise ValueError(f"Blocked URL: {reason}")
    async with httpx.AsyncClient(timeout=settings.REQ_TIMEOUT, follow_redirects=True) as client:
        async with client.stream("GET", url, headers={"User-Agent": "ObjectForge/1.0"}) as r:
            r.raise_for_status()
            ctype = r.headers.get("Content-Type", "").lower()
            if not re.match(r"^image/(png|jpe?g|webp|bmp|gif|tiff?)", ctype):
                raise ValueError(f"unsupported_content_type:{ctype}")
            total = 0
            chunks = []
            async for chunk in r.aiter_bytes():
                total += len(chunk)
                if total > settings.MAX_IMAGE_BYTES:
                    raise ValueError("image_too_large")
                chunks.append(chunk)
            return b"".join(chunks)

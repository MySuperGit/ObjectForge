import hashlib, json
from fastapi import Response

def set_etag(response: Response, obj) -> None:
    body = json.dumps(obj, separators=(",", ":"), ensure_ascii=False).encode("utf-8")
    etag = hashlib.md5(body).hexdigest()
    response.headers["ETag"] = f'W/"{etag}"'

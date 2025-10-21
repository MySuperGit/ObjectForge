from fastapi import APIRouter

router = APIRouter(tags=["health"])

@router.get("/healthz")
def healthz():
<<<<<<< HEAD
    return {"ok": True}
=======
    return {"status": "ok"}
>>>>>>> pr-local-swagger

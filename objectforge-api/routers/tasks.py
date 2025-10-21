import asyncio
from typing import Dict, Optional
from uuid import uuid4

from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/tasks", tags=["tasks"])

TaskState = Dict[str, Dict[str, Optional[dict]]]
_tasks: TaskState = {}


async def _simulate_task(task_id: str) -> None:
    try:
        await asyncio.sleep(2)
        _tasks[task_id] = {"status": "completed", "result": {"message": "job finished"}}
    except Exception as exc:  # pragma: no cover - defensive
        _tasks[task_id] = {"status": "failed", "result": {"error": str(exc)}}


@router.post("", summary="Create a background task")
async def create_task():
    task_id = str(uuid4())
    _tasks[task_id] = {"status": "pending", "result": None}
    asyncio.create_task(_simulate_task(task_id))
    return {"code": 0, "message": "ok", "details": "", "task_id": task_id, "status": "pending"}


@router.get("/{task_id}", summary="Get task status")
async def get_task(task_id: str):
    task = _tasks.get(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="task_not_found")
    return {"code": 0, "message": "ok", "details": "", "task_id": task_id, **task}

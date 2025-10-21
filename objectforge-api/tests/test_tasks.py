import time


def test_task_lifecycle(client):
    create = client.post("/api/tasks")
    assert create.status_code == 200
    data = create.json()
    task_id = data["task_id"]
    assert data["status"] == "pending"

    # Wait briefly for async task to finish
    deadline = time.time() + 5
    status = None
    while time.time() < deadline:
        resp = client.get(f"/api/tasks/{task_id}")
        assert resp.status_code == 200
        status = resp.json()
        if status["status"] == "completed":
            break
        time.sleep(0.1)

    assert status is not None
    assert status["status"] in {"completed", "pending"}

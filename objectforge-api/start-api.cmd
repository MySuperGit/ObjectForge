@echo off
setlocal
cd /d %~dp0
if not exist .venv (
    py -3.10 -m venv .venv
)
call .venv\Scripts\activate.bat
python -m pip install --upgrade pip >nul
if exist requirements.txt (
    pip install -r requirements.txt
)
if exist requirements-dev.txt (
    pip install -r requirements-dev.txt
)
python -m uvicorn app:app --reload --port 8000
endlocal

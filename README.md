# FastAPI 应用模板

这是一个基于 FastAPI 的 Python 应用模板，适合用于快速开发 API 服务。项目结构清晰，包含开发常用的各类组件，适合 C++ 转 Python 的开发者入门。

## 项目结构说明

```
fastapi-app
├── app
│   ├── main.py               # 应用入口，启动 FastAPI 服务
│   ├── api
│   │   └── routes.py         # 路由定义，所有接口都在这里注册
│   ├── models
│   │   └── models.py         # 数据模型，使用 Pydantic 进行数据校验和类型定义
│   ├── services
│   │   └── service.py        # 业务逻辑层，处理具体功能
│   └── dependencies
│       └── deps.py           # 依赖注入与共享功能，例如数据库连接等
├── requirements.txt           # 项目依赖库列表，安装用
├── README.md                  # 项目说明文档
└── .env                       # 环境变量配置文件（如数据库连接、密钥等）
```

> **说明：**  
> - Python 的项目结构类似于 C++ 的模块划分，`app` 目录下是主要代码。  
> - `main.py` 类似于 C++ 的 `main.cpp`，是程序入口。  
> - 路由（API接口）都在 `api/routes.py` 里注册。  
> - 数据模型用 Pydantic，类似 C++ 的结构体，但支持自动校验和类型转换。  
> - 业务逻辑建议放在 `services/service.py`，便于维护和测试。  
> - 依赖注入（如数据库连接）统一放在 `dependencies/deps.py`，方便管理。

## 依赖安装

请先安装 Python 3.10 及以上版本，然后在项目根目录下运行：

```
pip install -r requirements.txt
```

> **说明：**  
> - `requirements.txt` 里列出了所有需要的第三方库，类似 C++ 的第三方依赖。  
> - 推荐使用虚拟环境（如 venv）隔离依赖，避免和系统 Python 冲突。

## 启动应用

在项目根目录下运行以下命令启动 FastAPI 服务：

```
uvicorn app.main:app --reload
```

> **说明：**  
> - `uvicorn` 是 FastAPI 推荐的运行服务器。  
> - `--reload` 表示开发模式，修改代码后自动重启服务。

## API 文档

服务启动后，访问以下地址可查看自动生成的接口文档：

```
http://127.0.0.1:8000/docs
```

> **说明：**  
> - FastAPI 会自动生成 Swagger 文档，方便调试和测试接口。

## 环境变量配置

请在 `.env` 文件中配置数据库连接、密钥等敏感信息。例如：

```
DB_URL=postgresql://user:pass@localhost:5432/dbname
SECRET_KEY=your_secret_key
```

> **说明：**  
> - 不要把敏感信息写在代码里，统一放在 `.env` 文件，类似 C++ 的配置文件。

## 贡献说明

欢迎 Fork 本项目并提交 Pull Request，完善功能或修复问题。

> **建议：**  
> - Python 代码风格推荐使用 PEP8，建议安装 `black` 和 `ruff` 工具自动格式化和检查 
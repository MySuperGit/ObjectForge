import axios from 'axios'
import { showToast } from './toast'

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

export const http = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
})

http.interceptors.request.use((config) => {
  const requestId = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `req-${Date.now()}-${Math.random().toString(16).slice(2)}`
  config.headers = {
    ...config.headers,
    'X-Request-ID': requestId,
  }
  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const skipToast = error?.config?.headers?.['X-Skip-Toast'] === '1'
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.detail ||
      error?.message ||
      'Request failed'
    if (!skipToast && typeof window !== 'undefined') {
      showToast(message)
    }
    return Promise.reject(new Error(message))
  }
)

export default http

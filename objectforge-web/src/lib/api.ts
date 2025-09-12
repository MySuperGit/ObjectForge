import { useQuery } from '@tanstack/react-query'
import type { Feature, Plan } from './types'

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

async function handleJson(res: Response) {
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return res.json()
}

export function get(url: string, options?: RequestInit) {
  return fetch(`${API_BASE}${url}`, options).then(handleJson)
}

export async function removeBg(file: File) {
  const fd = new FormData()
  fd.append('image_file', file)
  const r = await fetch(`${API_BASE}/v1/bg/remove`, { method: 'POST', body: fd })
  if (!r.ok) throw new Error('bg remove failed')
  return r.blob()
}

export async function fetchFeatures(): Promise<Feature[]> {
  const r = await fetch(`${API_BASE}/features`, { cache: 'no-store' })
  if (!r.ok) throw new Error('Failed to load features')
  return r.json()
}

export function useFeatures() {
  return useQuery({ queryKey: ['features'], queryFn: fetchFeatures, staleTime: 60_000 })
}

export async function fetchPricing(): Promise<Plan[]> {
  const r = await fetch(`${API_BASE}/pricing`, { cache: 'no-store' })
  if (!r.ok) throw new Error('Failed to load pricing')
  return r.json()
}

export function usePricing() {
  return useQuery({ queryKey: ['pricing'], queryFn: fetchPricing, staleTime: 60_000 })
}

export const api = { get, removeBg }

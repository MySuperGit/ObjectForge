import { useQuery } from '@tanstack/react-query'
import http from './http'
import type { Feature, Plan } from './types'

export async function removeBg(file: File) {
  const fd = new FormData()
  fd.append('image_file', file)
  const response = await http.post('/v1/bg/remove', fd, { responseType: 'blob' })
  return response.data
}

export async function fetchFeatures(): Promise<Feature[]> {
  const response = await http.get<Feature[]>('/features', {
    headers: { 'Cache-Control': 'no-store' },
  })
  return response.data
}

export function useFeatures() {
  return useQuery({ queryKey: ['features'], queryFn: fetchFeatures, staleTime: 60_000 })
}

export async function fetchPricing(): Promise<Plan[]> {
  const response = await http.get<Plan[]>('/pricing', {
    headers: { 'Cache-Control': 'no-store' },
  })
  return response.data
}

export function usePricing() {
  return useQuery({ queryKey: ['pricing'], queryFn: fetchPricing, staleTime: 60_000 })
}

export const api = { removeBg }

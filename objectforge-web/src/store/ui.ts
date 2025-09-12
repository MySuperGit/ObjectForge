import { create } from 'zustand'

type UIState = {
  sidebarCollapsed: boolean
  setSidebarCollapsed: (v: boolean) => void
  filterTab: '热门' | '推荐' | '全部'
  setFilterTab: (v: '热门' | '推荐' | '全部') => void
}
export const useUI = create<UIState>((set) => ({
  sidebarCollapsed: false,
  setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
  filterTab: '热门',
  setFilterTab: (v) => set({ filterTab: v }),
}))

import { create } from 'zustand'

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
interface UIState {
  sidebarOpen: boolean
  toggleSidebar: () => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen }))
=======
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
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
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
}))

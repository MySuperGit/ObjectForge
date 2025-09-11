import { create } from 'zustand'

interface UIState {
  sidebarOpen: boolean
  lang: string
  headerHidden: boolean
  toggleSidebar: () => void
  setLang: (lang: string) => void
  setHeaderHidden: (v: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  lang: 'en',
  headerHidden: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setLang: (lang) => set({ lang }),
  setHeaderHidden: (v) => set({ headerHidden: v })
}))

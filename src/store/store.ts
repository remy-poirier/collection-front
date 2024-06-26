import { User } from '@/domain/user'
import { create } from 'zustand'

interface UserStore {
  user?: User
  setUser: (user: User) => void
  signOut: () => void
}

export const useUserStore = create<UserStore>()((set) => ({
  user: undefined,
  setUser: (user: User) => set((state) => ({ ...state, user })),
  signOut: () => set((state) => ({ ...state, user: undefined })),
}))
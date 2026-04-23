import {create} from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
    accessToken: string
    refreshToken: string
    setAccessToken: (token: string) => void
    setRefreshToken: (token: string) => void
    clearTokens: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: '',
            refreshToken: '',
            setAccessToken: (token: string) => set(() => ({ accessToken: token })),
            setRefreshToken: (token: string) => set(() => ({ refreshToken: token })),
            clearTokens: () => set(() => ({ accessToken: '', refreshToken: '' }))
        }),
        { name: "auth" }
    )
)
import React, { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { updateData, readData } from "@/lib/firebase.service"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    )
    const { currentUser } = useAuth()

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove("light", "dark")

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light"

            root.classList.add(systemTheme)
            return
        }

        root.classList.add(theme)
    }, [theme])

    // Sync with Firebase when user logs in or theme changes
    useEffect(() => {
        const syncTheme = async () => {
            if (!currentUser) return

            try {
                await updateData(`users/${currentUser.uid}/preferences`, {
                    theme: theme
                })
            } catch (error) {
                console.error("Failed to sync theme preference:", error)
            }
        }

        syncTheme()
    }, [theme, currentUser])

    // Load from Firebase on login
    useEffect(() => {
        const loadTheme = async () => {
            if (!currentUser) return

            try {
                const userData = await readData(`users/${currentUser.uid}`)
                if (userData?.preferences?.theme) {
                    setTheme(userData.preferences.theme)
                }
            } catch (error) {
                console.error("Failed to load theme preference:", error)
            }
        }

        loadTheme()
    }, [currentUser])

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme)
            setTheme(theme)
        },
    }

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")

    return context
}

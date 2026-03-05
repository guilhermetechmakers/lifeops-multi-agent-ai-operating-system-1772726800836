import * as React from 'react'

interface User {
  id: string
  email: string
  name?: string
  avatarUrl?: string
}

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name?: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const stored = localStorage.getItem('lifeops-user')
    if (stored) {
      try {
        setUser(JSON.parse(stored) as User)
      } catch {
        localStorage.removeItem('lifeops-user')
      }
    }
    setIsLoading(false)
  }, [])

  const signIn = React.useCallback(async (email: string, _password: string) => {
    const mockUser: User = { id: '1', email, name: email.split('@')[0] }
    setUser(mockUser)
    localStorage.setItem('lifeops-user', JSON.stringify(mockUser))
  }, [])

  const signUp = React.useCallback(
    async (email: string, _password: string, name?: string) => {
      const mockUser: User = {
        id: '1',
        email,
        name: name ?? email.split('@')[0],
      }
      setUser(mockUser)
      localStorage.setItem('lifeops-user', JSON.stringify(mockUser))
    },
    []
  )

  const signOut = React.useCallback(async () => {
    setUser(null)
    localStorage.removeItem('lifeops-user')
  }, [])

  const value: AuthContextValue = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

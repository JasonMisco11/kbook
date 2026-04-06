'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // TODO: Replace with real auth check (Supabase session)
    const isAuth = typeof window !== 'undefined' && sessionStorage.getItem('admin_auth') === 'true'
    if (!isAuth) {
      router.replace('/') // redirect to home or login
    } else {
      setAuthenticated(true)
    }
    setLoading(false)
  }, [router])

  if (loading) return <div>Loading...</div>
  if (!authenticated) return null

  return <>{children}</>
}

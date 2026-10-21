import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const STORAGE_KEY = 'savedProfiles'

export function useUserProfile() {
  const { username } = useParams()
  const navigate = useNavigate()
  const [profile, setProfile] = useState({
    username,
    loading: true,
    displayName: username,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (active) {
          setProfile({
            username,
            loading: false,
            displayName: data.name || data.login || username,
            error: null,
          })
        }
      })
      .catch((err) => {
        if (active && err.name !== 'AbortError') {
          setProfile({
            username,
            loading: false,
            displayName: username,
            error: 'No se pudo cargar el perfil, mostrando datos locales',
          })
        }
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [username])

  const isCurrent = profile.username === username
  const loading = !isCurrent || profile.loading
  const displayName = isCurrent ? profile.displayName : username
  const error = isCurrent ? profile.error : null

  const handleSave = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const saved = raw ? JSON.parse(raw) : []
      if (!saved.some((item) => item.username === username)) {
        saved.push({ username, displayName })
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
      }
    } catch {
      setProfile((prev) => ({ ...prev, error: 'No se pudo guardar el perfil' }))
    }
  }, [username, displayName])

  const goBack = useCallback(() => navigate(-1), [navigate])

  return { user: username, loading, displayName, error, handleSave, goBack }
}

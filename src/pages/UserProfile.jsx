import { useUserProfile } from '../hooks/useUserProfile'
import { Spinner } from '../components/Spinner'
import { SaveButton } from '../components/SaveButton'

export function UserProfile() {
  const { user, loading, displayName, error, handleSave, goBack } =
    useUserProfile()

  if (loading) return <Spinner />

  return (
    <div className="profile">
      <button type="button" onClick={goBack}>
        Volver
      </button>
      <h2>{displayName}</h2>
      <p>@{user}</p>
      {error && <p role="alert">{error}</p>}
      <SaveButton onClick={handleSave} />
    </div>
  )
}

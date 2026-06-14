import { useEffect, useState } from 'react'
import { API_BASE, extractArray } from '../api'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${API_BASE}/users/`)
      .then((r) => r.json())
      .then((data) => setUsers(extractArray(data)))
      .catch((e) => setError(e.message || String(e)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading users…</div>
  if (error) return <div>Error: {error}</div>

  return (
    <section>
      <h2>Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id || u.email}>{u.name} — {u.email}</li>
        ))}
      </ul>
    </section>
  )
}

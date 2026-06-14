import { useEffect, useState } from 'react'
import { API_BASE, extractArray } from '../api'

export default function Teams() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${API_BASE}/teams/`)
      .then((r) => r.json())
      .then((data) => setItems(extractArray(data)))
      .catch((e) => setError(e.message || String(e)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading teams…</div>
  if (error) return <div>Error: {error}</div>

  return (
    <section>
      <h2>Teams</h2>
      <ul>
        {items.map((t) => (
          <li key={t._id}>{t.name} — {t.members?.length ?? 0} members</li>
        ))}
      </ul>
    </section>
  )
}

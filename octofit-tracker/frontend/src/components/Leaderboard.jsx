import { useEffect, useState } from 'react'
import { API_BASE, extractArray } from '../api'

export default function Leaderboard() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${API_BASE}/leaderboard/`)
      .then((r) => r.json())
      .then((data) => setItems(extractArray(data)))
      .catch((e) => setError(e.message || String(e)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading leaderboard…</div>
  if (error) return <div>Error: {error}</div>

  return (
    <section>
      <h2>Leaderboard</h2>
      <ol>
        {items.map((l) => (
          <li key={l._id}>{l.entityType} {l.entity} — {l.points} pts</li>
        ))}
      </ol>
    </section>
  )
}

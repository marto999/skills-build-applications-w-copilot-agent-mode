import { useEffect, useState } from 'react'
import { API_BASE, extractArray } from '../api'

export default function Workouts() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${API_BASE}/workouts/`)
      .then((r) => r.json())
      .then((data) => setItems(extractArray(data)))
      .catch((e) => setError(e.message || String(e)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading workouts…</div>
  if (error) return <div>Error: {error}</div>

  return (
    <section>
      <h2>Workouts</h2>
      <ul>
        {items.map((w) => (
          <li key={w._id}>{new Date(w.date).toLocaleString()} — {w.exercises?.map(e => e.name).join(', ')}</li>
        ))}
      </ul>
    </section>
  )
}

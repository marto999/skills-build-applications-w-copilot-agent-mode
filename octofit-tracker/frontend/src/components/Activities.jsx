import { useEffect, useState } from 'react'
import { API_BASE, extractArray } from '../api'

export default function Activities() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${API_BASE}/activities/`)
      .then((r) => r.json())
      .then((data) => setItems(extractArray(data)))
      .catch((e) => setError(e.message || String(e)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading activities…</div>
  if (error) return <div>Error: {error}</div>

  return (
    <section>
      <h2>Activities</h2>
      <ul>
        {items.map((a) => (
          <li key={a._id}>{a.type} — {a.distanceKm ?? a.durationMin ?? ''}</li>
        ))}
      </ul>
    </section>
  )
}

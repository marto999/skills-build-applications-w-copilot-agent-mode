import { Link, Routes, Route } from 'react-router-dom'
import './App.css'
import Users from './components/Users'
import Activities from './components/Activities'
import Teams from './components/Teams'
import Leaderboard from './components/Leaderboard'
import Workouts from './components/Workouts'

function App() {
  return (
    <div className="app-root">
      <header>
        <h1>OctoFit Tracker (Frontend)</h1>
        <nav>
          <Link to="/">Home</Link>
          {' | '}
          <Link to="/users">Users</Link>
          {' | '}
          <Link to="/teams">Teams</Link>
          {' | '}
          <Link to="/activities">Activities</Link>
          {' | '}
          <Link to="/workouts">Workouts</Link>
          {' | '}
          <Link to="/leaderboard">Leaderboard</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>

      <footer>
        <small>
          Note: the app supports <code>VITE_API_BASE_URL</code> in <code>.env.local</code>
          for Codespaces, and also auto-detects the host if the frontend is served
          from the Codespaces URL.
        </small>
      </footer>
    </div>
  )
}

function Home() {
  return (
    <section>
      <h2>Welcome</h2>
      <p>Use the navigation to view Users, Teams, Activities, Workouts and Leaderboard.</p>
    </section>
  )
}

export default App

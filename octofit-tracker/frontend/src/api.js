const EXPLICIT_API_BASE = import.meta.env.VITE_API_BASE_URL;
const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;

function parseCodespaceFromHost(host) {
  const match = /^(.+)-5173\.app\.github\.dev$/.exec(host);
  return match ? match[1] : null;
}

const runtimeCodespace = typeof window !== 'undefined' ? parseCodespaceFromHost(window.location.hostname) : null;
const ACTIVE_CODESPACE = CODESPACE_NAME || runtimeCodespace;
export const API_BASE = EXPLICIT_API_BASE
  ? EXPLICIT_API_BASE
  : ACTIVE_CODESPACE
  ? `https://${ACTIVE_CODESPACE}-8000.app.github.dev/api`
  : `http://localhost:8000/api`;

export function extractArray(resp) {
  if (!resp) return [];
  if (Array.isArray(resp)) return resp;
  if (Array.isArray(resp.items)) return resp.items;
  if (Array.isArray(resp.data)) return resp.data;
  // common collection keys
  const keys = ['users', 'teams', 'activities', 'workouts', 'leaderboard', 'results'];
  for (const k of keys) if (Array.isArray(resp[k])) return resp[k];
  // try to find any array value
  const arr = Object.values(resp).find((v) => Array.isArray(v));
  if (arr) return arr;
  return [];
}

export default API_BASE;

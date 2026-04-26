/**
 * API client — all fetch calls go through this module.
 *
 * VITE_API_BASE defaults to '' (same origin via Vite proxy in dev,
 * or a same-origin deployment in production).  Set it in a .env file
 * or environment if the backend runs on a different host.
 *
 * Example:  VITE_API_BASE=http://192.168.1.10:3001
 */
const BASE = import.meta.env.VITE_API_BASE || '';

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${res.status}`);
  }
  return res.json();
}

async function post(path) {
  const res = await fetch(`${BASE}${path}`, { method: 'POST' });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  getStatus:      () => get('/status'),
  getSubscribers: () => get('/subscribers'),
  getTimeslots:   () => get('/timeslots'),
  getTalkgroups:  () => get('/talkgroups'),
  controlStart:   () => post('/control/start'),
  controlStop:    () => post('/control/stop'),
  controlRestart: () => post('/control/restart'),
};

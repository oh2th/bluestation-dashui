/**
 * BlueStation adapter — real integration placeholder.
 *
 * Implement the five async functions below to connect to a live
 * MidnightBlueLabs/tetra-bluestation instance.
 *
 * Typical integration points:
 *  - BlueStation HTTP API (if exposed)
 *  - Parsing BlueStation log/status output
 *  - systemd / process control for start/stop/restart
 *
 * Once implemented, set ADAPTER=bluestation in the environment and
 * restart the backend.
 */

async function getStatus() {
  throw new Error('BlueStation adapter not yet implemented. Use ADAPTER=mock for demo mode.');
}

async function getSubscribers() {
  throw new Error('BlueStation adapter not yet implemented. Use ADAPTER=mock for demo mode.');
}

async function getTimeslots() {
  throw new Error('BlueStation adapter not yet implemented. Use ADAPTER=mock for demo mode.');
}

async function getTalkgroups() {
  throw new Error('BlueStation adapter not yet implemented. Use ADAPTER=mock for demo mode.');
}

async function control(_action) {
  throw new Error('BlueStation adapter not yet implemented. Use ADAPTER=mock for demo mode.');
}

module.exports = { getStatus, getSubscribers, getTimeslots, getTalkgroups, control };

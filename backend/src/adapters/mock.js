/**
 * Mock adapter — returns in-memory demo data.
 *
 * Replace this module (or swap ADAPTER env var) with a real BlueStation
 * adapter when the integration is ready.  The real adapter only needs to
 * export the same five async functions listed here.
 */

let serviceState = 'running'; // 'running' | 'stopped'
let startedAt = new Date(Date.now() - 3 * 60 * 60 * 1000); // 3 h ago

const subscribers = [
  { id: 'SUB-001', name: 'Unit Alpha',   state: 'active',   talkgroup: 'TG-100', lastSeen: new Date(Date.now() - 30000).toISOString() },
  { id: 'SUB-002', name: 'Unit Bravo',   state: 'idle',     talkgroup: 'TG-200', lastSeen: new Date(Date.now() - 120000).toISOString() },
  { id: 'SUB-003', name: 'Unit Charlie', state: 'active',   talkgroup: 'TG-100', lastSeen: new Date(Date.now() - 5000).toISOString() },
  { id: 'SUB-004', name: 'Unit Delta',   state: 'offline',  talkgroup: null,     lastSeen: new Date(Date.now() - 600000).toISOString() },
  { id: 'SUB-005', name: 'Unit Echo',    state: 'active',   talkgroup: 'TG-300', lastSeen: new Date(Date.now() - 8000).toISOString() },
];

const timeslots = [
  { slot: 1, channel: 'CH-1', usage: 'voice',    assignedTo: 'TG-100', occupancy: 78 },
  { slot: 2, channel: 'CH-1', usage: 'data',     assignedTo: 'TG-200', occupancy: 12 },
  { slot: 3, channel: 'CH-2', usage: 'idle',     assignedTo: null,     occupancy: 0  },
  { slot: 4, channel: 'CH-2', usage: 'voice',    assignedTo: 'TG-300', occupancy: 55 },
];

const talkgroups = [
  { id: 'TG-100', name: 'Command',    activeMembers: 2, trafficState: 'active'  },
  { id: 'TG-200', name: 'Logistics',  activeMembers: 1, trafficState: 'idle'    },
  { id: 'TG-300', name: 'Tactical',   activeMembers: 1, trafficState: 'active'  },
  { id: 'TG-400', name: 'Admin',      activeMembers: 0, trafficState: 'silent'  },
];

function uptimeSeconds() {
  return Math.floor((Date.now() - startedAt.getTime()) / 1000);
}

async function getStatus() {
  return {
    state: serviceState,
    uptime: uptimeSeconds(),
    startedAt: serviceState === 'running' ? startedAt.toISOString() : null,
    version: '1.0.0-mock',
    errors: [],
  };
}

async function getSubscribers() {
  return subscribers;
}

async function getTimeslots() {
  return timeslots;
}

async function getTalkgroups() {
  return talkgroups;
}

async function control(action) {
  switch (action) {
    case 'start':
      if (serviceState === 'running') throw new Error('Service is already running');
      serviceState = 'running';
      startedAt = new Date();
      return { message: 'Service started' };

    case 'stop':
      if (serviceState === 'stopped') throw new Error('Service is already stopped');
      serviceState = 'stopped';
      return { message: 'Service stopped' };

    case 'restart':
      serviceState = 'running';
      startedAt = new Date();
      return { message: 'Service restarted' };

    default:
      throw new Error(`Unknown action: ${action}`);
  }
}

module.exports = { getStatus, getSubscribers, getTimeslots, getTalkgroups, control };

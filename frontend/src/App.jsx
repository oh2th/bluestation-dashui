import React, { useState, useEffect, useCallback } from 'react';
import { api } from './api';
import StatusPanel from './components/StatusPanel';
import SubscribersTable from './components/SubscribersTable';
import TimeslotsTable from './components/TimeslotsTable';
import TalkgroupsTable from './components/TalkgroupsTable';
import ControlPanel from './components/ControlPanel';

function useData(fetcher) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await fetcher());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => { load(); }, [load]);

  return { data, loading, error, reload: load };
}

export default function App() {
  const status      = useData(api.getStatus);
  const subscribers = useData(api.getSubscribers);
  const timeslots   = useData(api.getTimeslots);
  const talkgroups  = useData(api.getTalkgroups);

  function refreshAll() {
    status.reload();
    subscribers.reload();
    timeslots.reload();
    talkgroups.reload();
  }

  return (
    <div className="app">
      <header>
        <span className="logo">📡</span>
        <h1>BlueStation DashUI</h1>
        <button className="refresh-btn" onClick={refreshAll} title="Refresh all data">
          ⟳ Refresh
        </button>
      </header>

      <main>
        {/* Status + Control row */}
        <div className="grid-2">
          <div className="card">
            <div className="card-header">
              <span>📊</span><h2>Service Status</h2>
            </div>
            <div className="card-body">
              <StatusPanel
                status={status.data}
                loading={status.loading}
                error={status.error}
              />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span>🎛</span><h2>Service Control</h2>
            </div>
            <div className="card-body">
              <ControlPanel onActionDone={refreshAll} />
            </div>
          </div>
        </div>

        {/* Subscribers */}
        <div className="card">
          <div className="card-header">
            <span>👥</span><h2>Active Subscribers</h2>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <SubscribersTable
              subscribers={subscribers.data}
              loading={subscribers.loading}
              error={subscribers.error}
            />
          </div>
        </div>

        {/* Timeslots + Talkgroups */}
        <div className="grid-2">
          <div className="card">
            <div className="card-header">
              <span>⏱</span><h2>Timeslots</h2>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <TimeslotsTable
                timeslots={timeslots.data}
                loading={timeslots.loading}
                error={timeslots.error}
              />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span>📻</span><h2>Talkgroups</h2>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <TalkgroupsTable
                talkgroups={talkgroups.data}
                loading={talkgroups.loading}
                error={talkgroups.error}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

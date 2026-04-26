import React from 'react';

function Badge({ value }) {
  const cls = `badge badge-${(value || 'default').toLowerCase()}`;
  return <span className={cls}>{value || '—'}</span>;
}

export default function SubscribersTable({ subscribers, loading, error }) {
  if (loading) return (
    <div className="loading-row"><span className="spinner" />&nbsp;Loading subscribers…</div>
  );
  if (error) return <div className="error-row">⚠ {error}</div>;
  if (!subscribers || subscribers.length === 0) return (
    <div className="loading-row dim">No subscribers found.</div>
  );

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>State</th>
            <th>Talkgroup</th>
            <th>Last seen</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((s) => (
            <tr key={s.id}>
              <td className="id-cell">{s.id}</td>
              <td>{s.name}</td>
              <td><Badge value={s.state} /></td>
              <td className={s.talkgroup ? '' : 'dim'}>{s.talkgroup || '—'}</td>
              <td className="dim">{s.lastSeen ? relativeTime(s.lastSeen) : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function relativeTime(isoString) {
  const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

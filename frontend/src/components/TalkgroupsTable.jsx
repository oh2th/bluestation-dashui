import React from 'react';

function Badge({ value }) {
  const cls = `badge badge-${(value || 'default').toLowerCase()}`;
  return <span className={cls}>{value || '—'}</span>;
}

export default function TalkgroupsTable({ talkgroups, loading, error }) {
  if (loading) return (
    <div className="loading-row"><span className="spinner" />&nbsp;Loading talkgroups…</div>
  );
  if (error) return <div className="error-row">⚠ {error}</div>;
  if (!talkgroups || talkgroups.length === 0) return (
    <div className="loading-row dim">No talkgroups found.</div>
  );

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Active members</th>
            <th>Traffic state</th>
          </tr>
        </thead>
        <tbody>
          {talkgroups.map((g) => (
            <tr key={g.id}>
              <td className="id-cell">{g.id}</td>
              <td>{g.name}</td>
              <td style={{ textAlign: 'center' }}>{g.activeMembers}</td>
              <td><Badge value={g.trafficState} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

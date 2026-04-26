import React from 'react';

function Badge({ value }) {
  const cls = `badge badge-${(value || 'default').toLowerCase()}`;
  return <span className={cls}>{value || '—'}</span>;
}

function OccupancyBar({ pct }) {
  const cls = pct >= 75 ? 'high' : pct >= 40 ? 'med' : '';
  return (
    <div className="occ-bar-wrap">
      <div className="occ-bar">
        <div className={`occ-bar-fill ${cls}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="occ-label">{pct}%</span>
    </div>
  );
}

export default function TimeslotsTable({ timeslots, loading, error }) {
  if (loading) return (
    <div className="loading-row"><span className="spinner" />&nbsp;Loading timeslots…</div>
  );
  if (error) return <div className="error-row">⚠ {error}</div>;
  if (!timeslots || timeslots.length === 0) return (
    <div className="loading-row dim">No timeslots found.</div>
  );

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Slot</th>
            <th>Channel</th>
            <th>Usage</th>
            <th>Assigned to</th>
            <th>Occupancy</th>
          </tr>
        </thead>
        <tbody>
          {timeslots.map((t) => (
            <tr key={t.slot}>
              <td className="id-cell">{t.slot}</td>
              <td>{t.channel}</td>
              <td><Badge value={t.usage} /></td>
              <td className={t.assignedTo ? '' : 'dim'}>{t.assignedTo || '—'}</td>
              <td><OccupancyBar pct={t.occupancy} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

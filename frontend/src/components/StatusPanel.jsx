import React from 'react';

function Badge({ value }) {
  const cls = `badge badge-${(value || 'default').toLowerCase()}`;
  return <span className={cls}>{value || '—'}</span>;
}

export default function StatusPanel({ status, loading, error }) {
  if (loading) return (
    <div className="loading-row">
      <span className="spinner" />&nbsp;Loading status…
    </div>
  );
  if (error) return <div className="error-row">⚠ {error}</div>;
  if (!status) return null;

  const uptime = status.uptime != null ? formatUptime(status.uptime) : '—';
  const started = status.startedAt
    ? new Date(status.startedAt).toLocaleString()
    : '—';

  return (
    <div className="status-grid">
      <div className="stat-item">
        <span className="stat-label">State</span>
        <Badge value={status.state} />
      </div>
      <div className="stat-item">
        <span className="stat-label">Uptime</span>
        <span className="stat-value">{uptime}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Started at</span>
        <span className="stat-value" style={{ fontSize: '0.88rem' }}>{started}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Version</span>
        <span className="stat-value" style={{ fontSize: '0.88rem' }}>{status.version || '—'}</span>
      </div>
      {status.errors && status.errors.length > 0 && (
        <div className="stat-item" style={{ gridColumn: '1 / -1' }}>
          <span className="stat-label">Errors</span>
          {status.errors.map((e, i) => (
            <span key={i} style={{ color: '#f85149', fontSize: '0.85rem' }}>{e}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function formatUptime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

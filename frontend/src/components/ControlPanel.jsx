import React, { useState } from 'react';
import { api } from '../api';

export default function ControlPanel({ onActionDone }) {
  const [busy, setBusy] = useState(null); // 'start' | 'stop' | 'restart' | null
  const [feedback, setFeedback] = useState(null); // { type: 'success'|'error', message }

  async function handleAction(action) {
    setBusy(action);
    setFeedback(null);
    try {
      const handlers = {
        start: api.controlStart,
        stop: api.controlStop,
        restart: api.controlRestart,
      };
      const result = await handlers[action]();
      setFeedback({ type: 'success', message: result.message || `${action} succeeded` });
      if (onActionDone) onActionDone();
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setBusy(null);
    }
  }

  const isBusy = busy !== null;

  return (
    <div>
      <div className="control-row">
        <button
          className="ctrl-btn btn-start"
          disabled={isBusy}
          onClick={() => handleAction('start')}
        >
          {busy === 'start' ? <><span className="spinner" /> Starting…</> : '▶ Start'}
        </button>
        <button
          className="ctrl-btn btn-stop"
          disabled={isBusy}
          onClick={() => handleAction('stop')}
        >
          {busy === 'stop' ? <><span className="spinner" /> Stopping…</> : '■ Stop'}
        </button>
        <button
          className="ctrl-btn btn-restart"
          disabled={isBusy}
          onClick={() => handleAction('restart')}
        >
          {busy === 'restart' ? <><span className="spinner" /> Restarting…</> : '↺ Restart'}
        </button>
      </div>
      {feedback && (
        <div className={`ctrl-feedback ${feedback.type}`}>
          {feedback.type === 'success' ? '✓' : '⚠'} {feedback.message}
        </div>
      )}
    </div>
  );
}

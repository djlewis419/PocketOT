import React from 'react';

type Props = {
  onNavigate?: (view: string) => void;
};

export function ClientDashboard({ onNavigate }: Props) {
  return (
    <div style={{ padding: 16 }}>
      <h2>Client Dashboard (placeholder)</h2>
      <p>This is temporary so the app can compile.</p>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        {onNavigate && (
          <>
            <button onClick={() => onNavigate('home')}>Go Home</button>
            <button onClick={() => onNavigate('daily-observation')}>Daily Observation</button>
            <button onClick={() => onNavigate('assessment-intro')}>Start Assessment</button>
          </>
        )}
      </div>
    </div>
  );
}

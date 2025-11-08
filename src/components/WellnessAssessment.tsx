import React from 'react';

export function WellnessAssessment(props: { onNavigate?: (view: string) => void }) {
  return (
    <div style={{ padding: 16 }}>
      <h2>Wellness Assessment (placeholder)</h2>
      <p>This is temporary just so the app compiles.</p>
      {props.onNavigate && (
        <button onClick={() => props.onNavigate('dashboard')}>Go to Dashboard</button>
      )}
    </div>
  );
}

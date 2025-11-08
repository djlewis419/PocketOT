// src/components/DailyObservationViewer.tsx
import React from 'react';
import * as storage from '../lib/storage';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Calendar, Flag } from 'lucide-react';

type Props = {
  clientId: string;
  refreshKey?: number;
  onBack: () => void;
};

export function DailyObservationViewer({ clientId, refreshKey = 0, onBack }: Props) {
  const [observations, setObservations] = React.useState<storage.Observation[]>([]);
  const [clientName, setClientName] = React.useState<string>('');

  const load = React.useCallback(() => {
    try {
      if (!clientId) {
        setObservations([]);
        setClientName('');
        return;
      }
      const c = storage.getClient(clientId);
      setClientName(c?.name || clientId);
      const list = storage.getObservations(clientId);
      setObservations(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error('[Therapist] load observations failed:', e);
      setObservations([]);
    }
  }, [clientId]);

  React.useEffect(() => {
    load();
  }, [load, refreshKey]);

  const toggleFlag = (obsId: string, current?: boolean) => {
    try {
      storage.setObservationFlag(clientId, obsId, !current);
      load();
    } catch (e) {
      console.error('[Therapist] setObservationFlag failed:', e);
    }
  };

  const header = (
    <div className="flex items-center justify-between">
      <h1 className="text-slate-900">Daily Observations{clientName ? ` — ${clientName}` : ''}</h1>
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft className="size-4 mr-2" /> Back
      </Button>
    </div>
  );

  if (!clientId) {
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-4">
          {header}
          <Card className="p-8 bg-white border-slate-200 shadow-sm">
            <p className="text-slate-900 mb-1">No client selected.</p>
            <p className="text-slate-500 text-sm">Open an assessment first, then try Observations.</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-4">
        {header}

        <Card className="p-4 bg-white border-slate-200 shadow-sm">
          <p className="text-slate-600 text-sm">
            {clientName || 'Client'} — self-reported reflections
          </p>
        </Card>

        {observations.length === 0 ? (
          <Card className="p-6 bg-white border-slate-200 shadow-sm">
            <p className="text-slate-700">No observations yet for {clientName || 'this client'}.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {observations.map((o) => (
              <Card key={o.id} className="p-4 bg-white border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Calendar className="size-3" />
                    <span>
                      {new Date(o.dateISO).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-700 text-sm">Mood: {o.mood ?? '—'}/10</span>
                    <Button
                      size="sm"
                      variant={o.flagged ? 'default' : 'outline'}
                      className={o.flagged ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'border-slate-300'}
                      onClick={() => toggleFlag(o.id, o.flagged)}
                      title={o.flagged ? 'Unflag' : 'Flag'}
                    >
                      <Flag className="size-4 mr-2" />
                      {o.flagged ? 'Flagged' : 'Flag'}
                    </Button>
                  </div>
                </div>

                {/* No areas UI anymore */}
                <p className="text-slate-800 whitespace-pre-wrap">{o.text || '—'}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
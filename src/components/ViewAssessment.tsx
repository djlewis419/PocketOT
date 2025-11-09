// src/components/ViewAssessment.tsx
import React from 'react';
import * as storage from '../lib/storage';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { pillarData } from '../data/pillarData';

type Props = {
  clientId: string;
  onBack: () => void;
  onViewObservations: (clientId: string) => void;
  onViewInterventions: (clientId: string) => void;
  onViewSessionNotes: (clientId: string) => void;
};

export function ViewAssessment({
  clientId,
  onBack,
  onViewObservations,
  onViewInterventions,
  onViewSessionNotes,
}: Props) {
  const [client, setClient] = React.useState<storage.ClientRecord | undefined>();

  React.useEffect(() => {
    setClient(clientId ? storage.getClient(clientId) : undefined);
  }, [clientId]);

  if (!client) {
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-slate-900">Assessment</h1>
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="size-4 mr-2" /> Back
            </Button>
          </div>
          <Card className="p-6 bg-white border-slate-200 shadow-sm">
            <p className="text-slate-700">No assessment found for this client.</p>
          </Card>
        </div>
      </div>
    );
  }

  const scoreFor = (id: number) => client.responses[id]?.rating ?? 0;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-slate-900">Assessment — {client.name || client.id}</h1>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="size-4 mr-2" /> Back
          </Button>
        </div>

        <Card className="p-6 bg-white border-slate-200 shadow-sm">
          <p className="text-slate-600 text-sm mb-4">
            Date: {new Date(client.dateISO).toLocaleString()}
          </p>

          {/* Pillar scores */}
          <div className="grid sm:grid-cols-2 gap-4">
            {pillarData.map((p) => (
              <div key={p.id} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-slate-900 font-medium">{p.name}</p>
                  <div className="text-slate-700">{scoreFor(p.id)}/10</div>
                </div>
                {/* open-ended answers */}
                {Object.entries(client.responses[p.id]?.answers ?? {}).length > 0 ? (
                  <div className="space-y-1">
                    {Object.entries(client.responses[p.id]?.answers ?? {}).map(([qid, answer]) => (
                      <div key={qid} className="text-sm text-slate-600">
                        • {answer}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-slate-400 text-sm">No answers recorded.</div>
                )}
              </div>
            ))}
          </div>

          {/* priorities */}
          <div className="mt-6">
            <p className="text-slate-800 mb-2">Selected priorities</p>
            {client.priorities.length ? (
              <div className="flex flex-wrap gap-2">
                {client.priorities.map((pid) => {
                  const p = pillarData.find((x) => x.id === pid);
                  return (
                    <span key={pid} className="px-3 py-1 rounded-full border border-slate-300 text-slate-700 text-sm">
                      {p?.name ?? `Pillar ${pid}`}
                    </span>
                  );
                })}
              </div>
            ) : (
              <div className="text-slate-400 text-sm">None selected.</div>
            )}
          </div>

          {/* nav */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Button onClick={() => onViewObservations(client.id)} variant="outline">
              View Observations
            </Button>
            <Button onClick={() => onViewInterventions(client.id)} variant="outline">
              Open Plan
            </Button>
            <Button onClick={() => onViewSessionNotes(client.id)} variant="outline">
              Session Notes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
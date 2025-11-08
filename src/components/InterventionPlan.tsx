import React from 'react';
import * as storage from '../lib/storage';
import { pillarData } from '../data/pillarData';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

type Props = {
  clientId: string;
  refreshKey?: number;
  onBack: () => void;
};

export function InterventionPlan({ clientId, refreshKey = 0, onBack }: Props) {
  const client = React.useMemo(() => storage.getClient(clientId), [clientId, refreshKey]);
  if (!client) {
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Button variant="outline" onClick={onBack} className="mb-4">
            <ArrowLeft className="size-4 mr-2" /> Back
          </Button>
          <Card className="p-8 bg-white border-slate-200 shadow-sm">
            <p className="text-slate-900 mb-1">No client data found.</p>
            <p className="text-slate-500 text-sm">Complete an assessment first.</p>
          </Card>
        </div>
      </div>
    );
  }

  const displayName = client.name || client.id;
  const priorities = client.priorities ?? [];
  const byId = Object.fromEntries(pillarData.map((p) => [p.id, p]));

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-slate-900">Intervention Plan — {displayName}</h1>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="size-4 mr-2" /> Back
          </Button>
        </div>

        <Card className="p-4 bg-white border-slate-200 shadow-sm">
          <p className="text-slate-600 text-sm">Client: {displayName}</p>
        </Card>

        <Card className="p-6 bg-white border-slate-200 shadow-sm">
          <p className="text-slate-700 mb-3">Priority Areas</p>
          <div className="space-y-3">
            {priorities.length ? (
              priorities.map((pid) => {
                const pillar = byId[pid];
                const rating = client.responses?.[pid]?.rating ?? '—';
                return (
                  <div key={pid} className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-md p-3">
                    <div>
                      <p className="text-slate-900">{pillar?.name ?? `Pillar ${pid}`}</p>
                      <p className="text-slate-500 text-sm">{pillar?.subtitle}</p>
                    </div>
                    <div className="text-slate-700">Current rating: {rating}</div>
                  </div>
                );
              })
            ) : (
              <p className="text-slate-400 text-sm">No priorities selected.</p>
            )}
          </div>
        </Card>

        {/* Placeholder for future AI results */}
        <Card className="p-6 bg-white border-slate-200 shadow-sm">
          <p className="text-slate-700 mb-3">AI Recommendations (placeholder)</p>
          <ul className="list-disc pl-5 text-slate-700">
            <li>Later: call your AI function with this client record to produce goals/interventions.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
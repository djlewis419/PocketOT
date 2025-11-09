// src/components/InterventionPlan.tsx
import React from 'react';
import * as storage from '../lib/storage';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

type Props = { clientId: string; onBack: () => void };

export function InterventionPlan({ clientId, onBack }: Props) {
  const client = React.useMemo(() => (clientId ? storage.getClient(clientId) : undefined), [clientId]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-slate-900">Intervention Plan{client ? ` — ${client.name || client.id}` : ''}</h1>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="size-4 mr-2" /> Back
          </Button>
        </div>

        <Card className="p-6 bg-white border-slate-200 shadow-sm">
          <p className="text-slate-600 text-sm mb-4">
            (Placeholder) When AI is added, this section will synthesize assessment + observations.
          </p>
          <div className="space-y-3">
            <div className="border border-slate-200 rounded-lg p-4">
              <p className="text-slate-800 mb-1">Clinical Priorities</p>
              <p className="text-slate-500 text-sm">Coming soon.</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4">
              <p className="text-slate-800 mb-1">Short-term goals</p>
              <p className="text-slate-500 text-sm">Coming soon.</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4">
              <p className="text-slate-800 mb-1">Recommended interventions</p>
              <p className="text-slate-500 text-sm">Coming soon.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
import React from 'react';
import storage from '../lib/storage';
import { pillarData } from '../data/pillarData';

// UI bits (adjust these imports if your UI folder/names differ)
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, Clipboard, NotebookPen, MessageSquareText, ArrowLeft } from 'lucide-react';

type Props = {
  clientId: string;
  refreshKey?: number; // App bumps this after saving so we reload
  onBack: () => void;
  onViewObservations: (clientId: string) => void;
  onViewInterventions: (clientId: string) => void;
  onViewSessionNotes: (clientId: string) => void;
};

// Fallback getter in case storage doesn't expose getClient()
function getClientById(id: string) {
  try {
    const all = storage.getAllClients();
    return all[id] ?? null;
  } catch {
    return null;
  }
}

// Compute overall average (0–10)
function overallFromResponses(responses: Record<number, { rating: number }>): number {
  const ratings = Object.values(responses ?? {}).map(r => Number(r.rating ?? 0));
  if (!ratings.length) return 0;
  const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  return Math.round(avg * 10) / 10;
}

export function ViewAssessment({
  clientId,
  refreshKey = 0,
  onBack,
  onViewObservations,
  onViewInterventions,
  onViewSessionNotes,
}: Props) {
  // Always read fresh client data when clientId or refreshKey changes.
  const client = React.useMemo(() => getClientById(clientId), [clientId, refreshKey]);

  if (!client) {
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Button variant="outline" onClick={onBack} className="mb-4">
            <ArrowLeft className="size-4 mr-2" />
            Back to Dashboard
          </Button>
          <Card className="p-8 bg-white border-slate-200 shadow-sm">
            <p className="text-slate-900 mb-1">No data found for this client.</p>
            <p className="text-slate-500 text-sm">
              Ask the client to complete an assessment, then return here.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  const overall = overallFromResponses(client.responses || {});
  const priorities = (client.priorities ?? []) as number[];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header / Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-slate-900 mb-1">{client.name || client.id}</h1>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Calendar className="size-3" />
              <span>
                {client.dateISO
                  ? new Date(client.dateISO).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'No date'}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="size-4 mr-2" />
              Back
            </Button>
            <Button variant="outline" onClick={() => onViewObservations(clientId)}>
              <MessageSquareText className="size-4 mr-2" />
              Observations
            </Button>
            <Button variant="outline" onClick={() => onViewSessionNotes(clientId)}>
              <NotebookPen className="size-4 mr-2" />
              Session Notes
            </Button>
            <Button onClick={() => onViewInterventions(clientId)}>
              <Clipboard className="size-4 mr-2" />
              Open Plan
            </Button>
          </div>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 bg-white border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm mb-1">Client</p>
            <p className="text-slate-900 text-lg">{client.name || client.id}</p>
          </Card>

          <Card className="p-6 bg-white border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm mb-1">Assessment Date</p>
            <p className="text-slate-900 text-lg">
              {client.dateISO
                ? new Date(client.dateISO).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : '—'}
            </p>
          </Card>

          <Card className="p-6 bg-white border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm mb-1">Overall Score</p>
            <p className="text-slate-900 text-lg">{overall}/10</p>
          </Card>
        </div>

        {/* Priorities */}
        <Card className="p-6 bg-white border-slate-200 shadow-sm">
          <p className="text-slate-700 mb-3">Selected Priorities</p>
          <div className="flex flex-wrap gap-2">
            {priorities.length ? (
              priorities.map((pid) => {
                const p = pillarData.find((x) => x.id === pid);
                return (
                  <Badge key={pid} variant="outline" className="bg-slate-50 border-slate-300">
                    {p ? p.name : `Pillar ${pid}`}
                  </Badge>
                );
              })
            ) : (
              <span className="text-slate-400 text-sm">No priorities selected.</span>
            )}
          </div>
        </Card>

        {/* Pillar-by-pillar details */}
        <div className="space-y-4">
          {pillarData.map((pillar) => {
            const pillarResp = client.responses?.[pillar.id];
            const rating = pillarResp?.rating ?? null;
            const answers = pillarResp?.answers ?? {};

            return (
              <Card key={pillar.id} className="p-6 bg-white border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-slate-900">{pillar.name}</p>
                    <p className="text-slate-500 text-sm">{pillar.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 text-xs mb-1">Rating</p>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100">
                      <span className="text-slate-700">{rating ?? '—'}</span>
                    </div>
                  </div>
                </div>

                {/* Answers */}
                <div className="mt-4 space-y-3">
                  {Object.keys(answers).length ? (
                    Object.entries(answers).map(([qid, text]) => (
                      <div key={qid} className="bg-slate-50 rounded-md p-3 border border-slate-200">
                        <p className="text-slate-500 text-xs mb-1">Answer</p>
                        <p className="text-slate-800 whitespace-pre-wrap">{text || '—'}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-sm">No written answers.</p>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
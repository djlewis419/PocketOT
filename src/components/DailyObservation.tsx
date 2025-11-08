// src/components/DailyObservation.tsx — colorful client view (mood + note)
import React from 'react';
import * as storage from '../lib/storage';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';

type Props = {
  clientId: string;
  onBack: () => void;
  onSaved?: (clientId: string) => void;
};

export function DailyObservation({ clientId, onBack, onSaved }: Props) {
  const client = React.useMemo(() => (clientId ? storage.getClient(clientId) : null), [clientId]);
  const [text, setText] = React.useState('');
  const [mood, setMood] = React.useState<number>(5);
  const [observations, setObservations] = React.useState<storage.Observation[]>([]);

  React.useEffect(() => {
    if (!clientId) return;
    setObservations(storage.getObservations(clientId));
  }, [clientId]);

  if (!client) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 p-6">
        <div className="max-w-2xl mx-auto space-y-4">
          <Card className="p-6 bg-white/80 backdrop-blur rounded-2xl border-slate-200 shadow-lg">
            <p className="text-slate-900 mb-2">Daily Observation</p>
            <p className="text-slate-600">Please complete the assessment first.</p>
            <div className="mt-4">
              <Button variant="outline" onClick={onBack} className="border-slate-300 hover:bg-slate-50">
                Back
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (!text.trim()) {
      alert('Please write a short note before saving.');
      return;
    }
    storage.addObservation(client.id, {
      id: `obs-${Date.now()}`,
      dateISO: new Date().toISOString(),
      text,
      mood,
      flagged: false,
    });
    setObservations(storage.getObservations(client.id));
    setText('');
    setMood(5);
    onSaved?.(client.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Main card */}
        <Card className="p-8 md:p-10 bg-white/80 backdrop-blur rounded-3xl border-slate-200 shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-slate-900 mb-1">Daily Observation</h2>
              <p className="text-slate-600 text-sm">For: {client.name || client.id}</p>
            </div>
            <Button
              variant="outline"
              onClick={onBack}
              className="border-slate-300 hover:bg-slate-50"
            >
              Back
            </Button>
          </div>

          {/* Mood */}
          <div className="mt-8">
            <p className="text-slate-700 mb-3 text-center">Mood / Wellness (0–10)</p>
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <Slider
                value={[mood]}
                onValueChange={(v) => setMood(v[0])}
                min={0}
                max={10}
                step={1}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm mt-4">
                <span className="text-slate-500">0</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-600">Your rating:</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full">
                    {mood}/10
                  </span>
                </div>
                <span className="text-slate-500">10</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-8">
            <p className="text-slate-700 mb-3">Notes</p>
            <Textarea
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a short reflection for today…"
              className="bg-slate-50 border-slate-200 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-3">
            <Button
              onClick={handleSave}
              className="flex-1 py-6 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
              size="lg"
            >
              Save Reflection
            </Button>
            <Button
              variant="outline"
              onClick={onBack}
              className="px-8 border-slate-300 hover:bg-slate-50"
            >
              Back
            </Button>
          </div>
        </Card>

        {/* Recent reflections */}
        <Card className="p-6 bg-white/80 backdrop-blur rounded-3xl border-slate-200 shadow-lg">
          <p className="text-slate-900 mb-4">Recent reflections</p>
          {observations.length === 0 ? (
            <p className="text-slate-600 text-sm">No reflections yet.</p>
          ) : (
            <div className="space-y-3">
              {observations.slice(0, 5).map((o) => (
                <div
                  key={o.id}
                  className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2 text-sm text-slate-600">
                    <span>{new Date(o.dateISO).toLocaleString()}</span>
                    <span>
                      Mood:{' '}
                      <span className="px-2 py-0.5 rounded-full text-white bg-gradient-to-r from-teal-500 to-blue-500">
                        {o.mood}/10
                      </span>
                    </span>
                  </div>
                  <div className="text-slate-800 whitespace-pre-wrap">{o.text || '—'}</div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
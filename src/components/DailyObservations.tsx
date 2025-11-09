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
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto space-y-4">
          <Card className="p-6 bg-white border-slate-200 shadow-sm">
            <p className="text-slate-900 mb-2">Daily Observation</p>
            <p className="text-slate-500">Please complete the assessment first.</p>
            <div className="mt-4">
              <Button variant="outline" onClick={onBack}>Back</Button>
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="p-6 bg-white border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-900 mb-1">Daily Observation</p>
              <p className="text-slate-500 text-sm">For: {client.name || client.id}</p>
            </div>
            <Button variant="outline" onClick={onBack}>Back</Button>
          </div>

          <div className="mt-6">
            <p className="text-slate-700 mb-2">Mood / Wellness (0–10)</p>
            <Slider value={[mood]} onValueChange={(v) => setMood(v[0])} min={0} max={10} step={1} className="w-full" />
            <div className="mt-2 text-slate-600">Current: {mood}/10</div>
          </div>

          <div className="mt-6">
            <p className="text-slate-700 mb-2">Notes</p>
            <Textarea
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a short reflection for today…"
              className="bg-slate-50 border-slate-200"
            />
          </div>

          <div className="mt-6 flex gap-2">
            <Button onClick={handleSave}>Save Reflection</Button>
            <Button variant="outline" onClick={onBack}>Back</Button>
          </div>
        </Card>

        <Card className="p-6 bg-white border-slate-200 shadow-sm">
          <p className="text-slate-900 mb-4">Recent reflections</p>
          {observations.length === 0 ? (
            <p className="text-slate-500 text-sm">No reflections yet.</p>
          ) : (
            <div className="space-y-3">
              {observations.slice(0, 5).map((o) => (
                <div key={o.id} className="border border-slate-200 rounded-md p-3 bg-slate-50">
                  <div className="flex items-center justify-between mb-2 text-sm text-slate-600">
                    <span>{new Date(o.dateISO).toLocaleString()}</span>
                    <span>Mood: {o.mood}/10</span>
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
import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ArrowLeft, NotebookPen } from 'lucide-react';
import * as storage from '../lib/storage';

type Props = {
  clientId: string;
  onBack: () => void;
};

export function SessionNotes({ clientId, onBack }: Props) {
  const client = storage.getClient(clientId);
  const [note, setNote] = React.useState('');

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-slate-900">Session Notes — {client?.name || clientId}</h1>
          <Button variant="outline" onClick={onBack} className="border-slate-300 bg-white/80 hover:bg-white">
            <ArrowLeft className="size-4 mr-2" /> Back
          </Button>
        </div>

        <Card className="p-6 bg-white/80 backdrop-blur border-slate-200 shadow-lg rounded-2xl">
          <div className="flex items-start gap-3">
            <NotebookPen className="size-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-slate-800 mb-2 font-medium">Private therapist notes</p>
              <Textarea
                rows={10}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Type your session notes here…"
                className="bg-white border-slate-300"
              />
              <div className="mt-3 flex gap-2">
                <Button className="bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:from-teal-700 hover:to-blue-700">
                  Save
                </Button>
                <Button variant="outline" className="border-slate-300 bg-white/80 hover:bg-white" onClick={onBack}>
                  Back
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
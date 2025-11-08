import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Save } from 'lucide-react';

interface AddNoteModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (note: string, flagged: boolean) => void;
  clientName?: string;
}

export function AddNoteModal({ open, onClose, onSave, clientName }: AddNoteModalProps) {
  const [note, setNote] = useState('');
  const [flagged, setFlagged] = useState(false);

  const handleSave = () => {
    if (note.trim()) {
      onSave(note, flagged);
      setNote('');
      setFlagged(false);
      onClose();
    }
  };

  const handleCancel = () => {
    setNote('');
    setFlagged(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {clientName ? `Add Note — ${clientName}` : 'Add Note / Flag for Review'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-slate-700 mb-2 block">
              Note or Observation
            </Label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add note or observation..."
              rows={5}
              className="bg-white"
            />
          </div>

          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <Checkbox
              id="flag-client"
              checked={flagged}
              onCheckedChange={(checked) => setFlagged(checked as boolean)}
            />
            <Label
              htmlFor="flag-client"
              className="text-slate-700 cursor-pointer leading-tight"
            >
              Flag this client for follow-up discussion
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!note.trim()}
            className="bg-slate-700 hover:bg-slate-800"
          >
            <Save className="size-4 mr-2" />
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

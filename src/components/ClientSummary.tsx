import { useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { ChevronRight } from 'lucide-react';

interface PillarSummary {
  id: number;
  name: string;
  subtitle: string;
  score: number;
  color: string;
}

interface ClientSummaryProps {
  pillars: PillarSummary[];
  onComplete: (selectedPillars: number[]) => void;
  onBack?: () => void;
}

export function ClientSummary({ pillars, onComplete, onBack }: ClientSummaryProps) {
  const [selectedPillars, setSelectedPillars] = useState<number[]>([]);

  const togglePillar = (id: number) => {
    if (selectedPillars.includes(id)) {
      setSelectedPillars(selectedPillars.filter(p => p !== id));
    } else {
      if (selectedPillars.length < 3) {
        setSelectedPillars([...selectedPillars, id]);
      }
    }
  };

  const handleContinue = () => {
    if (selectedPillars.length === 3) {
      onComplete(selectedPillars);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-100 text-green-700';
    if (score >= 6) return 'bg-blue-100 text-blue-700';
    if (score >= 4) return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-2xl mx-auto p-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-white rounded-2xl shadow-sm mb-4">
            <div className="size-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center">
              <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h2 className="text-slate-900 mb-3">Choose 3 pillars you'd like to work on the most</h2>
          <p className="text-slate-600">
            Select the areas that feel most important to focus on right now
          </p>
          
          {/* Selection counter */}
          <div className="mt-4">
            <Badge 
              variant="outline" 
              className={`${selectedPillars.length === 3 ? 'bg-green-50 text-green-700 border-green-300' : 'bg-slate-100 text-slate-600'}`}
            >
              {selectedPillars.length} of 3 selected
            </Badge>
          </div>
        </div>

        {/* Pillar tiles */}
        <div className="space-y-3 mb-8">
          {pillars.map((pillar) => {
            const isSelected = selectedPillars.includes(pillar.id);
            const isDisabled = !isSelected && selectedPillars.length >= 3;

            return (
              <div
                key={pillar.id}
                className={`bg-white rounded-xl shadow-sm p-5 transition-all ${
                  isSelected 
                    ? 'ring-2 ring-teal-500 shadow-md' 
                    : isDisabled 
                    ? 'opacity-40' 
                    : 'hover:shadow-md'
                } ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => !isDisabled && togglePillar(pillar.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="pt-1">
                    <Checkbox
                      id={`pillar-${pillar.id}`}
                      checked={isSelected}
                      disabled={isDisabled}
                      onCheckedChange={() => !isDisabled && togglePillar(pillar.id)}
                      className={isSelected ? 'border-teal-500' : ''}
                    />
                  </div>
                  
                  <Label
                    htmlFor={`pillar-${pillar.id}`}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-slate-900 mb-1">
                          {pillar.name}
                        </h3>
                        <p className="text-slate-500 text-sm mb-2">
                          {pillar.subtitle}
                        </p>
                      </div>
                      
                      <Badge className={`${getScoreColor(pillar.score)} shrink-0`}>
                        {pillar.score}/10
                      </Badge>
                    </div>
                  </Label>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {onBack && (
            <Button
              onClick={onBack}
              variant="outline"
              className="px-8"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleContinue}
            disabled={selectedPillars.length !== 3}
            className={`flex-1 py-6 text-white ${
              selectedPillars.length === 3
                ? 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600'
                : 'bg-slate-300 cursor-not-allowed'
            }`}
            size="lg"
          >
            CONTINUE
            <ChevronRight className="size-5 ml-2" />
          </Button>
        </div>

        {selectedPillars.length < 3 && (
          <p className="text-slate-500 text-sm text-center mt-4">
            Please select {3 - selectedPillars.length} more {3 - selectedPillars.length === 1 ? 'pillar' : 'pillars'} to continue
          </p>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { ChevronRight } from 'lucide-react';

interface Question {
  id: string;
  text: string;
}

interface PillarData {
  id: number;
  name: string;
  subtitle: string;
  color: string;
  sliderQuestion: string;
  questions: Question[];
}

interface ClientPillarAssessmentProps {
  pillarData: PillarData;
  currentStep: number;
  totalSteps: number;
  onNext: (responses: { rating: number; answers: Record<string, string> }) => void;
  onBack?: () => void;
}

export function ClientPillarAssessment({
  pillarData,
  currentStep,
  totalSteps,
  onNext,
  onBack
}: ClientPillarAssessmentProps) {
  const [rating, setRating] = useState<number>(5);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const updateAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    onNext({ rating, answers });
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-2xl mx-auto py-8">
        {/* Subtle progress indication */}
        <div className="text-center mb-8">
          <p className="text-slate-400 text-sm">
            Section {currentStep} of {totalSteps} — {pillarData.name}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-3xl shadow-lg p-8 md:p-12">
          {/* Pillar header */}
          <div className="text-center mb-12">
            <div className={`inline-block px-4 py-2 ${pillarData.color} rounded-full mb-4`}>
              <span className="text-slate-700 text-sm">Pillar {pillarData.id}</span>
            </div>
            <h2 className="text-slate-900 mb-2">{pillarData.name}</h2>
            <p className="text-slate-500">{pillarData.subtitle}</p>
          </div>

          {/* Slider section */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <p className="text-slate-700 mb-6 text-center">
              {pillarData.sliderQuestion}
            </p>
            
            <div className="space-y-4">
              <Slider
                value={[rating]}
                onValueChange={(value) => setRating(value[0])}
                min={0}
                max={10}
                step={1}
                className="w-full"
              />
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">0</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-600">Your rating:</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full">
                    {rating}/10
                  </span>
                </div>
                <span className="text-slate-500">10</span>
              </div>
            </div>
          </div>

          {/* Questions section */}
          <div className="space-y-4 mb-8">
            {pillarData.questions.map((question, index) => (
              <div key={question.id} className="bg-white rounded-xl shadow-sm p-6">
                <label className="block mb-3">
                  <span className="text-slate-700 text-sm mb-2 block">
                    {question.text}
                  </span>
                  <Textarea
                    value={answers[question.id] || ''}
                    onChange={(e) => updateAnswer(question.id, e.target.value)}
                    placeholder="Share your thoughts here..."
                    rows={3}
                    className="bg-slate-50 border-slate-200 resize-none"
                  />
                </label>
              </div>
            ))}
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
              onClick={handleNext}
              className="flex-1 py-6 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
              size="lg"
            >
              NEXT
              <ChevronRight className="size-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
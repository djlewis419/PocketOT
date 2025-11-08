import { Button } from './ui/button';
import { Card } from './ui/card';
import { CheckCircle2, Calendar } from 'lucide-react';

interface ClientCompleteProps {
  onViewResults?: () => void;
  onReturnHome?: () => void;
  onScheduleConsultation?: () => void;
}

export function ClientComplete({ 
  onViewResults, 
  onReturnHome,
  onScheduleConsultation 
}: ClientCompleteProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* Success icon */}
        <div className="inline-block mb-8">
          <div className="p-6 bg-white rounded-3xl shadow-lg">
            <CheckCircle2 className="size-20 text-teal-500" strokeWidth={1.5} />
          </div>
        </div>

        {/* Success message */}
        <h1 className="text-slate-900 mb-4">Assessment Complete</h1>
        
        {/* Compassionate encouragement */}
        <div className="mb-8">
          <p className="text-slate-700 text-xl leading-relaxed mb-4">
            Thank you for showing up for yourself.
          </p>
          <p className="text-slate-600 text-lg">
            You've taken an important step toward understanding who you are and how you thrive.
          </p>
        </div>

        {/* Info card */}
        <Card className="p-8 mb-8 text-left bg-white border-stone-200 shadow-md">
          <h3 className="text-slate-900 mb-4">What happens next?</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="size-8 bg-teal-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-teal-700">1</span>
              </div>
              <p className="text-slate-600">
                Your therapist will review your assessment and insights
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="size-8 bg-indigo-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-indigo-700">2</span>
              </div>
              <p className="text-slate-600">
                Together, you'll create a personalized intervention plan
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="size-8 bg-amber-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-amber-700">3</span>
              </div>
              <p className="text-slate-600">
                You can track your progress through daily observations
              </p>
            </div>
          </div>
        </Card>

        {/* Schedule Consultation CTA */}
        {onScheduleConsultation && (
          <Card className="p-6 mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="size-12 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                <Calendar className="size-6 text-indigo-600" />
              </div>
              <div className="flex-1 text-left">
                <h4 className="text-slate-900 mb-1">Ready to discuss your insights?</h4>
                <p className="text-slate-600 text-sm">
                  Book a session with your occupational therapist
                </p>
              </div>
              <Button
                onClick={onScheduleConsultation}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Schedule
              </Button>
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="space-y-3">
          {onViewResults && (
            <Button
              onClick={onViewResults}
              className="w-full py-6 bg-teal-600 hover:bg-teal-700 text-white"
              size="lg"
            >
              View My Summary
            </Button>
          )}
          {onReturnHome && (
            <Button
              onClick={onReturnHome}
              variant="outline"
              className="w-full py-6 border-stone-300 hover:bg-stone-50"
              size="lg"
            >
              Return to Home
            </Button>
          )}
        </div>

        {/* Inspirational footer */}
        <p className="text-slate-500 italic mt-8">
          "Healing isn't about perfection — it's about alignment."
        </p>
      </div>
    </div>
  );
}

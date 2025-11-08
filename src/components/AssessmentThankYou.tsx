import { Button } from './ui/button';
import { CheckCircle2 } from 'lucide-react';

interface AssessmentThankYouProps {
  onReturnHome: () => void;
  onScheduleConsultation?: () => void;
}

export function AssessmentThankYou({ 
  onReturnHome,
  onScheduleConsultation 
}: AssessmentThankYouProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-teal-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center animate-in fade-in duration-1000">
        {/* Success icon */}
        <div className="inline-block mb-8">
          <div className="p-6 bg-white rounded-full shadow-lg">
            <CheckCircle2 className="size-20 text-teal-500" strokeWidth={1.5} />
          </div>
        </div>

        {/* Main message */}
        <div className="mb-8 space-y-6">
          <h1 className="text-slate-900">
            Thank you for taking this time for yourself.
          </h1>
          <p className="text-slate-700 text-xl leading-relaxed" style={{ fontFamily: 'Georgia, serif', fontWeight: 300 }}>
            Awareness is the beginning of every transformation.
          </p>
          <p className="text-slate-600 text-lg">
            You've completed your assessment.
          </p>
        </div>

        {/* Optional scheduling prompt */}
        <div className="mb-12">
          <p className="text-slate-500">
            You can schedule a consultation anytime to discuss your insights and next steps.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3 max-w-md mx-auto">
          {onScheduleConsultation && (
            <Button
              onClick={onScheduleConsultation}
              className="w-full py-6 bg-teal-600 hover:bg-teal-700 text-white"
              size="lg"
            >
              Schedule Consultation
            </Button>
          )}
          <Button
            onClick={onReturnHome}
            variant="outline"
            className="w-full py-6 border-stone-300 hover:bg-stone-100"
            size="lg"
          >
            Return Home
          </Button>
        </div>

        {/* Footer encouragement */}
        <p className="text-slate-500 italic mt-12">
          Awareness creates change. Keep showing up for yourself.
        </p>
      </div>
    </div>
  );
}

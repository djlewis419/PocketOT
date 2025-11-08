import { Button } from './ui/button';

interface AssessmentIntroProps {
  onBeginPillars: () => void;
}

export function AssessmentIntro({ onBeginPillars }: AssessmentIntroProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center animate-in fade-in duration-1000">
        {/* Decorative element */}
        <div className="mb-8">
          <div className="inline-block p-3 bg-white/80 backdrop-blur rounded-full shadow-lg">
            <div className="size-20 bg-gradient-to-br from-teal-400 to-indigo-400 rounded-full flex items-center justify-center">
              <svg 
                className="size-12 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Main message */}
        <div className="mb-8 space-y-6">
          <p className="text-slate-700 text-xl leading-relaxed" style={{ fontFamily: 'Georgia, serif', fontWeight: 300 }}>
            This assessment is not about fixing you.
          </p>
          <p className="text-slate-700 text-xl leading-relaxed" style={{ fontFamily: 'Georgia, serif', fontWeight: 300 }}>
            It's about <span className="text-teal-600">understanding you</span> — how you live, what shapes you,
            and what brings you closer to the person you're called to become.
          </p>
        </div>

        {/* Additional guidance */}
        <div className="mb-12 space-y-2">
          <p className="text-slate-600">
            We'll walk through six areas of your daily life.
          </p>
          <p className="text-slate-500">
            Take your time, reflect honestly, and trust your answers.
          </p>
        </div>

        {/* CTA Button */}
        <Button
          onClick={onBeginPillars}
          className="px-10 py-6 bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white shadow-lg text-lg"
        >
          Start My Assessment
        </Button>
      </div>
    </div>
  );
}

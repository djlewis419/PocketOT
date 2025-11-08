import { Compass, Sun, Calendar, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface ClientHomeProps {
  onStartAssessment: () => void;
  onDailyObservation?: () => void;
  onScheduleConsultation?: () => void;
  clientName?: string;
  lastAssessmentDate?: string;
  lastObservationDate?: string;
  nextSessionDate?: string;
}

export function ClientHome({ 
  onStartAssessment, 
  onDailyObservation,
  onScheduleConsultation,
  clientName = 'there',
  lastAssessmentDate,
  lastObservationDate,
  nextSessionDate
}: ClientHomeProps) {
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  // Get current date
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  const actions = [
    {
      id: 'assessment',
      icon: Compass,
      title: 'Start Assessment',
      subtitle: 'Take your self-assessment to explore your wellbeing across six areas.',
      continuity: lastAssessmentDate || 'Not yet completed.',
      continuityLabel: 'Last completed',
      onClick: onStartAssessment,
      color: 'text-teal-600'
    },
    {
      id: 'observation',
      icon: Sun,
      title: 'Daily Observation',
      subtitle: 'Reflect on your day and notice what supported or challenged you.',
      continuity: lastObservationDate || 'No entries yet.',
      continuityLabel: 'Last reflection',
      onClick: onDailyObservation || (() => {}),
      color: 'text-amber-600'
    },
    {
      id: 'consultation',
      icon: Calendar,
      title: 'Schedule Consultation',
      subtitle: 'Book a session with your occupational therapist to discuss your insights.',
      continuity: nextSessionDate || 'None scheduled.',
      continuityLabel: 'Next session',
      onClick: onScheduleConsultation || (() => {}),
      color: 'text-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top gradient section */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-teal-50 via-amber-50/30 to-transparent" />
        
        {/* Content */}
        <div className="relative max-w-3xl mx-auto px-6 py-16">
          {/* Top Section - Welcome */}
          <div className="text-center mb-24 animate-in fade-in duration-700">
            <h1 className="text-slate-900 mb-3">
              Welcome back, {clientName}
            </h1>
            <p className="text-slate-500 text-lg mb-2">
              Your space to reflect, realign, and grow.
            </p>
            <p className="text-slate-400 text-sm">
              Today is {dateString}
            </p>
          </div>

          {/* Middle Section - Main Actions */}
          <div className="space-y-12 mb-32">
            {actions.map((action, index) => (
              <div
                key={action.id}
                className="group cursor-pointer animate-in slide-in-from-bottom duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={action.onClick}
                onMouseEnter={() => setHoveredAction(action.id)}
                onMouseLeave={() => setHoveredAction(null)}
              >
                <div className="py-8 border-b border-stone-200 hover:border-teal-300 transition-colors duration-300">
                  <div className="flex items-start gap-4 mb-3">
                    {/* Icon */}
                    <div className={`${action.color} mt-1 transition-transform duration-300 group-hover:scale-110`}>
                      <action.icon className="size-7" />
                    </div>
                    
                    {/* Text Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className={`${action.color} transition-colors duration-300`}>
                          {action.title}
                        </h2>
                        <ArrowRight 
                          className={`size-5 ${action.color} transition-all duration-300 ${
                            hoveredAction === action.id ? 'translate-x-2 opacity-100' : 'translate-x-0 opacity-0'
                          }`}
                        />
                      </div>
                      <p className="text-slate-600 max-w-xl mb-3">
                        {action.subtitle}
                      </p>
                      {/* Continuity line */}
                      <p className="text-slate-400 text-sm">
                        {action.continuityLabel}: {action.continuity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Inspirational Divider */}
          <div className="text-center mb-32 px-8 animate-in fade-in duration-1000 delay-500">
            <p className="text-slate-700 text-xl leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'Georgia, serif', fontWeight: 300 }}>
              "This assessment is not about fixing you.
              <br />
              It's about understanding you — how you live, what shapes you,
              <br />
              and what brings you closer to the person you're called to become."
            </p>
          </div>

          {/* Bottom Section - Footer */}
          <div className="text-center space-y-6 pb-12 animate-in fade-in duration-1000 delay-700">
            <p className="text-slate-600 italic">
              Awareness creates change. Keep showing up for yourself.
            </p>
            
            <div className="flex items-center justify-center gap-4 text-slate-400 text-sm">
              <button className="hover:text-slate-600 transition-colors">About</button>
              <span>•</span>
              <button className="hover:text-slate-600 transition-colors">Privacy</button>
              <span>•</span>
              <button className="hover:text-slate-600 transition-colors">Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

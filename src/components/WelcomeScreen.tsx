import { ViewType } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Sparkles, BookOpen, Brain } from 'lucide-react';

interface WelcomeScreenProps {
  onNavigate: (view: ViewType) => void;
}

export function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center size-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full mb-4">
            <Sparkles className="size-8 text-white" />
          </div>
          <h1 className="text-teal-900 mb-3">Welcome to Pocket OT</h1>
          <p className="text-slate-600 max-w-lg mx-auto leading-relaxed">
            Your personal pathway to understanding and improving your daily life
          </p>
        </div>

        {/* Main Actions */}
        <div className="space-y-4 mb-8">
          <Card
            className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-teal-200 bg-white/80 backdrop-blur"
            onClick={() => onNavigate('assessment')}
          >
            <div className="flex items-start gap-4">
              <div className="size-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="size-6 text-teal-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 mb-1">Start My Assessment</h3>
                <p className="text-slate-600">
                  Discover insights about yourself through six key areas of daily life
                </p>
              </div>
            </div>
          </Card>

          <Card
            className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-blue-200 bg-white/80 backdrop-blur"
            onClick={() => onNavigate('daily')}
          >
            <div className="flex items-start gap-4">
              <div className="size-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <BookOpen className="size-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 mb-1">Daily Observations</h3>
                <p className="text-slate-600">
                  Reflect on your day and build awareness of patterns over time
                </p>
              </div>
            </div>
          </Card>

          <Card
            className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-purple-200 bg-white/80 backdrop-blur"
            onClick={() => onNavigate('summary')}
          >
            <div className="flex items-start gap-4">
              <div className="size-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Brain className="size-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 mb-1">View My AI Summary</h3>
                <p className="text-slate-600">
                  See your personalized insights and areas of focus
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Soft CTA */}
        <div className="text-center text-slate-500">
          <p>Take your time. There are no wrong answers.</p>
        </div>
      </div>
    </div>
  );
}

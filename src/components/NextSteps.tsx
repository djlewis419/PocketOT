import { ViewType } from '../App';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ArrowLeft, Calendar, MapPin, RefreshCw, Sparkles } from 'lucide-react';

interface NextStepsProps {
  onNavigate: (view: ViewType) => void;
}

export function NextSteps({ onNavigate }: NextStepsProps) {
  return (
    <div className="min-h-screen p-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate('welcome')}
            className="mb-6 -ml-2"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Welcome
          </Button>

          <h1 className="text-slate-900 mb-2">Your Next Steps</h1>
          <p className="text-slate-600">
            Choose what feels right for you. There's no pressure--just possibilities.
          </p>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Schedule Consultation */}
          <Card className="p-8 bg-white/90 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="size-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
              <Calendar className="size-6 text-teal-600" />
            </div>
            <h2 className="text-slate-900 mb-3">Schedule a Consultation</h2>
            <p className="text-slate-600 mb-6">
              Connect with a licensed occupational therapist who can provide personalized guidance and support.
            </p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-slate-700 mb-2 block">Preferred date</label>
                <Input type="date" className="bg-slate-50/50" />
              </div>
              <div>
                <label className="text-slate-700 mb-2 block">Time preference</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-md bg-slate-50/50">
                  <option>Morning (8am - 12pm)</option>
                  <option>Afternoon (12pm - 5pm)</option>
                  <option>Evening (5pm - 8pm)</option>
                </select>
              </div>
              <div>
                <label className="text-slate-700 mb-2 block">What would you like to focus on?</label>
                <Textarea
                  placeholder="Share your goals or what you'd like help with..."
                  rows={3}
                  className="resize-none bg-slate-50/50"
                />
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-teal-500 to-blue-500">
              Request Consultation
            </Button>
          </Card>

          {/* Set a Goal */}
          <Card className="p-8 bg-white/90 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="size-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="size-6 text-purple-600" />
            </div>
            <h2 className="text-slate-900 mb-3">Set a Personal Goal</h2>
            <p className="text-slate-600 mb-6">
              Define one small, meaningful goal to work toward. We'll help you track progress.
            </p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-slate-700 mb-2 block">My goal</label>
                <Input
                  placeholder="e.g., Walk for 10 minutes each morning"
                  className="bg-slate-50/50"
                />
              </div>
              <div>
                <label className="text-slate-700 mb-2 block">Why this matters to me</label>
                <Textarea
                  placeholder="Connect your goal to something meaningful..."
                  rows={3}
                  className="resize-none bg-slate-50/50"
                />
              </div>
              <div>
                <label className="text-slate-700 mb-2 block">Timeline</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-md bg-slate-50/50">
                  <option>This week</option>
                  <option>Next 2 weeks</option>
                  <option>This month</option>
                  <option>Next 3 months</option>
                </select>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
              Set My Goal
            </Button>
          </Card>
        </div>

        {/* Additional Options */}
        <div className="space-y-4">
          <h3 className="text-slate-700">Explore More Options</h3>

          <Card className="p-6 bg-white/80 backdrop-blur hover:bg-white transition-colors cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="size-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="size-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-slate-900 mb-1">View Local Resources</h4>
                <p className="text-slate-600">
                  Find community programs, support groups, and services in your area that align with your goals.
                </p>
              </div>
              <Button variant="outline">Browse</Button>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur hover:bg-white transition-colors cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="size-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <RefreshCw className="size-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-slate-900 mb-1">Re-take Assessment</h4>
                <p className="text-slate-600">
                  Check in with yourself again. It can be helpful to track how things evolve over time.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => onNavigate('assessment')}
              >
                Start
              </Button>
            </div>
          </Card>
        </div>

        {/* Resources Section */}
        <Card className="mt-8 p-8 bg-gradient-to-br from-teal-50 to-blue-50 border-0">
          <h3 className="text-slate-900 mb-4">While You're Here</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="size-2 bg-teal-600 rounded-full mt-2 flex-shrink-0" />
              <p className="text-slate-700">
                <strong>Daily Observations:</strong> Start building awareness through gentle daily reflection
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="size-2 bg-teal-600 rounded-full mt-2 flex-shrink-0" />
              <p className="text-slate-700">
                <strong>Resource Library:</strong> Access articles, exercises, and strategies curated for you
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="size-2 bg-teal-600 rounded-full mt-2 flex-shrink-0" />
              <p className="text-slate-700">
                <strong>Community:</strong> Connect with others on similar journeys (optional, always private)
              </p>
            </div>
          </div>
        </Card>

        {/* Encouraging Message */}
        <Card className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-0">
          <p className="text-slate-700 text-center italic">
            "Every step forward--no matter how small--is worth celebrating. You're doing important work."
          </p>
        </Card>
      </div>
    </div>
  );
}
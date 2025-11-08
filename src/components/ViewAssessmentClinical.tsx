import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import {
  ArrowLeft,
  Edit3,
  Flag,
  Download,
  ChevronDown,
  ChevronUp,
  Brain,
  Calendar,
  BarChart3,
  ChevronRight,
  FileText
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface ViewAssessmentProps {
  clientId: string;
  onBack: () => void;
  onViewObservations: (clientId: string) => void;
  onViewInterventions: (clientId: string) => void;
}

const pillarData = [
  {
    id: 1,
    name: 'Physical Performance Optimization',
    color: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-400', badge: 'bg-teal-100 text-teal-700' },
    score: 5,
    questions: [
      {
        question: 'What physical activities or daily tasks make up most of your routine?',
        response: 'I walk to the store a few times a week, do light housework, and try to stretch in the morning. I work at a desk most of the day.'
      },
      {
        question: 'Which of these activities feel easiest or most natural for you?',
        response: 'Walking feels good when I have energy. Stretching helps me feel more awake.'
      },
      {
        question: 'Where do you notice fatigue, pain, or limitation?',
        response: 'I get exhausted in the afternoons - like a crash. My shoulders and neck are tight from sitting. Sometimes my legs feel heavy.'
      }
    ],
    rating: {
      question: 'How physically capable and energized do you feel day-to-day?',
      score: 5
    },
    aiInsightShort: 'Client demonstrates moderate limitations in endurance and energy regulation (body functions) impacting sustained participation in work occupation and IADLs. Motor skills functional for light physical activity. Postural pain (shoulders/neck) reduces efficiency during desk work. Temporal pattern of afternoon fatigue affects task completion rates.'
  },
  {
    id: 2,
    name: 'Cognitive Function Optimization',
    color: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-400', badge: 'bg-blue-100 text-blue-700' },
    score: 7,
    questions: [
      {
        question: 'What daily activities require the most mental focus or organization?',
        response: 'Work projects, managing my schedule, and planning meals. Also keeping track of bills and appointments.'
      },
      {
        question: 'When do you feel mentally sharp or productive?',
        response: 'Mornings are best, especially if I slept well. When I have quiet time without interruptions.'
      },
      {
        question: 'What situations make it difficult to stay focused or plan ahead?',
        response: 'Open office noise is really distracting. When I\'m anxious, my mind races. Afternoon slump makes thinking harder.'
      }
    ],
    rating: {
      question: 'How mentally clear and focused do you feel throughout your week?',
      score: 7
    },
    aiInsightShort: 'Process skills (organizing, sequencing, problem-solving) demonstrate adequate function under controlled environmental conditions. Physical context barriers (auditory distractions in open office) reduce cognitive efficiency by estimated 30-40%. Anxiety-related attentional deficits noted during high-stress tasks. Sleep quality directly correlates with cognitive performance.'
  },
  {
    id: 3,
    name: 'Emotional Wellbeing Optimization',
    color: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-400', badge: 'bg-purple-100 text-purple-700' },
    score: 4,
    questions: [
      {
        question: 'What activities or environments help you feel calm and grounded?',
        response: 'Being in nature, meditation when I actually do it, talking with close friends. Reading before bed sometimes helps.'
      },
      {
        question: 'What moments trigger stress or emotional strain?',
        response: 'Work deadlines, feeling behind on everything, worrying about money. Not sleeping well makes everything worse.'
      },
      {
        question: 'How do your emotions influence your ability to engage in meaningful tasks?',
        response: 'When I\'m anxious, I can\'t focus or enjoy anything. When I\'m overwhelmed, I shut down and avoid things I need to do.'
      }
    ],
    rating: {
      question: 'How emotionally balanced and steady do you feel most days?',
      score: 4
    },
    aiInsightShort: 'Emotional regulation impairment (body functions) causing moderate functional limitations across multiple occupation domains. Sleep/rest occupation disruption compounds dysregulation. Avoidance behaviors reduce participation when overwhelmed. Social interaction skills intact (seeks support from friends). Inconsistent use of identified coping strategies reduces effectiveness.'
  },
  {
    id: 4,
    name: 'Purposeful Living',
    color: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-400', badge: 'bg-indigo-100 text-indigo-700' },
    score: 6,
    questions: [
      {
        question: 'What gives your daily life a sense of meaning or direction?',
        response: 'My relationships with family and close friends. Creative work when I have time for it. Helping others when I can.'
      },
      {
        question: 'Which areas of your life feel disconnected from your deeper values?',
        response: 'I spend most of my time on work that doesn\'t feel meaningful. Not enough time for creativity or people I care about.'
      },
      {
        question: 'When do you feel most aligned with who you want to be?',
        response: 'When I\'m being creative, having deep conversations, or when I make time to help someone.'
      }
    ],
    rating: {
      question: 'How purposeful and aligned do your daily actions feel?',
      score: 6
    },
    aiInsightShort: 'Client demonstrates clear values (relationships, creativity, contribution) but reports time use misalignment. Worker role currently dominates temporal allocation reducing participation in leisure and social occupations. Role imbalance impacting life satisfaction. Habits and routines not structured to support stated values.'
  },
  {
    id: 5,
    name: 'Meaningful Engagement',
    color: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-400', badge: 'bg-rose-100 text-rose-700' },
    score: 6,
    questions: [
      {
        question: 'Which relationships, groups, or activities make you feel connected?',
        response: 'A few close friends, my book club (when I go), and work projects when they\'re interesting.'
      },
      {
        question: 'What brings you joy, motivation, or belonging?',
        response: 'Good conversations, creating things, learning new skills. Feeling like I\'m part of something meaningful.'
      },
      {
        question: 'Where do you feel unmotivated or disconnected?',
        response: 'I\'ve stopped doing hobbies I used to love. Don\'t have energy for social things. Feel disconnected from community.'
      }
    ],
    rating: {
      question: 'How engaged and connected do you feel in daily life?',
      score: 6
    },
    aiInsightShort: 'Reduced frequency of participation in leisure occupations and social participation activities. Energy deficits identified as primary barrier to engagement. Community roles discontinued. Social interaction skills preserved but underutilized due to fatigue. Previously established leisure habits (hobbies) abandoned.'
  },
  {
    id: 6,
    name: 'Environmental Design for Optimized Performance',
    color: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-400', badge: 'bg-emerald-100 text-emerald-700' },
    score: 5,
    questions: [
      {
        question: 'How would you describe your main environments (home, work, school, community)?',
        response: 'Work is an open office - loud and distracting. Home is cluttered but comfortable. Kitchen is organized.'
      },
      {
        question: 'Which environments help you focus or perform well?',
        response: 'My kitchen table in the morning. Quiet corner of the library. Being outside.'
      },
      {
        question: 'What barriers (noise, clutter, lighting, accessibility) make life harder?',
        response: 'Office noise makes it hard to concentrate. My workspace at home is chaotic. Too much stuff everywhere drains me.'
      }
    ],
    rating: {
      question: 'How supportive are your environments for focus and wellbeing?',
      score: 5
    },
    aiInsightShort: 'Physical environment contexts demonstrate multiple barriers reducing occupational performance efficiency. Workplace: auditory distractions limit cognitive task completion. Home: visual clutter and workspace disorganization affect home management and work-from-home activities. Client demonstrates environmental awareness (identifies optimal conditions) which supports intervention planning.'
  }
];

const clientData = {
  name: 'Sarah Johnson',
  initials: 'SJ',
  assessmentDate: '2025-11-06',
  overallScore: 5.8,
  priorities: [
    'Physical Performance Optimization',
    'Emotional Wellbeing Optimization',
    'Environmental Design for Optimized Performance'
  ],
  functionalFindings: 'Client demonstrates functional capacity for basic ADLs and light physical activity. Moderate inefficiency observed in process skills affecting instrumental ADLs including meal planning, home management, and financial management. Social interaction skills intact with consistent friend contact. Energy regulation significantly impaired with afternoon fatigue pattern reducing task completion by estimated 40%. Sleep/rest occupation disrupted (reports 5-6 hours most nights). Postural pain during prolonged sitting affects work performance.',
  performanceFactors: 'Strengths: Established morning routine (stretching, quiet time), environmental awareness, social support network, clear values. Barriers: Endurance limitations, emotional regulation deficits (anxiety, overwhelm), inconsistent coping strategy use, environmental stressors (workplace noise, home clutter), role imbalance (worker role dominating), sleep deprivation.',
  functionalImpact: 'Decreased task completion rates in work occupation (estimated 30-40% reduction during afternoon hours). Reduced participation frequency in leisure occupations and community engagement. Withdrawal from previously established social and hobby activities. Mild restriction in IADL efficiency (meal planning, home organization). Work role performance compromised by fatigue, pain, and environmental barriers.',
  overallRating: 'Moderate Functional Limitation – Requires OT Intervention',
  clinicalJustification: 'Client presents with multiple performance deficits affecting occupational participation across work, leisure, social participation, and IADLs. Primary impairments in energy regulation, emotional regulation, and environmental adaptation are limiting functional independence and role fulfillment. Skilled OT intervention warranted to address performance patterns, modify contexts, and establish compensatory strategies.'
};

export function ViewAssessment({ clientId, onBack, onViewObservations, onViewInterventions }: ViewAssessmentProps) {
  const [expandedPillars, setExpandedPillars] = useState<Record<number, boolean>>({
    1: true
  });
  const [expandedAI, setExpandedAI] = useState<Record<number, boolean>>({});
  const [therapistNotes, setTherapistNotes] = useState<Record<number, string>>({});
  const [flaggedPillars, setFlaggedPillars] = useState<Record<number, boolean>>({});
  const [flaggedForReview, setFlaggedForReview] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [overallNotes, setOverallNotes] = useState('Recommend prioritizing environmental modifications and energy conservation techniques as initial intervention focus. Consider referral for sleep evaluation. Monitor emotional regulation progress closely.');

  const togglePillar = (id: number) => {
    setExpandedPillars(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const togglePillarFlag = (id: number) => {
    setFlaggedPillars(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const updateTherapistNote = (id: number, note: string) => {
    setTherapistNotes(prev => ({
      ...prev,
      [id]: note
    }));
  };

  const handleExportPDF = () => {
    alert('Exporting Clinical Summary as PDF...');
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-blue-600';
    if (score >= 4) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-6 -ml-2">
          <ArrowLeft className="size-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header Section */}
        <Card className="p-6 mb-6 bg-white border-slate-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="size-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">{clientData.initials}</span>
              </div>
              <div>
                <h1 className="text-slate-900 mb-1">{clientData.name}</h1>
                <div className="flex items-center gap-4 text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span>{new Date(clientData.assessmentDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="size-4" />
                    <span>Average Score: <span className={getScoreColor(clientData.overallScore)}>
                      {clientData.overallScore}/10
                    </span></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleExportPDF}
              >
                <Download className="size-4 mr-2" />
                Export Clinical Summary (PDF)
              </Button>
              <Button
                variant={flaggedForReview ? 'default' : 'outline'}
                onClick={() => setFlaggedForReview(!flaggedForReview)}
              >
                <Flag className={`size-4 mr-2 ${flaggedForReview ? '' : 'text-slate-600'}`} />
                {flaggedForReview ? 'Flagged' : 'Flag for Review'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditingNotes(!editingNotes)}
              >
                <Edit3 className="size-4 mr-2" />
                Add Therapist Note
              </Button>
            </div>
          </div>
        </Card>

        {/* Overview Summary - Clinical Documentation Style */}
        <Card className="p-6 mb-6 bg-white border-slate-200">
          <h2 className="text-slate-900 mb-4">Overview Summary</h2>

          {/* AI Summary (OTPF-4 Structured) */}
          <div className="p-4 bg-slate-100 rounded-lg border border-slate-300 mb-6">
            <div className="flex items-start gap-3 mb-3">
              <Brain className="size-5 text-slate-700 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-slate-900 mb-2">AI Summary (OTPF-4 Structured)</h4>
              </div>
            </div>

            <div className="space-y-4">
              {/* Functional Findings */}
              <div>
                <h5 className="text-slate-900 mb-2">Functional Findings</h5>
                <p className="text-slate-700">{clientData.functionalFindings}</p>
              </div>

              {/* Performance Factors */}
              <div>
                <h5 className="text-slate-900 mb-2">Performance Factors</h5>
                <p className="text-slate-700">{clientData.performanceFactors}</p>
              </div>

              {/* Functional Impact Statement */}
              <div>
                <h5 className="text-slate-900 mb-2">Functional Impact Statement</h5>
                <p className="text-slate-700">{clientData.functionalImpact}</p>
              </div>

              {/* Overall Rating */}
              <div className="pt-3 border-t border-slate-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-slate-900 mb-1">Overall Summary Rating</h5>
                    <Badge className="bg-amber-100 text-amber-800 border-amber-300">
                      {clientData.overallRating}
                    </Badge>
                  </div>
                </div>
                <p className="text-slate-700 mt-3">
                  <strong>Clinical Justification:</strong> {clientData.clinicalJustification}
                </p>
              </div>
            </div>
          </div>

          {/* Client-Selected Priorities */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
            <h4 className="text-slate-900 mb-2">Client-Selected Priorities</h4>
            <div className="space-y-1">
              {clientData.priorities.map((priority, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="size-2 bg-blue-600 rounded-full" />
                  <span className="text-slate-700">{priority}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Overall Therapist Notes */}
          <div>
            <Label className="text-slate-700 mb-2 block">Therapist Observations</Label>
            {editingNotes ? (
              <Textarea
                value={overallNotes}
                onChange={(e) => setOverallNotes(e.target.value)}
                rows={3}
                className="bg-white"
              />
            ) : (
              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <p className="text-slate-700">{overallNotes}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <Button
            onClick={() => onViewObservations(clientId)}
            variant="outline"
          >
            View Daily Observations
          </Button>
          <Button
            onClick={() => onViewInterventions(clientId)}
            className="bg-green-600 hover:bg-green-700"
          >
            <FileText className="size-4 mr-2" />
            Open Intervention Plan
          </Button>
        </div>

        {/* Pillar Sections */}
        <div className="mb-6">
          <h2 className="text-slate-900 mb-4">Pillar Breakdown</h2>

          <div className="space-y-3">
            {pillarData.map((pillar) => (
              <Card key={pillar.id} className={`border-l-4 ${pillar.color.border} bg-white`}>
                <Collapsible open={expandedPillars[pillar.id]} onOpenChange={() => togglePillar(pillar.id)}>
                  <CollapsibleTrigger className="w-full">
                    <div className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`size-10 ${pillar.color.bg} rounded-lg flex items-center justify-center`}>
                          <span className={`${pillar.color.text}`}>{pillar.id}</span>
                        </div>
                        <div className="text-left">
                          <h3 className="text-slate-900 mb-1">{pillar.name}</h3>
                          <div className="flex items-center gap-3">
                            <Badge className={pillar.color.badge}>
                              Rating: {pillar.score}/10
                            </Badge>
                            {flaggedPillars[pillar.id] && (
                              <Badge className="bg-red-100 text-red-700">
                                Flagged for Follow-up
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {expandedPillars[pillar.id] ? (
                          <ChevronUp className="size-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="size-5 text-slate-400" />
                        )}
                      </div>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="p-6 pt-0 space-y-4">
                      {/* Client Reflections */}
                      <div>
                        <h4 className="text-slate-900 mb-3">Client Reflections</h4>
                        <div className="space-y-3">
                          {pillar.questions.map((q, index) => (
                            <div key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                              <p className="text-slate-600 text-sm mb-1">{q.question}</p>
                              <p className="text-slate-900 italic">"{q.response}"</p>
                            </div>
                          ))}

                          {/* Rating */}
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                            <p className="text-slate-600 text-sm mb-2">{pillar.rating.question}</p>
                            <div className="flex items-center gap-3">
                              <div className={`px-3 py-1 ${pillar.color.badge} rounded`}>
                                <span>{pillar.rating.score}/10</span>
                              </div>
                              <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${pillar.color.bg.replace('50', '500')}`}
                                  style={{ width: `${pillar.rating.score * 10}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* AI Insight (Short Form, OTPF-4 Tone) */}
                      <div className={`p-4 ${pillar.color.bg} rounded-lg border ${pillar.color.border}`}>
                        <div className="flex items-start gap-2">
                          <Brain className={`size-5 ${pillar.color.text} flex-shrink-0 mt-0.5`} />
                          <div className="flex-1">
                            <h4 className={`${pillar.color.text} mb-2`}>AI Insight (OTPF-4)</h4>
                            <p className="text-slate-700">{pillar.aiInsightShort}</p>
                          </div>
                        </div>
                      </div>

                      {/* Therapist Notes */}
                      <div>
                        <Label className="text-slate-700 mb-2 block">Therapist Observations</Label>
                        <Textarea
                          placeholder="Add clinical observations and documentation notes..."
                          value={therapistNotes[pillar.id] || ''}
                          onChange={(e) => updateTherapistNote(pillar.id, e.target.value)}
                          rows={2}
                          className="bg-white"
                        />
                      </div>

                      {/* Flag for Follow-up */}
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`flag-${pillar.id}`}
                          checked={flaggedPillars[pillar.id] || false}
                          onCheckedChange={() => togglePillarFlag(pillar.id)}
                        />
                        <Label htmlFor={`flag-${pillar.id}`} className="text-slate-700 cursor-pointer">
                          Flag for follow-up
                        </Label>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

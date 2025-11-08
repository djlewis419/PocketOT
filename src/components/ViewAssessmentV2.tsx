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
  TrendingUp,
  AlertCircle,
  Target,
  Calendar,
  BarChart3,
  ChevronRight,
  Plus,
  FileEdit,
  Check
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface ViewAssessmentProps {
  clientId: string;
  onBack: () => void;
  onViewObservations: (clientId: string) => void;
  onViewInterventions: (clientId: string) => void;
}

interface Intervention {
  description: string;
  category: string;
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
    aiInsightOTPF: 'Client demonstrates moderate limitations in energy regulation (client factor: body functions) impacting performance patterns within daily routines and IADLs. Motor skills remain functional for light activities. Temporal context (afternoon fatigue pattern) significantly affects occupational performance. Environmental supports appear insufficient to sustain engagement in work occupations.',
    aiInsightExpanded: 'Performance Patterns: Habitual morning stretching supports morning function. Roles: Worker role impacted by postural strain and energy depletion. Client Factors: Endurance limitations, musculoskeletal pain (shoulders/neck). Contexts: Physical workspace contributes to fatigue and discomfort.',
    recommendedInterventions: [
      { description: 'Energy conservation techniques and pacing strategies', category: 'Establish/Restore' },
      { description: 'Ergonomic workspace assessment and modifications', category: 'Modify' },
      { description: 'Postural awareness training and strengthening exercises', category: 'Establish/Restore' },
      { description: 'Gradual endurance building through graded activity', category: 'Establish/Restore' }
    ]
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
    aiInsightOTPF: 'Process skills (organizing, sequencing) function well under optimal conditions. Environmental contexts (auditory distractions, open office) create barriers to cognitive performance in IADLs and work participation. Emotional regulation challenges compound attentional deficits during stress. Strong temporal awareness of optimal performance windows.',
    aiInsightExpanded: 'Performance Skills: Process skills intact when environmental demands are controlled. Performance Patterns: Morning routine serves as facilitator. Contexts: Physical environment (noise) and social environment (open office) reduce efficiency. Client Factors: Anxiety impacts attention and working memory.',
    recommendedInterventions: [
      { description: 'Environmental modification: noise reduction strategies', category: 'Modify' },
      { description: 'Cognitive strategy training for task organization', category: 'Establish/Restore' },
      { description: 'Time management aligned with circadian energy patterns', category: 'Modify' },
      { description: 'Mindfulness techniques during cognitively demanding tasks', category: 'Establish/Restore' }
    ]
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
    aiInsightOTPF: 'Emotional regulation (client factor: body functions) demonstrates moderate impairment impacting participation across multiple occupation domains. Sleep rest occupation is disrupted, compounding emotional dysregulation. Social interaction skills preserved (connection with friends serves as facilitator). Performance patterns show inconsistent use of effective coping strategies. Priority intervention area.',
    aiInsightExpanded: 'Client Factors: Anxiety, stress response, sleep disruption. Performance Skills: Social interaction skills intact (seeks support). Performance Patterns: Avoidance behaviors when overwhelmed. Contexts: Work demands exceed current coping capacity. Values: Client recognizes importance of calm environments but struggles to access them.',
    recommendedInterventions: [
      { description: 'Emotional regulation training and coping skill development', category: 'Establish/Restore' },
      { description: 'Sleep hygiene education and bedtime routine establishment', category: 'Establish/Restore' },
      { description: 'Stress management through leisure occupation engagement', category: 'Create' },
      { description: 'Cognitive behavioral strategies for anxiety', category: 'Establish/Restore' }
    ]
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
    aiInsightOTPF: 'Client demonstrates clear values and spirituality (client factors) centered on relationships, creativity, and contribution. However, temporal demands of work occupation create value-action misalignment. Role balance between worker, friend, and creative pursuits is disrupted. Opportunity for occupation-based intervention targeting meaningful activity participation.',
    aiInsightExpanded: 'Values/Spirituality: Strong clarity around core values. Performance Patterns: Roles (worker) dominating time allocation. Habits not aligned with stated values. Occupations: Work occupation overrepresented; leisure and social participation occupations underrepresented.',
    recommendedInterventions: [
      { description: 'Values-based activity scheduling and time use analysis', category: 'Modify' },
      { description: 'Role balance assessment and restructuring', category: 'Modify' },
      { description: 'Integration of creative occupations into weekly routine', category: 'Create' },
      { description: 'Goal-setting aligned with personal values', category: 'Create' }
    ]
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
    aiInsightOTPF: 'Reduced participation in leisure occupations and social participation due to energy limitations (client factor barrier). Client demonstrates capacity for social interaction skills but energy deficits limit engagement. Meaningful occupations identified (learning, creating, connecting) but access is restricted. Consider gradual re-engagement with pacing strategies.',
    aiInsightExpanded: 'Occupations: Leisure and social participation occupations reduced. Performance Patterns: Withdrawal from community roles and habits. Performance Skills: Social interaction skills present but underutilized. Client Factors: Motivation impacted by energy deficits.',
    recommendedInterventions: [
      { description: 'Graded re-engagement in valued leisure occupations', category: 'Establish/Restore' },
      { description: 'Energy management for social participation', category: 'Modify' },
      { description: 'Community connection opportunities aligned with interests', category: 'Create' },
      { description: 'Hobby exploration with reduced energy demands', category: 'Modify' }
    ]
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
    aiInsightOTPF: 'Physical and sensory environmental contexts create significant barriers to occupational performance across work, home management, and rest/sleep occupations. Client demonstrates strong environmental awareness (identifies optimal conditions). Environmental modification interventions offer high-yield intervention opportunities.',
    aiInsightExpanded: 'Contexts: Physical environment (noise, clutter) reduces performance efficiency. Environmental barriers present in both work and home contexts. Client demonstrates ability to identify supportive environments (facilitator for intervention planning).',
    recommendedInterventions: [
      { description: 'Home workspace organization and sensory modification', category: 'Modify' },
      { description: 'Environmental audit and decluttering strategies', category: 'Modify' },
      { description: 'Workplace accommodations for noise reduction', category: 'Modify' },
      { description: 'Adaptive equipment or tools for environmental control', category: 'Modify' }
    ]
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
  otpfSummary: 'Client demonstrates moderate limitations in energy regulation impacting performance patterns within daily routines. Emotional regulation and role balance appear to influence occupational participation and social interaction skills. Environmental supports appear insufficient to sustain engagement in instrumental activities of daily living (IADLs).',
  clientFactors: 'Body functions: endurance limitations, anxiety, sleep disruption. Values: relationships, creativity, helping others. Strong self-awareness.',
  performanceSkills: 'Motor skills: functional for light activity. Process skills: intact under optimal conditions. Social interaction: preserved, seeks connection.',
  performancePatterns: 'Habits: morning stretching routine (facilitator). Routines: inconsistent coping strategy use. Roles: worker role dominating, creative/friend roles underutilized.',
  contexts: 'Physical: workspace noise, home clutter create barriers. Temporal: afternoon energy decline. Social: supportive friendships (facilitator).'
};

export function ViewAssessment({ clientId, onBack, onViewObservations, onViewInterventions }: ViewAssessmentProps) {
  const [expandedPillars, setExpandedPillars] = useState<Record<number, boolean>>({
    1: true
  });
  const [expandedAI, setExpandedAI] = useState<Record<number, boolean>>({});
  const [therapistNotes, setTherapistNotes] = useState<Record<number, string>>({});
  const [interventionNotes, setInterventionNotes] = useState<Record<string, string>>({});
  const [selectedInterventions, setSelectedInterventions] = useState<Record<string, boolean>>({});
  const [flaggedPillars, setFlaggedPillars] = useState<Record<number, boolean>>({});
  const [flaggedForReview, setFlaggedForReview] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [overallNotes, setOverallNotes] = useState('Initial review: Client shows strong insight into challenges. Primary focus areas appear to be energy management, emotional regulation, and environmental optimization. Recommend starting with environmental modifications as early win.');

  const togglePillar = (id: number) => {
    setExpandedPillars(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleAI = (id: number) => {
    setExpandedAI(prev => ({
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

  const toggleIntervention = (key: string) => {
    setSelectedInterventions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleExport = () => {
    alert('Exporting assessment summary...');
  };

  const handleExportToPlan = (pillarId: number) => {
    alert(`Exporting selected interventions for pillar ${pillarId} to Intervention Plan...`);
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
                    <span>Overall Score: <span className={getScoreColor(clientData.overallScore)}>
                      {clientData.overallScore}/10
                    </span></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setEditingNotes(!editingNotes)}
              >
                <Edit3 className="size-4 mr-2" />
                Edit Notes
              </Button>
              <Button
                variant={flaggedForReview ? 'default' : 'outline'}
                onClick={() => setFlaggedForReview(!flaggedForReview)}
              >
                <Flag className={`size-4 mr-2 ${flaggedForReview ? '' : 'text-slate-600'}`} />
                {flaggedForReview ? 'Flagged' : 'Flag for Review'}
              </Button>
              <Button variant="outline" onClick={handleExport}>
                <Download className="size-4 mr-2" />
                Export Summary
              </Button>
            </div>
          </div>
        </Card>

        {/* Overview Summary with OTPF-4 */}
        <Card className="p-6 mb-6 bg-white border-slate-200">
          <h2 className="text-slate-900 mb-4">Overview Summary</h2>

          {/* AI Insight (OTPF-4) */}
          <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200 mb-6">
            <div className="flex items-start gap-3">
              <Brain className="size-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-indigo-900 mb-2">AI Insight (OTPF-4 Language)</h4>
                <p className="text-slate-700 italic">{clientData.otpfSummary}</p>
              </div>
            </div>
          </div>

          {/* OTPF-4 Structured Summary */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-slate-900 mb-2">Client Factors</h4>
              <p className="text-slate-700">{clientData.clientFactors}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="text-slate-900 mb-2">Performance Skills</h4>
              <p className="text-slate-700">{clientData.performanceSkills}</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h4 className="text-slate-900 mb-2">Performance Patterns</h4>
              <p className="text-slate-700">{clientData.performancePatterns}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="text-slate-900 mb-2">Contexts/Environments</h4>
              <p className="text-slate-700">{clientData.contexts}</p>
            </div>
          </div>

          {/* Priorities */}
          <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-lg border border-teal-200 mb-6">
            <Target className="size-5 text-teal-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-slate-900 mb-2">Client-Selected Priorities (1-3)</h4>
              <div className="space-y-1">
                {clientData.priorities.map((priority, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="size-2 bg-teal-600 rounded-full" />
                    <span className="text-slate-700">{priority}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Overall Therapist Notes */}
          <div>
            <Label className="text-slate-700 mb-2 block">Overall Assessment Notes</Label>
            {editingNotes ? (
              <Textarea
                value={overallNotes}
                onChange={(e) => setOverallNotes(e.target.value)}
                rows={3}
                className="bg-slate-50"
              />
            ) : (
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-slate-700">{overallNotes}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Pillar Sections */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-slate-900">Pillar Breakdown</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewObservations(clientId)}
              >
                View Daily Observations
              </Button>
              <Button
                size="sm"
                onClick={() => onViewInterventions(clientId)}
                className="bg-orange-600 hover:bg-orange-700"
              >
                View Intervention Plan
              </Button>
            </div>
          </div>

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
                              Score: {pillar.score}/10
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
                      {/* Questions and Responses */}
                      <div className="space-y-4">
                        {pillar.questions.map((q, index) => (
                          <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <p className="text-slate-600 mb-2">{q.question}</p>
                            <p className="text-slate-900 italic">"{q.response}"</p>
                          </div>
                        ))}

                        {/* Rating */}
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <p className="text-slate-600 mb-2">{pillar.rating.question}</p>
                          <div className="flex items-center gap-3">
                            <div className={`px-4 py-2 ${pillar.color.badge} rounded-lg`}>
                              <span className="text-lg">{pillar.rating.score}/10</span>
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

                      {/* AI Insights (OTPF-4 Lens) */}
                      <div className={`p-4 ${pillar.color.bg} rounded-lg border ${pillar.color.border}`}>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2 flex-1">
                            <Brain className={`size-5 ${pillar.color.text} flex-shrink-0 mt-0.5`} />
                            <div className="flex-1">
                              <h4 className={`${pillar.color.text} mb-1 italic`}>AI Insight (OTPF-4 Lens)</h4>
                              <p className="text-slate-700">{pillar.aiInsightOTPF}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleAI(pillar.id)}
                          >
                            {expandedAI[pillar.id] ? (
                              <>
                                <ChevronUp className="size-4 mr-1" />
                                Collapse
                              </>
                            ) : (
                              <>
                                <ChevronRight className="size-4 mr-1" />
                                Expand AI Analysis
                              </>
                            )}
                          </Button>
                        </div>
                        {expandedAI[pillar.id] && (
                          <div className="mt-3 pt-3 border-t border-current/20">
                            <p className="text-slate-700">{pillar.aiInsightExpanded}</p>
                          </div>
                        )}
                      </div>

                      {/* Recommended Interventions Section */}
                      <div className="border border-slate-300 rounded-lg p-4 bg-gradient-to-br from-slate-50 to-blue-50">
                        <div className="flex items-center gap-2 mb-3">
                          <Target className="size-5 text-blue-600" />
                          <h4 className="text-slate-900">Recommended Interventions (OTPF-4 Aligned)</h4>
                        </div>

                        <div className="space-y-3">
                          {pillar.recommendedInterventions.map((intervention, index) => {
                            const key = `${pillar.id}-${index}`;
                            return (
                              <div key={index} className="grid md:grid-cols-[1fr,auto,1fr] gap-3 items-start p-3 bg-white rounded-lg border border-slate-200">
                                {/* Intervention */}
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <Checkbox
                                      id={key}
                                      checked={selectedInterventions[key] || false}
                                      onCheckedChange={() => toggleIntervention(key)}
                                    />
                                    <Label htmlFor={key} className="text-slate-700 cursor-pointer">
                                      {intervention.description}
                                    </Label>
                                  </div>
                                  <Badge variant="outline" className="text-xs ml-6">
                                    {intervention.category}
                                  </Badge>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-1">
                                  {selectedInterventions[key] && (
                                    <Button size="sm" variant="ghost" className="text-green-600">
                                      <Check className="size-4" />
                                    </Button>
                                  )}
                                </div>

                                {/* Therapist Notes */}
                                <Textarea
                                  placeholder="Customize or add notes..."
                                  value={interventionNotes[key] || ''}
                                  onChange={(e) => setInterventionNotes(prev => ({
                                    ...prev,
                                    [key]: e.target.value
                                  }))}
                                  rows={1}
                                  className="text-sm"
                                />
                              </div>
                            );
                          })}
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleExportToPlan(pillar.id)}
                          >
                            <Download className="size-4 mr-2" />
                            Export to Intervention Plan
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                          >
                            <FileEdit className="size-4 mr-2" />
                            Edit Recommendation
                          </Button>
                        </div>
                      </div>

                      {/* Therapist Observations */}
                      <div>
                        <Label className="text-slate-700 mb-2 block">
                          Therapist Observations / Recommended Actions
                        </Label>
                        <Textarea
                          placeholder="Add your clinical observations, interpretation, and recommended next steps for this pillar..."
                          value={therapistNotes[pillar.id] || ''}
                          onChange={(e) => updateTherapistNote(pillar.id, e.target.value)}
                          rows={3}
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
                          Flag this pillar for follow-up
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

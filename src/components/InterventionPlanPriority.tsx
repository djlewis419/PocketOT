import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { ArrowLeft, Save, Download, RefreshCw, Plus, Target, Brain, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface InterventionPlanProps {
  clientId: string;
  onBack: () => void;
}

interface PriorityIntervention {
  approach: string;
  strategy: string;
  frequency: string;
  expectedOutcome: string;
}

interface ClientPriority {
  id: number;
  name: string;
  description: string;
  rating: number;
  color: { bg: string; text: string; border: string };
  aiSuggestedFocus: string;
  intervention: PriorityIntervention;
}

const clientData = {
  name: 'Sarah Johnson',
  assessmentDate: '2025-11-06',
  lastUpdated: '2025-11-08'
};

const approachOptions = [
  'Create/Promote',
  'Establish/Restore',
  'Maintain',
  'Modify',
  'Prevent'
];

export function InterventionPlan({ clientId, onBack }: InterventionPlanProps) {
  const [expandedPriorities, setExpandedPriorities] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true
  });

  const [priorities, setPriorities] = useState<ClientPriority[]>([
    {
      id: 1,
      name: 'Physical Performance Optimization',
      description: 'I get exhausted in the afternoons - like a crash. My shoulders and neck are tight from sitting. Sometimes my legs feel heavy.',
      rating: 5,
      color: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-400' },
      aiSuggestedFocus: 'Support energy conservation and occupational pacing strategies to enhance sustained participation in work occupation and IADLs. Address postural pain through ergonomic modifications to reduce musculoskeletal strain and improve endurance for task completion.',
      intervention: {
        approach: 'Modify',
        strategy: 'Implement energy conservation techniques including work-rest cycles, ergonomic workspace assessment and modifications, postural awareness training, and graded activity progression to build endurance. Educate on pacing strategies to prevent afternoon energy crashes.',
        frequency: '1x/week for 6 weeks, then reassess',
        expectedOutcome: 'Client will demonstrate improved endurance and reduced fatigue during afternoon work tasks. Client will report decreased neck/shoulder pain and maintain functional posture during desk work with 75% accuracy. Client will independently implement pacing strategies to sustain energy throughout workday.'
      }
    },
    {
      id: 2,
      name: 'Emotional Wellbeing Optimization',
      description: 'When I\'m anxious, I can\'t focus or enjoy anything. When I\'m overwhelmed, I shut down and avoid things I need to do. Not sleeping well makes everything worse.',
      rating: 4,
      color: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-400' },
      aiSuggestedFocus: 'Enhance emotional regulation skills and establish consistent coping routines to reduce anxiety-related avoidance behaviors and improve participation across multiple occupation domains. Address sleep/rest occupation disruption as foundational to emotional regulation capacity.',
      intervention: {
        approach: 'Establish/Restore',
        strategy: 'Cognitive-behavioral strategies for anxiety management, development of daily emotional regulation routines (morning mindfulness, evening wind-down), sleep hygiene education and bedtime routine establishment. Implement graded exposure techniques to reduce avoidance behaviors in valued occupations.',
        frequency: '1x/week for 8 weeks',
        expectedOutcome: 'Client will demonstrate use of 3+ coping strategies when experiencing anxiety or overwhelm. Client will report improved sleep quality (7-8 hours consistently, 5+ nights/week). Client will reduce avoidance behaviors and increase participation in previously avoided meaningful tasks by 50%.'
      }
    },
    {
      id: 3,
      name: 'Environmental Design for Optimized Performance',
      description: 'Office noise makes it hard to concentrate. My workspace at home is chaotic. Too much stuff everywhere drains me.',
      rating: 5,
      color: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-400' },
      aiSuggestedFocus: 'Modify physical and sensory environmental contexts (home and workplace) to reduce cognitive load, minimize distractions, and optimize conditions for sustained attention and task performance in work and home management occupations.',
      intervention: {
        approach: 'Modify',
        strategy: 'Environmental audit and modification plan: home workspace organization and decluttering protocols, sensory modification strategies for workplace (noise-cancelling headphones, request quiet space accommodations), visual organization systems, and adaptive environmental control tools. Phased implementation starting with highest-impact changes.',
        frequency: '1x/week for 4 weeks, with follow-up at 8 weeks',
        expectedOutcome: 'Client will complete home workspace organization with maintained system for 3+ consecutive weeks. Client will implement workplace noise reduction strategies and report improved concentration. Client will demonstrate 30% improvement in task completion rates in modified environments.'
      }
    }
  ]);

  const [insuranceSummary, setInsuranceSummary] = useState(
    'Intervention plan addresses client\'s self-identified functional limitations in energy regulation, emotional regulation, and environmental adaptation affecting occupational performance across work, IADLs, and leisure participation. Skilled OT services include: (1) Energy conservation training and ergonomic modifications to address endurance deficits and postural pain limiting work participation; (2) Emotional regulation skill development and sleep hygiene protocols to reduce anxiety-related avoidance and restore participation in valued occupations; (3) Environmental modification strategies to optimize cognitive performance and reduce sensory barriers in home and work contexts. Treatment utilizes OTPF-4 approaches including Modify (environmental contexts), Establish/Restore (performance skills and patterns), and Create/Promote (health-promoting routines). Expected outcomes include measurable improvements in task completion, sustained energy throughout workday, reduced avoidance behaviors, improved sleep quality, and enhanced occupational participation. Frequency: 1x/week for initial 8-week period with ongoing functional reassessment.'
  );

  const togglePriority = (id: number) => {
    setExpandedPriorities(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const updateIntervention = (id: number, field: keyof PriorityIntervention, value: string) => {
    setPriorities(priorities.map(p =>
      p.id === id ? {
        ...p,
        intervention: { ...p.intervention, [field]: value }
      } : p
    ));
  };

  const addNewPriority = () => {
    const newId = Math.max(...priorities.map(p => p.id)) + 1;
    setPriorities([
      ...priorities,
      {
        id: newId,
        name: 'New Priority Area',
        description: '',
        rating: 5,
        color: { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-400' },
        aiSuggestedFocus: '',
        intervention: {
          approach: 'Establish/Restore',
          strategy: '',
          frequency: '',
          expectedOutcome: ''
        }
      }
    ]);
    setExpandedPriorities(prev => ({ ...prev, [newId]: true }));
  };

  const handleSave = () => {
    alert('Intervention plan saved successfully!');
  };

  const handleExport = () => {
    alert('Exporting for documentation (EMR/Insurance format)...');
  };

  const handleSendToClient = () => {
    alert('Sending summary to client portal...');
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
          Back to Assessment
        </Button>

        {/* Header */}
        <Card className="p-6 mb-6 bg-white border-slate-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-slate-900 mb-2">Intervention Plan</h1>
              <div className="flex items-center gap-4 text-slate-600">
                <span>Client: <strong>{clientData.name}</strong></span>
                <span>Assessment Date: {new Date(clientData.assessmentDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}</span>
                <span>Last Updated: {new Date(clientData.lastUpdated).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="size-4 mr-2" />
                Save Plan
              </Button>
              <Button onClick={handleExport} variant="outline">
                <Download className="size-4 mr-2" />
                Export for Documentation
              </Button>
            </div>
          </div>

          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-slate-700 text-sm">
              This plan is based on the client's elected priorities and AI-synthesized OTPF-4 insights.
            </p>
          </div>
        </Card>

        {/* AI Guidance Banner */}
        <Card className="p-5 mb-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
          <div className="flex items-start gap-3">
            <Brain className="size-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-slate-900 mb-2">AI Clinical Integration</h3>
              <p className="text-slate-700 text-sm">
                AI Focus Areas are derived from the client's elected priorities and coded through OTPF-4 terminology. 
                Each suggestion reflects functional implications, measurable objectives, and recognized OT intervention 
                categories. <strong>All recommendations are editable</strong> — AI provides scaffolding to support your 
                clinical reasoning, not replace it.
              </p>
            </div>
          </div>
        </Card>

        {/* Priority-Based Intervention Sections */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-slate-900">Priority-Based Interventions</h2>
            <Button onClick={addNewPriority} variant="outline" size="sm">
              <Plus className="size-4 mr-2" />
              Add New Priority or Goal
            </Button>
          </div>

          <div className="space-y-4">
            {priorities.map((priority, index) => (
              <Card key={priority.id} className={`border-l-4 ${priority.color.border} bg-white`}>
                <Collapsible
                  open={expandedPriorities[priority.id]}
                  onOpenChange={() => togglePriority(priority.id)}
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`size-10 ${priority.color.bg} rounded-lg flex items-center justify-center`}>
                          <Target className={`size-5 ${priority.color.text}`} />
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">Priority {index + 1}</Badge>
                          </div>
                          <h3 className="text-slate-900 mb-1">{priority.name}</h3>
                          <p className="text-slate-600 text-sm">
                            Client Rating: <span className={getScoreColor(priority.rating)}>
                              {priority.rating}/10
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {expandedPriorities[priority.id] ? (
                          <ChevronUp className="size-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="size-5 text-slate-400" />
                        )}
                      </div>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="p-6 pt-0 space-y-5">
                      {/* Client's Description */}
                      <div>
                        <Label className="text-slate-700 mb-2 block">Client's Description</Label>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <p className="text-slate-900 italic">"{priority.description}"</p>
                        </div>
                      </div>

                      {/* AI-Suggested Focus Area */}
                      <div className={`p-4 ${priority.color.bg} rounded-lg border ${priority.color.border}`}>
                        <div className="flex items-start gap-2">
                          <Brain className={`size-5 ${priority.color.text} flex-shrink-0 mt-0.5`} />
                          <div className="flex-1">
                            <h4 className={`${priority.color.text} mb-2`}>
                              AI-Suggested Focus Area (Specific to Priority)
                            </h4>
                            <p className="text-slate-700">{priority.aiSuggestedFocus}</p>
                          </div>
                        </div>
                      </div>

                      {/* Therapist Planning Fields */}
                      <div className="p-5 bg-slate-50 rounded-lg border-2 border-slate-300">
                        <h4 className="text-slate-900 mb-4">Therapist Planning</h4>
                        
                        <div className="space-y-4">
                          {/* Intervention Approach */}
                          <div>
                            <Label className="text-slate-700 mb-2 block">
                              Intervention Approach (OTPF-4)
                            </Label>
                            <select
                              value={priority.intervention.approach}
                              onChange={(e) => updateIntervention(priority.id, 'approach', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-slate-700"
                            >
                              {approachOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                          </div>

                          {/* Specific Strategy or Technique */}
                          <div>
                            <Label className="text-slate-700 mb-2 block">
                              Specific Strategy or Technique
                            </Label>
                            <Textarea
                              value={priority.intervention.strategy}
                              onChange={(e) => updateIntervention(priority.id, 'strategy', e.target.value)}
                              rows={4}
                              placeholder="Describe specific intervention techniques, modalities, or strategies..."
                              className="bg-white"
                            />
                          </div>

                          {/* Frequency & Duration */}
                          <div>
                            <Label className="text-slate-700 mb-2 block">
                              Frequency & Duration
                            </Label>
                            <input
                              type="text"
                              value={priority.intervention.frequency}
                              onChange={(e) => updateIntervention(priority.id, 'frequency', e.target.value)}
                              placeholder="e.g., 1x/week for 6 weeks"
                              className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-slate-700"
                            />
                          </div>

                          {/* Expected Functional Outcome */}
                          <div>
                            <Label className="text-slate-700 mb-2 block">
                              Expected Functional Outcome
                            </Label>
                            <Textarea
                              value={priority.intervention.expectedOutcome}
                              onChange={(e) => updateIntervention(priority.id, 'expectedOutcome', e.target.value)}
                              rows={3}
                              placeholder="Describe measurable, functional outcomes in client's occupational performance..."
                              className="bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        </div>

        {/* Insurance Submission Summary */}
        <Card className="p-6 mb-6 bg-amber-50 border-amber-300">
          <h3 className="text-slate-900 mb-3">Insurance Submission Summary</h3>
          <p className="text-slate-600 text-sm mb-3">
            Comprehensive summary for EMR documentation or insurance submission. Review and edit as needed.
          </p>
          <Textarea
            value={insuranceSummary}
            onChange={(e) => setInsuranceSummary(e.target.value)}
            rows={8}
            className="bg-white"
          />
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save className="size-4 mr-2" />
            Save Plan
          </Button>
          <Button onClick={handleExport} variant="outline">
            <Download className="size-4 mr-2" />
            Export for Documentation
          </Button>
          <Button onClick={handleSendToClient} variant="outline">
            <Send className="size-4 mr-2" />
            Send to Client Portal
          </Button>
          <Button onClick={onBack} variant="outline">
            <RefreshCw className="size-4 mr-2" />
            Update After Re-Assessment
          </Button>
        </div>
      </div>
    </div>
  );
}

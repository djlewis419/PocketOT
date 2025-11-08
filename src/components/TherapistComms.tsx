import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { ArrowLeft, Send, Calendar, MessageSquare, Clock } from 'lucide-react';

interface TherapistCommsProps {
  clientId: string;
  onBack: () => void;
}

interface Message {
  id: string;
  sender: 'therapist' | 'client';
  content: string;
  timestamp: string;
  read: boolean;
}

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'therapist',
    content: 'Hi Sarah, I reviewed your latest assessment. I noticed you mentioned afternoon energy crashes. Let\'s explore some pacing strategies during our next session.',
    timestamp: '2025-11-06T14:30:00',
    read: true
  },
  {
    id: '2',
    sender: 'client',
    content: 'Thank you! Yes, the afternoons have been really difficult. I appreciate you noticing that pattern.',
    timestamp: '2025-11-06T16:45:00',
    read: true
  },
  {
    id: '3',
    sender: 'therapist',
    content: 'I also see that your sleep has been disrupted. Would you be open to trying a simple sleep hygiene checklist? I can send one over.',
    timestamp: '2025-11-07T09:15:00',
    read: true
  },
  {
    id: '4',
    sender: 'client',
    content: 'Yes, please! I\'m willing to try anything at this point.',
    timestamp: '2025-11-07T10:30:00',
    read: true
  }
];

export function TherapistComms({ clientId, onBack }: TherapistCommsProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showScheduler, setShowScheduler] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'therapist',
        content: newMessage,
        timestamp: new Date().toISOString(),
        read: false
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleScheduleSession = () => {
    alert('Session scheduling feature coming soon!');
    setShowScheduler(false);
  };

  // Quick response templates
  const quickResponses = [
    'I noticed your energy levels dipped this week. Let\'s talk about your morning routine during our next session.',
    'Great progress on your goals! Keep up the consistent effort.',
    'Thank you for your daily observations. I\'m seeing some helpful patterns emerge.',
    'I\'d like to follow up on the anxiety you mentioned. Would a brief check-in call be helpful?'
  ];

  const insertQuickResponse = (response: string) => {
    setNewMessage(response);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2">
            <ArrowLeft className="size-4 mr-2" />
            Back to Client Report
          </Button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-slate-900 mb-1">Communication & Follow-up</h1>
              <p className="text-slate-600">Sarah Johnson</p>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowScheduler(!showScheduler)}
            >
              <Calendar className="size-4 mr-2" />
              Schedule Follow-Up
            </Button>
          </div>
        </div>

        {/* Schedule Session Card */}
        {showScheduler && (
          <Card className="p-6 mb-6 bg-white border-slate-200">
            <h3 className="text-slate-900 mb-4">Schedule Follow-Up Session</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-slate-700 mb-2 block">Preferred Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                />
              </div>
              <div>
                <label className="text-slate-700 mb-2 block">Time</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-md">
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>1:00 PM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="text-slate-700 mb-2 block">Session Type</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-md">
                <option>In-Person Session (60 min)</option>
                <option>Video Call (60 min)</option>
                <option>Phone Check-In (30 min)</option>
                <option>Brief Check-In (15 min)</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleScheduleSession} className="bg-teal-600 hover:bg-teal-700">
                Send Invitation
              </Button>
              <Button variant="outline" onClick={() => setShowScheduler(false)}>
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Message Thread */}
        <Card className="p-6 bg-white border-slate-200 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="size-5 text-slate-600" />
            <h2 className="text-slate-900">Message Thread</h2>
          </div>

          {/* Messages */}
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'therapist' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] ${message.sender === 'therapist' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`p-4 rounded-lg ${
                      message.sender === 'therapist'
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 text-slate-900'
                    }`}
                  >
                    <p className="leading-relaxed">{message.content}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1 px-2">
                    <Clock className="size-3 text-slate-400" />
                    <span className="text-slate-500">
                      {new Date(message.timestamp).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </span>
                    {message.sender === 'therapist' && (
                      <Badge variant="outline" className="text-xs">
                        {message.read ? 'Read' : 'Sent'}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Responses */}
          <div className="mb-4">
            <label className="text-slate-700 mb-2 block">Quick Response Templates:</label>
            <div className="flex flex-wrap gap-2">
              {quickResponses.map((response, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => insertQuickResponse(response)}
                  className="text-left h-auto whitespace-normal"
                >
                  {response}
                </Button>
              ))}
            </div>
          </div>

          {/* New Message Input */}
          <div className="space-y-3">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message to Sarah..."
              rows={4}
              className="bg-slate-50"
            />
            <div className="flex justify-end">
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-teal-600 hover:bg-teal-700"
              >
                <Send className="size-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </Card>

        {/* Communication Guidelines */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <h3 className="text-slate-900 mb-3">Communication Best Practices</h3>
          <div className="space-y-2 text-slate-700">
            <div className="flex items-start gap-2">
              <div className="size-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <p>
                Keep messages supportive and non-judgmental. Acknowledge client effort and progress.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="size-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <p>
                Reference specific observations from their assessments to show you're paying attention.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="size-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <p>
                Offer concrete next steps or suggestions rather than open-ended questions.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="size-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <p>
                Respond within 24-48 hours when possible to maintain therapeutic rapport.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

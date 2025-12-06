import React, { useState } from 'react';
import { Save, Play, MessageSquare, Settings2, Sliders } from 'lucide-react';
import { Card, Input, Button, Badge } from '../components/ui/design-system';

const BotBuilder = () => {
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hello! I am your AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    // Simulate AI typing
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'model', text: 'This is a simulated response. Connect the Gemini API to make this live!' }]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6">
      
      {/* Left Pane - Configuration */}
      <Card className="w-full lg:w-1/2 flex flex-col h-full overflow-hidden border-slate-200">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Settings2 className="h-5 w-5 text-slate-500" />
            <h2 className="font-semibold">Configuration</h2>
          </div>
          <Button size="sm" variant="outline"><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
        </div>
        
        <div className="p-6 space-y-6 overflow-y-auto flex-1 bg-slate-50/30">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">Bot Name</label>
            <Input defaultValue="Customer Support Agent" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">Model</label>
            <div className="grid grid-cols-2 gap-2">
              <div 
                onClick={() => setSelectedModel('gemini-2.5-flash')}
                className={`p-3 border rounded-xl cursor-pointer transition-all ${selectedModel === 'gemini-2.5-flash' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white hover:border-slate-300'}`}
              >
                <div className="font-semibold text-sm">Gemini Flash</div>
                <div className={`text-xs ${selectedModel === 'gemini-2.5-flash' ? 'text-slate-300' : 'text-slate-500'}`}>Fast & Efficient</div>
              </div>
              <div 
                onClick={() => setSelectedModel('gemini-3-pro')}
                className={`p-3 border rounded-xl cursor-pointer transition-all ${selectedModel === 'gemini-3-pro' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white hover:border-slate-300'}`}
              >
                <div className="font-semibold text-sm">Gemini Pro</div>
                <div className={`text-xs ${selectedModel === 'gemini-3-pro' ? 'text-slate-300' : 'text-slate-500'}`}>Complex Reasoning</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">System Instruction</label>
            <textarea 
              className="w-full h-40 rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              placeholder="You are a helpful assistant..."
              defaultValue="You are a helpful customer support agent for CtrlCheck. Be polite, concise, and professional."
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="text-sm font-medium flex items-center gap-2"><Sliders className="h-4 w-4" /> Parameters</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Temperature</span>
                <span>0.7</span>
              </div>
              <input type="range" className="w-full accent-slate-900 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
            </div>
          </div>
        </div>
      </Card>

      {/* Right Pane - Preview */}
      <Card className="w-full lg:w-1/2 flex flex-col h-full overflow-hidden shadow-lg border-slate-200">
        <div className="p-4 border-b border-slate-100 bg-white flex justify-between items-center">
          <div className="flex items-center gap-2">
             <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
             <span className="font-semibold text-sm">Live Preview</span>
          </div>
          <Button size="sm" variant="ghost"><Play className="h-4 w-4 mr-1" /> Reset</Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-br-none' 
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex gap-2">
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon" className="bg-slate-900 text-white">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

    </div>
  );
};

export default BotBuilder;
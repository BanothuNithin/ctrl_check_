import React, { useState } from 'react';
import { Search, Filter, ArrowRight, Zap, Mail, Database, MessageSquare, Globe, ShoppingCart, FileText, Shield } from 'lucide-react';
import { Button, Input, Card, Badge, Modal } from '../components/ui/design-system';
import { useNavigate } from 'react-router-dom';

const templates = [
  {
    id: 1,
    title: 'Medical Claim Auto-Processor',
    description: 'Automatically analyze medical claim documents using LLM, validate policy coverage, and generate approval or rejection responses.',
    category: 'Healthcare',
    icon: FileText,
    color: 'bg-green-100 text-green-600',
    nodes: ['Claim Upload', 'OCR', 'LLM', 'Policy Validation', 'Database', 'Notification'],
},
  {
    id: 2,
    title: 'Insurance Claim Automation',
    description: 'Automatically process insurance claims using AI to extract data, validate policy coverage, detect fraud risk, and generate approval or rejection decisions.',
    category: 'Insurance',
    icon: Shield,
    color: 'bg-indigo-100 text-indigo-600',
    nodes: ['Claim Submission', 'OCR', 'LLM', 'Policy Engine', 'Fraud Detection', 'Approval Workflow', 'Payment Gateway'],
},
  {
    id: 3,
    title: 'Lead Qualification',
    description: 'Process web form submissions, enrich data via Clearbit, and score leads using AI.',
    category: 'Sales',
    icon: Zap,
    color: 'bg-yellow-100 text-yellow-600',
    nodes: ['Webhook', 'HTTP Request', 'LLM', 'HubSpot'],
  },
  {
    id: 4,
    title: 'Email Auto-Responder',
    description: 'Automatically analyze incoming emails with LLM and draft a response based on sentiment.',
    category: 'Support',
    icon: Mail,
    color: 'bg-blue-100 text-blue-600',
    nodes: ['Gmail', 'LLM', 'Delay', 'Gmail'],
  },
  {
    id: 5,
    title: 'E-commerce Order Sync',
    description: 'Sync Shopify orders to Airtable and notify shipping fulfillment via Slack.',
    category: 'Operations',
    icon: ShoppingCart,
    color: 'bg-green-100 text-green-600',
    nodes: ['Shopify', 'Airtable', 'Slack'],
  },
  {
    id: 6,
    title: 'Website Content Scraper',
    description: 'Scrape daily news sites, summarize content, and post to social media channels.',
    category: 'Marketing',
    icon: Globe,
    color: 'bg-pink-100 text-pink-600',
    nodes: ['Cron', 'Scraper', 'LLM', 'Twitter'],
  },
  {
    id: 7,
    title: 'Database Backup & Alert',
    description: 'Scheduled database dump upload to S3 with error alerting mechanism.',
    category: 'DevOps',
    icon: Database,
    color: 'bg-slate-100 text-slate-600',
    nodes: ['Cron', 'Postgres', 'S3', 'PagerDuty'],
  },
];

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const navigate = useNavigate();

  const categories = ['All', 'Healthcare', 'Insurance', 'Support', 'Sales'];

  const filteredTemplates = templates.filter(t => 
    (selectedCategory === 'All' || t.category === selectedCategory) &&
    (t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const createTemplateWorkflow = (template) => {
    const workflows = {
      1: {
        // Medical Claim Auto-Processor
        nodes: [
          { id: 'node-0', type: 'webhook', x: 50, y: 50, data: { label: 'Claim Upload' }, status: 'idle' },
          { id: 'node-1', type: 'postgres', x: 350, y: 50, data: { label: 'OCR' }, status: 'idle' },
          { id: 'node-2', type: 'llm', x: 650, y: 50, data: { label: 'LLM' }, status: 'idle' },
          { id: 'node-3', type: 'condition', x: 350, y: 250, data: { label: 'Policy Validation' }, status: 'idle' },
          { id: 'node-4', type: 'postgres', x: 650, y: 250, data: { label: 'Database' }, status: 'idle' },
          { id: 'node-5', type: 'gmail', x: 950, y: 150, data: { label: 'Notification' }, status: 'idle' }
        ],
        edges: [
          { id: 'edge-0', source: 'node-0', target: 'node-1' },
          { id: 'edge-1', source: 'node-1', target: 'node-2' },
          { id: 'edge-2', source: 'node-2', target: 'node-3' },
          { id: 'edge-3', source: 'node-3', target: 'node-4' },
          { id: 'edge-4', source: 'node-4', target: 'node-5' }
        ]
      },
      2: {
        // Insurance Claim Automation
        nodes: [
          { id: 'node-0', type: 'webhook', x: 50, y: 50, data: { label: 'Claim Submission' }, status: 'idle' },
          { id: 'node-1', type: 'postgres', x: 350, y: 50, data: { label: 'OCR' }, status: 'idle' },
          { id: 'node-2', type: 'llm', x: 650, y: 50, data: { label: 'LLM' }, status: 'idle' },
          { id: 'node-3', type: 'http', x: 950, y: 50, data: { label: 'Policy Engine' }, status: 'idle' },
          { id: 'node-4', type: 'condition', x: 350, y: 250, data: { label: 'Fraud Detection' }, status: 'idle' },
          { id: 'node-5', type: 'condition', x: 650, y: 250, data: { label: 'Approval Workflow' }, status: 'idle' },
          { id: 'node-6', type: 'postgres', x: 950, y: 250, data: { label: 'Payment Gateway' }, status: 'idle' }
        ],
        edges: [
          { id: 'edge-0', source: 'node-0', target: 'node-1' },
          { id: 'edge-1', source: 'node-1', target: 'node-2' },
          { id: 'edge-2', source: 'node-2', target: 'node-3' },
          { id: 'edge-3', source: 'node-2', target: 'node-4' },
          { id: 'edge-4', source: 'node-4', target: 'node-5' },
          { id: 'edge-5', source: 'node-5', target: 'node-6' }
        ]
      },
      3: {
        // Lead Qualification
        nodes: [
          { id: 'node-0', type: 'webhook', x: 50, y: 100, data: { label: 'Webhook' }, status: 'idle' },
          { id: 'node-1', type: 'http', x: 350, y: 80, data: { label: 'HTTP Request' }, status: 'idle' },
          { id: 'node-2', type: 'llm', x: 650, y: 100, data: { label: 'LLM' }, status: 'idle' },
          { id: 'node-3', type: 'slack', x: 950, y: 100, data: { label: 'HubSpot' }, status: 'idle' }
        ],
        edges: [
          { id: 'edge-0', source: 'node-0', target: 'node-1' },
          { id: 'edge-1', source: 'node-1', target: 'node-2' },
          { id: 'edge-2', source: 'node-2', target: 'node-3' }
        ]
      },
      4: {
        // Email Auto-Responder
        nodes: [
          { id: 'node-0', type: 'gmail', x: 50, y: 100, data: { label: 'Gmail' }, status: 'idle' },
          { id: 'node-1', type: 'llm', x: 350, y: 100, data: { label: 'LLM' }, status: 'idle' },
          { id: 'node-2', type: 'condition', x: 650, y: 100, data: { label: 'Delay' }, status: 'idle' },
          { id: 'node-3', type: 'gmail', x: 950, y: 100, data: { label: 'Gmail' }, status: 'idle' }
        ],
        edges: [
          { id: 'edge-0', source: 'node-0', target: 'node-1' },
          { id: 'edge-1', source: 'node-1', target: 'node-2' },
          { id: 'edge-2', source: 'node-2', target: 'node-3' }
        ]
      },
      5: {
        // E-commerce Order Sync
        nodes: [
          { id: 'node-0', type: 'webhook', x: 50, y: 100, data: { label: 'Shopify' }, status: 'idle' },
          { id: 'node-1', type: 'sheets', x: 350, y: 100, data: { label: 'Airtable' }, status: 'idle' },
          { id: 'node-2', type: 'slack', x: 650, y: 100, data: { label: 'Slack' }, status: 'idle' }
        ],
        edges: [
          { id: 'edge-0', source: 'node-0', target: 'node-1' },
          { id: 'edge-1', source: 'node-1', target: 'node-2' }
        ]
      },
      6: {
        // Website Content Scraper
        nodes: [
          { id: 'node-0', type: 'webhook', x: 50, y: 100, data: { label: 'Cron' }, status: 'idle' },
          { id: 'node-1', type: 'http', x: 350, y: 100, data: { label: 'Scraper' }, status: 'idle' },
          { id: 'node-2', type: 'llm', x: 650, y: 100, data: { label: 'LLM' }, status: 'idle' },
          { id: 'node-3', type: 'slack', x: 950, y: 100, data: { label: 'Twitter' }, status: 'idle' }
        ],
        edges: [
          { id: 'edge-0', source: 'node-0', target: 'node-1' },
          { id: 'edge-1', source: 'node-1', target: 'node-2' },
          { id: 'edge-2', source: 'node-2', target: 'node-3' }
        ]
      },
      7: {
        // Database Backup & Alert
        nodes: [
          { id: 'node-0', type: 'webhook', x: 50, y: 100, data: { label: 'Cron' }, status: 'idle' },
          { id: 'node-1', type: 'postgres', x: 350, y: 100, data: { label: 'Postgres' }, status: 'idle' },
          { id: 'node-2', type: 'http', x: 650, y: 100, data: { label: 'S3' }, status: 'idle' },
          { id: 'node-3', type: 'slack', x: 950, y: 100, data: { label: 'PagerDuty' }, status: 'idle' }
        ],
        edges: [
          { id: 'edge-0', source: 'node-0', target: 'node-1' },
          { id: 'edge-1', source: 'node-1', target: 'node-2' },
          { id: 'edge-2', source: 'node-2', target: 'node-3' }
        ]
      }
    };

    const workflowData = workflows[template.id] || {
      nodes: template.nodes.map((label, idx) => ({
        id: `node-${idx}`,
        type: 'http',
        x: idx * 300,
        y: 50,
        data: { label },
        status: 'idle'
      })),
      edges: []
    };

    return {
      id: `template-${template.id}`,
      title: template.title,
      description: template.description,
      nodes: workflowData.nodes,
      edges: workflowData.edges
    };
  };

  const handleUseTemplate = (template) => {
    const templateWorkflow = createTemplateWorkflow(template);
    localStorage.setItem('templateWorkflow', JSON.stringify(templateWorkflow));
    navigate('/workflows', { replace: true });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Workflow Templates</h1>
          <p className="text-slate-500">Jumpstart your automation with pre-built workflows.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline">My Templates</Button>
          <Button>Create Blank</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search templates..." 
            className="pl-9 w-full" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-slate-300 flex flex-col h-full">
            <div className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${template.color}`}>
                  <template.icon className="h-6 w-6" />
                </div>
                <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                  {template.category}
                </Badge>
              </div>
              
              <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-600 transition-colors">{template.title}</h3>
              <p className="text-slate-500 text-sm mb-6 flex-1 leading-relaxed">
                {template.description}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  {template.nodes.map((node, i) => (
                    <span key={i} className="text-[10px] font-medium px-2 py-1 rounded bg-slate-50 text-slate-500 border border-slate-100">
                      {node}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 justify-center"
                    variant="outline"
                    onClick={() => setPreviewTemplate(template)}
                  >
                    Preview
                  </Button>
                  <Button 
                    className="flex-1 justify-between group-hover:bg-indigo-600 group-hover:text-white transition-colors"
                    onClick={() => handleUseTemplate(template)}
                  >
                    Use Template <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className={`h-16 w-16 rounded-xl flex items-center justify-center ${previewTemplate.color}`}>
                    <previewTemplate.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{previewTemplate.title}</h2>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 mt-2">
                      {previewTemplate.category}
                    </Badge>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="text-slate-400 hover:text-slate-600 transition-colors text-2xl leading-none"
                >
                  ✕
                </button>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-900 mb-2">About This Template</h3>
                <p className="text-slate-600 leading-relaxed">{previewTemplate.description}</p>
              </div>

              {/* What's Included */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Workflow Components</h3>
                <div className="grid grid-cols-2 gap-3">
                  {previewTemplate.nodes.map((node, i) => (
                    <div key={i} className="p-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
                      <p className="text-sm font-medium text-indigo-900">{node}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features/Benefits */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Key Benefits</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Ready-to-use workflow structure</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Fully customizable nodes and connections</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Includes {previewTemplate.nodes.length} pre-configured components</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Save time and focus on business logic</span>
                  </li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t border-slate-200">
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => setPreviewTemplate(null)}
                >
                  Close
                </Button>
                <Button 
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={() => {
                    handleUseTemplate(previewTemplate);
                    setPreviewTemplate(null);
                  }}
                >
                  Use This Template <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Templates;
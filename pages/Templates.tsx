import React, { useState } from 'react';
import { Search, Filter, ArrowRight, Zap, Mail, Database, MessageSquare, Globe, ShoppingCart } from 'lucide-react';
import { Button, Input, Card, Badge, Modal } from '../components/ui/design-system';
import { useNavigate } from 'react-router-dom';

const templates = [
  {
    id: 1,
    title: 'Email Auto-Responder',
    description: 'Automatically analyze incoming emails with LLM and draft a response based on sentiment.',
    category: 'Support',
    icon: Mail,
    color: 'bg-blue-100 text-blue-600',
    nodes: ['Gmail', 'LLM', 'Delay', 'Gmail'],
  },
  {
    id: 2,
    title: 'Lead Qualification',
    description: 'Process web form submissions, enrich data via Clearbit, and score leads using AI.',
    category: 'Sales',
    icon: Zap,
    color: 'bg-yellow-100 text-yellow-600',
    nodes: ['Webhook', 'HTTP Request', 'LLM', 'HubSpot'],
  },
  {
    id: 3,
    title: 'Customer Feedback Analyzer',
    description: 'Aggregate feedback from multiple sources and generate a weekly summary report.',
    category: 'Analytics',
    icon: MessageSquare,
    color: 'bg-purple-100 text-purple-600',
    nodes: ['Typeform', 'LLM', 'Notion', 'Slack'],
  },
  {
    id: 4,
    title: 'E-commerce Order Sync',
    description: 'Sync Shopify orders to Airtable and notify shipping fulfillment via Slack.',
    category: 'Operations',
    icon: ShoppingCart,
    color: 'bg-green-100 text-green-600',
    nodes: ['Shopify', 'Airtable', 'Slack'],
  },
  {
    id: 5,
    title: 'Website Content Scraper',
    description: 'Scrape daily news sites, summarize content, and post to social media channels.',
    category: 'Marketing',
    icon: Globe,
    color: 'bg-pink-100 text-pink-600',
    nodes: ['Cron', 'Scraper', 'LLM', 'Twitter'],
  },
  {
    id: 6,
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
  const navigate = useNavigate();

  const categories = ['All', 'Support', 'Sales', 'Marketing', 'Operations', 'DevOps'];

  const filteredTemplates = templates.filter(t => 
    (selectedCategory === 'All' || t.category === selectedCategory) &&
    (t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
                <Button 
                  className="w-full justify-between group-hover:bg-indigo-600 group-hover:text-white transition-colors"
                  variant="outline"
                  onClick={() => navigate('/workflows')}
                >
                  Use Template <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Templates;
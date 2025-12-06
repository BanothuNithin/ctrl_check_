import React from 'react';
import { User, CreditCard, Key, Building } from 'lucide-react';
import { Button, Input, Card, CardHeader, CardTitle, CardContent, Avatar } from '../components/ui/design-system';

const Settings = () => {
  const [activeTab, setActiveTab] = React.useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'api-keys', label: 'API Keys', icon: Key },
    { id: 'organization', label: 'Organization', icon: Building },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-slate-500">Manage your account preferences and workspace settings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
                activeTab === tab.id 
                  ? 'bg-slate-900 text-white' 
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar fallback="JD" className="h-20 w-20 text-xl" />
                  <Button variant="outline">Change Avatar</Button>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Display Name</label>
                    <Input defaultValue="Jane Doe" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input defaultValue="jane@example.com" />
                  </div>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'api-keys' && (
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-slate-500">Manage your API keys for accessing the CtrlCheck API and Gemini integrations.</p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                        <p className="font-mono text-sm">sk_live_...4x89</p>
                        <p className="text-xs text-slate-400">Created 2 days ago</p>
                    </div>
                    <Button variant="ghost" className="text-red-500">Revoke</Button>
                </div>
                <Button variant="outline"><Key className="mr-2 h-4 w-4" /> Create New Key</Button>
              </CardContent>
            </Card>
          )}
          
           {activeTab === 'billing' && (
            <Card>
              <CardHeader>
                <CardTitle>Billing & Plans</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-xl">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-lg">Pro Plan</h3>
                            <p className="text-slate-300 text-sm">$29/month</p>
                        </div>
                        <span className="bg-white/20 text-white text-xs px-2 py-1 rounded">Active</span>
                    </div>
                    <div className="mt-6">
                         <div className="flex justify-between text-xs mb-1 text-slate-300">
                             <span>Credits Used</span>
                             <span>8,402 / 10,000</span>
                         </div>
                         <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                             <div className="h-full bg-white w-[84%]"></div>
                         </div>
                    </div>
                </div>
                <Button variant="outline" className="w-full">Manage Subscription</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
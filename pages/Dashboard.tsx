import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { Users, MessageSquare, Zap, TrendingUp, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Avatar } from '../components/ui/design-system';

const data = [
  { name: 'Mon', messages: 400, active: 240 },
  { name: 'Tue', messages: 300, active: 139 },
  { name: 'Wed', messages: 200, active: 980 },
  { name: 'Thu', messages: 278, active: 390 },
  { name: 'Fri', messages: 189, active: 480 },
  { name: 'Sat', messages: 239, active: 380 },
  { name: 'Sun', messages: 349, active: 430 },
];

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
      <Icon className="h-4 w-4 text-slate-500" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={`text-xs flex items-center mt-1 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
        {trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : null}
        {change} from last month
      </p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-slate-500">Overview of your AI agents and workflows.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Data</Button>
          <Button><Plus className="mr-2 h-4 w-4" /> New Bot</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Conversations" value="2,350" change="+180.1%" icon={MessageSquare} trend="up" />
        <StatCard title="Active Users" value="+12,234" change="+19%" icon={Users} trend="up" />
        <StatCard title="Workflow Executions" value="45,231" change="+201%" icon={Zap} trend="up" />
        <StatCard title="Avg. Response Time" value="1.2s" change="-4%" icon={Zap} trend="down" /> {/* Down is good here contextually but using red for consistency logic usually implies bad. Let's assume green for good performance. */}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0f172a" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <Area type="monotone" dataKey="messages" stroke="#0f172a" fillOpacity={1} fill="url(#colorMessages)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <Avatar fallback={`U${i}`} className="h-9 w-9 bg-slate-100 text-xs" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">User #{1000 + i} started a chat</p>
                    <p className="text-xs text-slate-500">Customer Support Bot • {i * 10}m ago</p>
                  </div>
                  <div className="ml-auto font-medium text-xs text-slate-500">Active</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

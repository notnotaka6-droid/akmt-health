
import React, { useState } from 'react';
import { User, HealthMetric } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const INITIAL_DATA: HealthMetric[] = [
  { day: 'Mon', bp: 120, gl: 95, w: 72 },
  { day: 'Tue', bp: 125, gl: 98, w: 71.8 },
  { day: 'Wed', bp: 132, gl: 105, w: 72.2 },
  { day: 'Thu', bp: 122, gl: 92, w: 72.1 },
  { day: 'Fri', bp: 118, gl: 88, w: 71.9 },
  { day: 'Sat', bp: 121, gl: 96, w: 72.0 },
  { day: 'Sun', bp: 120, gl: 95, w: 71.8 },
];

export default function Monitoring({ user }: { user: User }) {
  const [data, setData] = useState(INITIAL_DATA);
  const [showLogForm, setShowLogForm] = useState(false);
  const [newLog, setNewLog] = useState({ bp: 120, gl: 95, w: 72 });

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const newData = [...data.slice(1), { day: 'Today', ...newLog }];
    setData(newData);
    setShowLogForm(false);
    alert('Vitals logged successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Health Vitality</h2>
          <p className="text-slate-500">Track your daily progress and trends.</p>
        </div>
        <button onClick={() => setShowLogForm(true)} className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all">+ Record Vitals</button>
      </div>

      {showLogForm && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold mb-6">Log Daily Vitals</h3>
            <form onSubmit={handleAddLog} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Blood Pressure</label>
                <input type="number" className="w-full p-3 bg-slate-50 border rounded-xl" value={newLog.bp} onChange={e => setNewLog({...newLog, bp: +e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Blood Glucose</label>
                <input type="number" className="w-full p-3 bg-slate-50 border rounded-xl" value={newLog.gl} onChange={e => setNewLog({...newLog, gl: +e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Weight (kg)</label>
                <input type="number" step="0.1" className="w-full p-3 bg-slate-50 border rounded-xl" value={newLog.w} onChange={e => setNewLog({...newLog, w: +e.target.value})} />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowLogForm(false)} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold">Save Log</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Blood Pressure Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} domain={[100, 150]} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none'}} />
                <Area type="monotone" dataKey="bp" stroke="#3b82f6" fill="#3b82f620" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Blood Glucose Levels</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none'}} />
                <Bar dataKey="gl" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-red-50 p-6 rounded-2xl border border-red-100 mt-6">
        <div className="flex items-center space-x-3 mb-2 text-red-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h4 className="font-bold">Urgent Alert: BP Spike Detected</h4>
        </div>
        <p className="text-sm text-red-800">Your blood pressure reached 132/88 mmHg. We've notified <strong>Dokter Deny Satria</strong> and he may contact you for a follow-up.</p>
      </div>
    </div>
  );
}

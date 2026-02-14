
import React from 'react';
import { User, UserRole, TriageResult } from '../types';
import { useTranslation } from '../App';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', bp: 120, gl: 95 },
  { name: 'Tue', bp: 125, gl: 98 },
  { name: 'Wed', bp: 118, gl: 102 },
  { name: 'Thu', bp: 122, gl: 92 },
  { name: 'Fri', bp: 121, gl: 96 },
  { name: 'Sat', bp: 119, gl: 94 },
  { name: 'Sun', bp: 120, gl: 95 },
];

interface DashboardProps {
  user: User;
  onConsultation: () => void;
  triageResult: TriageResult | null;
}

export default function Dashboard({ user, onConsultation, triageResult }: DashboardProps) {
  const { t } = useTranslation();
  const isPatient = user.role === UserRole.PATIENT;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{t('welcome')} {user.name} 👋</h2>
          <p className="text-slate-500 text-sm">{t('dashboard')} Overview</p>
        </div>
        {isPatient && (
          <button 
            onClick={onConsultation}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all"
          >
            {t('new_consult')}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('health_score'), value: '92/100', color: 'bg-emerald-50 text-emerald-600' },
          { label: t('status'), value: triageResult ? triageResult.urgency : 'Stable', color: 'bg-blue-50 text-blue-600' },
          { label: t('meds'), value: '3 Active', color: 'bg-purple-50 text-purple-600' },
          { label: t('alerts'), value: 'None', color: 'bg-slate-50 text-slate-600' },
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-2xl ${stat.color} border border-black/5`}>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">{stat.label}</p>
            <p className="text-xl font-black">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-3xl border shadow-sm h-80">
        <h3 className="font-bold text-slate-800 mb-6">Weekly Vital Signs</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{borderRadius: '16px', border: 'none'}} />
            <Area type="monotone" dataKey="bp" stroke="#3b82f6" fill="#3b82f610" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

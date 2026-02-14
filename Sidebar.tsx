
import React from 'react';
import { User, UserRole } from '../types';
import { useTranslation } from '../App';
import { Language } from '../translations';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User;
  onToggleRole: () => void;
  language: Language;
  setLanguage: (l: Language) => void;
}

export default function Sidebar({ activeTab, setActiveTab, user, onToggleRole, language, setLanguage }: SidebarProps) {
  const { t } = useTranslation();
  
  const menuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'triage', label: t('triage'), icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { id: 'consultation', label: t('consultation'), icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
    { id: 'emr', label: t('emr'), icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'monitoring', label: t('monitoring'), icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'prescriptions', label: t('prescriptions'), icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.675.27a6 6 0 01-3.86.517l-2.387-.477a2 2 0 00-1.022.547l-1.16 1.16a2 2 0 002.828 2.828l1.16-1.16zM2 10a8 8 0 0116 0a8 8 0 01-16 0z' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 hidden md:flex">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="font-bold text-xl">AK</span>
          </div>
          <span className="font-bold text-xl tracking-tight">AKMTWELL</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Language</p>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="w-full bg-slate-800 text-xs border border-slate-700 rounded-lg p-2 outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English (US)</option>
            <option value="jp">日本語 (Japanese)</option>
            <option value="kr">한국어 (Korean)</option>
          </select>
        </div>
        <button 
          onClick={onToggleRole}
          className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors border border-slate-700"
        >
          {t('switch_role')} {user.role === UserRole.PATIENT ? 'Doctor' : 'Patient'}
        </button>
      </div>
    </aside>
  );
}

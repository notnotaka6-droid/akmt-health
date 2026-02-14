
import React, { useState, createContext, useContext } from 'react';
import { UserRole, User, TriageResult, Prescription } from './types';
import { Language, translations } from './translations';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AITriage from './components/AITriage';
import Consultation from './components/Consultation';
import EMR from './components/EMR';
import Monitoring from './components/Monitoring';
import PrescriptionList from './components/PrescriptionList';

// Language Context
const LanguageContext = createContext<{
  language: Language;
  setLanguage: (l: Language) => void;
  t: (key: keyof typeof translations['id']) => string;
}>({
  language: 'id',
  setLanguage: () => {},
  t: (key) => translations['id'][key]
});

export const useTranslation = () => useContext(LanguageContext);

export default function App() {
  const [language, setLanguage] = useState<Language>('id');
  const [currentUser, setCurrentUser] = useState<User>({
    id: '1',
    name: 'Teguh Santoso',
    email: 'teguh@mail.com',
    role: UserRole.PATIENT,
    avatar: 'https://picsum.photos/seed/patient/200'
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [triageResult, setTriageResult] = useState<TriageResult | null>(null);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    { 
      id: 'rx-1', 
      doctorName: 'Dokter Deny Satria', 
      date: 'Oct 24, 2024', 
      status: 'delivered', 
      items: [
        { name: 'Amoxicillin', dosage: '500mg - 3x daily' },
        { name: 'Paracetamol', dosage: '500mg - As needed for fever' }
      ]
    }
  ]);

  const t = (key: keyof typeof translations['id']): string => {
    const langSet = translations[language] || translations['id'];
    return langSet[key] || translations['id'][key] || (key as string);
  };

  const toggleRole = () => {
    const isPatient = currentUser.role === UserRole.PATIENT;
    setCurrentUser({
      id: isPatient ? 'doc-1' : '1',
      name: isPatient ? 'Dokter Deny Satria' : 'Teguh Santoso',
      email: isPatient ? 'deny@akmtwell.com' : 'teguh@mail.com',
      role: isPatient ? UserRole.DOCTOR : UserRole.PATIENT,
      avatar: `https://picsum.photos/seed/${isPatient ? 'doctor' : 'patient'}/200`
    });
  };

  const handleTriageComplete = (result: TriageResult) => {
    setTriageResult(result);
    setActiveTab('consultation');
  };

  const handleAddPrescription = (newRx: Prescription) => {
    setPrescriptions([newRx, ...prescriptions]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': 
        return <Dashboard user={currentUser} onConsultation={() => setActiveTab('triage')} triageResult={triageResult} />;
      case 'triage': 
        return <AITriage user={currentUser} onComplete={handleTriageComplete} />;
      case 'consultation': 
        return <Consultation user={currentUser} triageResult={triageResult} onAddPrescription={handleAddPrescription} />;
      case 'emr': 
        return <EMR user={currentUser} triageResult={triageResult} />;
      case 'monitoring': 
        return <Monitoring user={currentUser} />;
      case 'prescriptions': 
        return <PrescriptionList user={currentUser} prescriptions={prescriptions} />;
      default: 
        return <Dashboard user={currentUser} onConsultation={() => setActiveTab('triage')} triageResult={triageResult} />;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className="flex h-screen bg-slate-50">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          user={currentUser} 
          onToggleRole={toggleRole}
          language={language}
          setLanguage={setLanguage}
        />
        
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10">
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-slate-800 capitalize">
                {t(activeTab as any) !== (activeTab as any) ? t(activeTab as any) : activeTab.replace('-', ' ')}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-slate-800 leading-none">{currentUser.name}</p>
                  <p className="text-[10px] font-bold text-blue-600 mt-1 tracking-widest uppercase">{currentUser.role}</p>
                </div>
                <img src={currentUser.avatar} alt="Profile" className="w-9 h-9 rounded-full ring-2 ring-blue-100 object-cover" />
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
            <div className="max-w-7xl mx-auto space-y-6">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </LanguageContext.Provider>
  );
}

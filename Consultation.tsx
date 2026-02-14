
import React, { useState } from 'react';
import { User, Doctor, TriageResult, UserRole, Prescription } from '../types';
import { useTranslation } from '../App';

const MOCK_DOCTORS: Doctor[] = [
  { id: 'd1', name: 'Dokter Deny Satria', specialty: 'General Practitioner', experience: '8 years', rating: 4.9, online: true, avatar: 'https://picsum.photos/seed/d1/200' },
  { id: 'd2', name: 'Dokter Octavian Kurnia Sandi', specialty: 'Pulmonologist', experience: '12 years', rating: 4.8, online: true, avatar: 'https://picsum.photos/seed/d2/200' },
  { id: 'd3', name: 'Dokter Yosi', specialty: 'Cardiologist', experience: '10 years', rating: 4.9, online: true, avatar: 'https://picsum.photos/seed/d3/200' },
  { id: 'd4', name: 'Dokter Ramdan Alfi Surya', specialty: 'Pediatrician', experience: '15 years', rating: 5.0, online: false, avatar: 'https://picsum.photos/seed/d4/200' },
];

interface ConsultationProps {
  user: User;
  triageResult: TriageResult | null;
  onAddPrescription: (rx: Prescription) => void;
}

export default function Consultation({ user, triageResult, onAddPrescription }: ConsultationProps) {
  const { t } = useTranslation();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [inCall, setInCall] = useState(false);
  const [showSoap, setShowSoap] = useState(false);
  const [chat, setChat] = useState<{sender: string, text: string}[]>([]);
  
  const [soap, setSoap] = useState({ subjective: '', objective: '', assessment: '', plan: '' });
  const [newPrescription, setNewPrescription] = useState([{ name: '', dosage: '' }]);

  const handleStartCall = (doc: Doctor) => {
    setSelectedDoctor(doc);
    setInCall(true);
    setChat([
      { sender: doc.name, text: triageResult ? `${triageResult.summary}` : 'Hello! How can I help you today?' }
    ]);
  };

  const handleEndCall = () => {
    setInCall(false);
    if (user.role === UserRole.DOCTOR) setShowSoap(true);
  };

  const submitSoap = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPrescription({
      id: `rx-${Date.now()}`,
      doctorName: user.name,
      date: new Date().toLocaleDateString(),
      status: 'ordered',
      items: newPrescription.filter(i => i.name)
    });
    alert('SOAP Saved.');
    setShowSoap(false);
  };

  if (showSoap) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border shadow-2xl overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <h3 className="text-xl font-bold">SOAP Notes</h3>
        </div>
        <form onSubmit={submitSoap} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700 uppercase">{t('soap_subjective')}</label>
              <textarea className="w-full p-3 bg-slate-50 border rounded-xl h-24" value={soap.subjective} onChange={e => setSoap({...soap, subjective: e.target.value})} />
              <label className="block text-sm font-bold text-slate-700 uppercase">{t('soap_objective')}</label>
              <textarea className="w-full p-3 bg-slate-50 border rounded-xl h-24" value={soap.objective} onChange={e => setSoap({...soap, objective: e.target.value})} />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700 uppercase">{t('soap_assessment')}</label>
              <textarea className="w-full p-3 bg-slate-50 border rounded-xl h-24" value={soap.assessment} onChange={e => setSoap({...soap, assessment: e.target.value})} />
              <label className="block text-sm font-bold text-slate-700 uppercase">{t('soap_plan')}</label>
              <textarea className="w-full p-3 bg-slate-50 border rounded-xl h-24" value={soap.plan} onChange={e => setSoap({...soap, plan: e.target.value})} />
            </div>
          </div>
          <button type="submit" className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg">
            {t('save_records')}
          </button>
        </form>
      </div>
    );
  }

  if (inCall && selectedDoctor) {
    return (
      <div className="flex flex-col lg:flex-row h-[calc(100vh-12rem)] gap-6">
        <div className="flex-1 bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl flex items-center justify-center">
           <div className="text-center text-white">
             <img src={selectedDoctor.avatar} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500" />
             <h4 className="text-2xl font-bold">{selectedDoctor.name}</h4>
             <button onClick={handleEndCall} className="mt-8 px-8 py-4 bg-red-500 text-white rounded-full font-bold shadow-xl">End Session</button>
           </div>
        </div>
        <div className="w-full lg:w-96 bg-white rounded-3xl border shadow-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b bg-slate-50 font-bold">Chat</div>
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {chat.map((m, i) => (
              <div key={i} className="bg-slate-100 p-3 rounded-xl text-sm">{m.text}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {triageResult && (
        <div className="p-6 bg-blue-600 rounded-3xl text-white shadow-xl">
          <h3 className="text-lg font-bold">{t('recommended_specialist')}: {triageResult.recommendedSpecialist}</h3>
          <p className="text-blue-100 text-sm">{triageResult.summary}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_DOCTORS.map(doc => (
          <div key={doc.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
            <img src={doc.avatar} className="w-20 h-20 rounded-2xl mx-auto mb-4" />
            <h4 className="font-bold text-slate-800">{doc.name}</h4>
            <p className="text-xs text-blue-600 font-bold uppercase mb-4">{doc.specialty}</p>
            <button onClick={() => handleStartCall(doc)} className="w-full py-3 bg-blue-50 text-blue-600 rounded-2xl font-bold hover:bg-blue-600 hover:text-white">
              {t('start_consult')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

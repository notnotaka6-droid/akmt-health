
import React, { useState } from 'react';
import { User, TriageResult, UrgencyLevel } from '../types';
import { useTranslation } from '../App';
import { analyzeSymptoms } from '../services/geminiService';

interface AITriageProps {
  user: User;
  onComplete: (result: TriageResult) => void;
}

export default function AITriage({ user, onComplete }: AITriageProps) {
  const { t, language } = useTranslation();
  const [symptoms, setSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<Partial<TriageResult> | null>(null);

  const handleTriage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setIsAnalyzing(true);
    try {
      const analysis = await analyzeSymptoms(symptoms, language);
      setResult({
        urgency: analysis.urgency as UrgencyLevel,
        recommendedSpecialist: analysis.recommendedSpecialist,
        summary: analysis.summary,
        symptoms: symptoms
      });
    } catch (error) {
      alert("Failed to analyze symptoms. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleProceed = () => {
    if (result) {
      const finalResult: TriageResult = {
        id: `tr-${Date.now()}`,
        symptoms: result.symptoms || '',
        urgency: (result.urgency as UrgencyLevel) || UrgencyLevel.LOW,
        recommendedSpecialist: result.recommendedSpecialist || 'General Practitioner',
        summary: result.summary || '',
        timestamp: new Date()
      };
      onComplete(finalResult);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {!result ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl overflow-hidden relative">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">{t('triage')}</h2>
          <p className="text-slate-500 mb-8">{t('ai_triage_description')}</p>
          
          <form onSubmit={handleTriage} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">{t('symptoms_label')}</label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g. Cough, fever..."
                className="w-full h-40 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isAnalyzing}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center space-x-2 ${
                isAnalyzing ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isAnalyzing ? "..." : t('analyze_btn')}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-800 mb-8">{t('analysis_summary')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <p className="text-sm font-bold text-slate-500 uppercase">{t('analysis_summary')}</p>
              <p className="text-slate-800 leading-relaxed text-lg italic">"{result.summary}"</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl">
              <p className="text-sm font-bold text-slate-500 uppercase mb-4">{t('recommended_specialist')}</p>
              <p className="font-bold text-slate-900 text-xl">{result.recommendedSpecialist}</p>
            </div>
          </div>
          <button onClick={handleProceed} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg">
            {t('proceed_booking')}
          </button>
        </div>
      )}
    </div>
  );
}

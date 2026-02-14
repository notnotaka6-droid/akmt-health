
import React from 'react';
import { User, UserRole, TriageResult } from '../types';

interface EMRProps {
  user: User;
  triageResult: TriageResult | null;
}

export default function EMR({ user, triageResult }: EMRProps) {
  const isDoctor = user.role === UserRole.DOCTOR;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">Patient Profile</h3>
        <div className="flex flex-col items-center">
          <img src={isDoctor ? "https://picsum.photos/seed/patient/200" : user.avatar} className="w-24 h-24 rounded-2xl mb-4 border-4 border-blue-50" />
          <h4 className="font-bold text-xl text-slate-900">{isDoctor ? "Teguh Santoso" : user.name}</h4>
          <p className="text-slate-500 text-sm">Patient ID: #AKM-9283-2024</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between p-3 bg-slate-50 rounded-xl text-sm">
            <span className="text-slate-500">Blood Type</span>
            <span className="font-bold text-red-600">O+</span>
          </div>
          <div className="flex justify-between p-3 bg-slate-50 rounded-xl text-sm">
            <span className="text-slate-500">Height / Weight</span>
            <span className="font-bold">175cm / 72kg</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Medical History Timeline</h3>
          <div className="space-y-6">
            {[
              { date: 'Oct 24, 2024', title: 'Viral Respiratory Infection', doctor: 'Dokter Deny Satria', note: 'Complained of sore throat. Resting prescribed.' },
              { date: 'Aug 12, 2024', title: 'Routine Checkup', doctor: 'Dokter Octavian Kurnia Sandi', note: 'All clear.' },
              { date: 'May 05, 2024', title: 'Allergic Reaction', doctor: 'Dokter Yosi', note: 'Treatment plan started.' },
            ].map((visit, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="shrink-0 w-2 h-2 mt-2 bg-blue-500 rounded-full" />
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-bold text-slate-900">{visit.title}</p>
                    <span className="text-[10px] text-blue-600 font-bold">{visit.date}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-500 mb-2">{visit.doctor}</p>
                  <p className="text-sm text-slate-600">{visit.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


import React from 'react';
import { User, Prescription } from '../types';

interface PrescriptionListProps {
  user: User;
  prescriptions: Prescription[];
}

export default function PrescriptionList({ user, prescriptions }: PrescriptionListProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-slate-800">Prescriptions</h3>
      <div className="space-y-4">
        {prescriptions.map((rx) => (
          <div key={rx.id} className="bg-white rounded-2xl border p-6 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-48">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Doctor</p>
              <p className="font-bold text-slate-900">{rx.doctorName}</p>
              <p className="text-xs text-slate-500">{rx.date}</p>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rx.items.map((item, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="font-bold text-slate-800">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.dosage}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

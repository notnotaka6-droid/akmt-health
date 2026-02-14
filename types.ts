
export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN'
}

export enum UrgencyLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  online: boolean;
  avatar: string;
}

export interface TriageResult {
  id: string;
  symptoms: string;
  urgency: UrgencyLevel;
  recommendedSpecialist: string;
  summary: string;
  timestamp: Date;
}

export interface SoapNote {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export interface PrescriptionItem {
  name: string;
  dosage: string;
}

export interface Prescription {
  id: string;
  doctorName: string;
  date: string;
  status: 'ordered' | 'processed' | 'delivered';
  items: PrescriptionItem[];
}

export interface HealthMetric {
  day: string;
  bp: number;
  gl: number;
  w: number;
}

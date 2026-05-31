/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FindingStatus = 'normal' | 'high' | 'low' | 'attention';

export interface KeyFinding {
  marker: string;
  value: string;
  status: FindingStatus;
  normalRange?: string;
  meaning: string;
}

export interface TermDefinition {
  term: string;
  definition: string;
}

export interface ReportAnalysis {
  simple_summary: string;
  key_findings: KeyFinding[];
  term_definitions: TermDefinition[];
  doctor_questions: string[];
  safety_disclaimer: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface UserReport {
  id: string;
  fileName: string;
  date: string;
  fileSize: string;
  language: string;
  status: 'pending' | 'analyzed' | 'failed';
  rawText?: string;
  analysis?: ReportAnalysis;
  chatHistory?: ChatMessage[];
  comparisonMetrics?: {
    marker: string;
    trend: string;
    changePercent: number;
    direction: 'up' | 'down' | 'stable';
    sentiment: 'better' | 'worse' | 'neutral';
  }[];
}

export interface AppState {
  reports: UserReport[];
  selectedReportId: string | null;
  activeLanguage: string;
  isAuthenticated: boolean;
  userEmail: string | null;
}

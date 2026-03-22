export type SeverityLevel = 'high' | 'medium' | 'low';

export interface Vulnerability {
  id: string;
  name: string;
  description: string;
  fileName: string;
  lineNumber: number;
  severity: SeverityLevel;
  code: string;
  aiSuggestion?: string;
  aiSuggestionLoading?: boolean;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  fileName: string;
  vulnerabilities: Vulnerability[];
  report?: string | null;
}

// utils/gemini.ts

const BACKEND_URL = '/api';


export const callGeminiForScan = async (code: string): Promise<any[]> => {
  const response = await fetch(`${BACKEND_URL}/scan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to scan code');
  }
  
  return response.json();
};

export const generateReportFromVulnerabilities = async (vulnerabilities: any[]): Promise<string> => {
  const response = await fetch(`${BACKEND_URL}/report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vulnerabilities }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate report');
  }
  
  const data = await response.json();
  return data.report;
};

export const callGeminiForOptimization = async (fullCode: string, vulnerability: any): Promise<string> => {
  const response = await fetch(`${BACKEND_URL}/optimize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullCode, vulnerability }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to optimize code');
  }
  
  const data = await response.json();
  return data.optimizedCode;
};

export const callGeminiForFix = async (vulnerableCode: string, issueName: string): Promise<string> => {
  const response = await fetch(`${BACKEND_URL}/fix`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: vulnerableCode, name: issueName }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get fix suggestion');
  }
  
  const data = await response.json();
  return data.fix;
};
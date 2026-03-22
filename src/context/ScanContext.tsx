import React, { createContext, useContext, useState } from 'react';
import { callGeminiForScan, callGeminiForFix, generateReportFromVulnerabilities } from '../lib/gemini';
import { useHistory } from './HistoryContext';

import { SeverityLevel, Vulnerability } from '@/types';


interface ScanContextType {
  isScanning: boolean;
  scanProgress: number;
  vulnerabilities: Vulnerability[];
  selectedFile: File | null;
  viewingCode: boolean;
  filteredSeverity: SeverityLevel | 'all';
  report: string | null;
  isGeneratingReport: boolean;
  projectFiles: Record<string, string>;
  viewingVulnerability: Vulnerability | null;
  setViewingVulnerability: (vul: Vulnerability | null) => void;
  viewingFileName: string | null;
  setViewingFileName: (fileName: string | null) => void;
  isOptimizing: boolean;
  optimizedCode: string | null;
  optimizeVulnerabilityCode: (vulId: string) => Promise<void>;
  resetOptimization: () => void;
  startScan: (input: File | File[]) => Promise<void>;
  generateReport: () => Promise<void>;
  resetScan: () => void;
  toggleViewCode: () => void;
  setSeverityFilter: (severity: SeverityLevel | 'all') => void;
  generateAISuggestion: (vulId: string) => Promise<void>;
  provideFeedback: (vulId: string, helpful: boolean) => void;
}

const ScanContext = createContext<ScanContextType | undefined>(undefined);

/**
 * Helper to read a list of files and filter out non-code/junk files.
 */
const readProjectFiles = async (files: File[]): Promise<{ name: string; content: string }[]> => {
  const IGNORED_DIRS = ['node_modules', '.git', 'dist', 'build', '.next', 'out'];
  const ALLOWED_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.c', '.cpp', '.go', '.php'];

  const validFiles = files.filter(file => {
    const path = file.webkitRelativePath || file.name;
    const isIgnored = IGNORED_DIRS.some(dir => path.includes(`${dir}/`));
    const isCode = ALLOWED_EXTENSIONS.some(ext => path.endsWith(ext));
    return !isIgnored && isCode;
  });

  return Promise.all(
    validFiles.map(async (file) => {
      return new Promise<{ name: string; content: string }>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve({ 
          name: file.webkitRelativePath || file.name, 
          content: e.target?.result as string 
        });
        reader.onerror = reject;
        reader.readAsText(file);
      });
    })
  );
};

export const ScanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addToHistory } = useHistory();
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [viewingCode, setViewingCode] = useState(false);
  const [filteredSeverity, setFilteredSeverity] = useState<SeverityLevel | 'all'>('all');
  const [report, setReport] = useState<string | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [projectFiles, setProjectFiles] = useState<Record<string, string>>({});
  const [viewingVulnerability, setViewingVulnerability] = useState<Vulnerability | null>(null);
  const [viewingFileName, setViewingFileName] = useState<string | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedCode, setOptimizedCode] = useState<string | null>(null);

  const startScan = async (input: File | File[]) => {
    const files = Array.isArray(input) ? input : [input];
    if (files.length === 0) return;

    // Determine a name for the selection (file or folder)
    if (files.length > 1) {
      // Try to get folder name from webkitRelativePath
      const firstPath = files[0].webkitRelativePath;
      const folderName = firstPath ? firstPath.split('/')[0] : 'Project Folder';
      // Create a dummy file object to represent the folder in the UI
      setSelectedFile({ name: folderName, size: files.reduce((acc, f) => acc + f.size, 0) } as File);
    } else {
      setSelectedFile(files[0]);
    }
    setIsScanning(true);
    setScanProgress(10);
    setVulnerabilities([]);

    try {
      setScanProgress(20);
      const projectContents = await readProjectFiles(files);
      
      if (projectContents.length === 0) {
        throw new Error("No valid code files found in the selection.");
      }

      setScanProgress(30);
      
      // Store project files for viewing
      const filesMap: Record<string, string> = {};
      projectContents.forEach(f => {
        filesMap[f.name] = f.content;
      });
      setProjectFiles(filesMap);

      setScanProgress(40);

      // Aggregate all code into one context for Gemini
      // Adding headers helps Gemini understand file boundaries
      const aggregatedCode = projectContents
        .map(f => `// --- FILE: ${f.name} ---\n${f.content}`)
        .join("\n\n");

      // Perform the actual AI scan
      const results = await callGeminiForScan(aggregatedCode);
      
      setVulnerabilities(results);
      setScanProgress(100);

      // Save to history
      addToHistory({
        fileName: selectedFile?.name || 'Code Scan',
        vulnerabilities: results,
        report: null
      });
    } catch (error: any) {
      console.error("Scan failed:", error);
      alert(error.message || "Failed to analyze project. Check console.");
    } finally {
      setTimeout(() => setIsScanning(false), 500);
    }
  };

  const generateAISuggestion = async (vulId: string) => {
    const vulnerability = vulnerabilities.find(v => v.id === vulId);
    if (!vulnerability) return;

    setVulnerabilities(prev => 
      prev.map(v => v.id === vulId ? { ...v, aiSuggestionLoading: true } : v)
    );

    try {
      const fix = await callGeminiForFix(vulnerability.code, vulnerability.name);
      setVulnerabilities(prev => 
        prev.map(v => v.id === vulId ? { ...v, aiSuggestion: fix, aiSuggestionLoading: false } : v)
      );
    } catch (error) {
      console.error("Suggestion failed:", error);
      setVulnerabilities(prev => 
        prev.map(v => v.id === vulId ? { ...v, aiSuggestionLoading: false } : v)
      );
    }
  };

  const generateReport = async () => {
    if (vulnerabilities.length === 0) return;
    setIsGeneratingReport(true);
    try {
      const generatedReport = await generateReportFromVulnerabilities(vulnerabilities);
      setReport(generatedReport);
    } catch (error) {
      console.error("Report generation failed:", error);
      alert("Failed to generate report. Please try again.");
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const optimizeVulnerabilityCode = async (vulId: string) => {
    const vulnerability = vulnerabilities.find(v => v.id === vulId);
    if (!vulnerability) return;

    const fullCode = projectFiles[vulnerability.fileName];
    if (!fullCode) return;

    setIsOptimizing(true);
    setOptimizedCode(null);
    try {
      const { callGeminiForOptimization } = await import('../lib/gemini');
      const optimized = await callGeminiForOptimization(fullCode, vulnerability);
      setOptimizedCode(optimized);
    } catch (error) {
      console.error("Optimization failed:", error);
      alert("Failed to optimize code. Please try again.");
    } finally {
      setIsOptimizing(false);
    }
  };

  const resetOptimization = () => {
    setOptimizedCode(null);
    setIsOptimizing(false);
  };

  const resetScan = () => {
    setSelectedFile(null);
    setIsScanning(false);
    setScanProgress(0);
    setVulnerabilities([]);
    setViewingCode(false);
    setReport(null);
    setViewingVulnerability(null);
    setViewingFileName(null);
    setOptimizedCode(null);
    setIsOptimizing(false);
  };

  const toggleViewCode = () => setViewingCode(!viewingCode);
  const setSeverityFilter = (s: SeverityLevel | 'all') => setFilteredSeverity(s);
  const provideFeedback = (id: string, h: boolean) => console.log(`Feedback for ${id}: ${h}`);

  return (
    <ScanContext.Provider value={{
      isScanning, scanProgress, vulnerabilities, selectedFile, viewingCode,
      filteredSeverity, report, isGeneratingReport, projectFiles, viewingVulnerability,
      setViewingVulnerability, viewingFileName, setViewingFileName, isOptimizing, 
      optimizedCode, optimizeVulnerabilityCode,
      resetOptimization, startScan, generateReport, resetScan, toggleViewCode,
      setSeverityFilter, generateAISuggestion, provideFeedback
    }}>
      {children}
    </ScanContext.Provider>
  );
};

export const useScan = () => {
  const context = useContext(ScanContext);
  if (!context) throw new Error('useScan must be used within a ScanProvider');
  return context;
};
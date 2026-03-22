import React, { useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { useScan } from '../../context/ScanContext';
import { FileCode, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

export const CodeViewer: React.FC = () => {
  const { 
    viewingFileName,
    setViewingFileName,
    vulnerabilities, 
    projectFiles, 
    viewingVulnerability,
    setViewingVulnerability,
    isOptimizing, 
    optimizeVulnerabilityCode 
  } = useScan();
  const scrollRef = useRef<HTMLDivElement>(null);

  const isOpen = !!viewingFileName;
  const fileName = viewingFileName || '';
  const code = projectFiles[fileName] || '';

  // Get all vulnerabilities for this file
  const fileVulnerabilities = vulnerabilities.filter(v => v.fileName === fileName);
  const targetLine = viewingVulnerability?.lineNumber || (fileVulnerabilities.length > 0 ? fileVulnerabilities[0].lineNumber : 0);
  const errorLines = new Set(fileVulnerabilities.map(v => v.lineNumber));

  // Determine language based on file extension
  const getLanguage = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'ts':
      case 'tsx':
        return 'typescript';
      case 'js':
      case 'jsx':
        return 'javascript';
      case 'py':
        return 'python';
      case 'java':
        return 'java';
      case 'c':
      case 'cpp':
        return 'cpp';
      case 'go':
        return 'go';
      case 'php':
        return 'php';
      default:
        return 'text';
    }
  };

  // Scroll to target line when opened
  useEffect(() => {
    if (isOpen && targetLine > 0) {
      // Small delay to ensure the modal is fully rendered
      const timer = setTimeout(() => {
        const lineElement = document.querySelector(`[data-line-number="${targetLine}"]`);
        if (lineElement) {
          lineElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, targetLine]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && setViewingFileName(null)}>
      <DialogContent className="max-w-5xl w-[90vw] h-[80vh] flex flex-col p-0 overflow-hidden bg-slate-900 border-slate-800">
        <DialogHeader className="p-4 border-b border-slate-800 flex flex-row items-center justify-between bg-slate-900">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-scanner-blue-500/10 rounded-lg">
              <FileCode className="h-5 w-5 text-scanner-blue-400" />
            </div>
            <div>
              <DialogTitle className="text-white text-lg font-mono truncate max-w-md">
                {fileName}
              </DialogTitle>
              <DialogDescription className="text-slate-400 text-xs">
                {fileVulnerabilities.length} logical errors / vulnerabilities identified in this file
              </DialogDescription>
            </div>
          </div>
          
          {fileVulnerabilities.length > 1 && (
            <div className="flex items-center space-x-2 mr-8">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Navigate:</span>
              <div className="flex bg-slate-800 rounded-md p-0.5">
                {fileVulnerabilities.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => setViewingVulnerability(v)}
                    className={`px-2 py-0.5 text-[10px] rounded transition-colors ${
                      viewingVulnerability?.id === v.id 
                        ? 'bg-scanner-blue-500 text-white' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {v.lineNumber}
                  </button>
                ))}
              </div>
            </div>
          )}
        </DialogHeader>

        <div className="flex-grow overflow-auto bg-[#1d1f21] custom-scrollbar" ref={scrollRef}>
          <SyntaxHighlighter
            language={getLanguage(fileName)}
            style={atomDark}
            showLineNumbers={true}
            startingLineNumber={1}
            wrapLines={true}
            customStyle={{
              margin: 0,
              padding: '1rem',
              fontSize: '14px',
              backgroundColor: 'transparent',
            }}
            lineProps={(lineNumber) => {
              const style: React.CSSProperties = { display: "block", width: "100%" };
              
              if (errorLines.has(lineNumber)) {
                const isSelected = viewingVulnerability?.lineNumber === lineNumber;
                style.backgroundColor = isSelected ? "rgba(234, 179, 8, 0.25)" : "rgba(239, 68, 68, 0.1)";
                style.borderLeft = isSelected ? "4px solid #eab308" : "3px solid #ef4444";
                style.cursor = "pointer";
              }

              return { 
                style,
                'data-line-number': lineNumber,
                onClick: () => {
                  const vul = fileVulnerabilities.find(v => v.lineNumber === lineNumber);
                  if (vul) setViewingVulnerability(vul);
                }
              };
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-between items-center">
          <div className="text-xs text-slate-500 italic">
            {viewingVulnerability ? (
              <span className="text-red-400 font-semibold">Selected: {viewingVulnerability.name}</span>
            ) : (
              "Select an issue to focus or optimize"
            )}
          </div>
          <Button
            onClick={() => {
              const target = viewingVulnerability || (fileVulnerabilities.length > 0 ? fileVulnerabilities[0] : null);
              if (target) optimizeVulnerabilityCode(target.id);
            }}
            disabled={isOptimizing}
            className="bg-scanner-blue-600 hover:bg-scanner-blue-700 text-white"
          >
            {isOptimizing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Optimize with AI
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

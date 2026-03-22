import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { useScan } from '../../context/ScanContext';
import { Copy, Check, ShieldCheck, FileCode, ArrowLeftRight } from 'lucide-react';
import { toast } from 'sonner';

export const CodeComparison: React.FC = () => {
  const { optimizedCode, viewingVulnerability, projectFiles, resetOptimization } = useScan();
  const [copied, setCopied] = useState(false);

  const isOpen = !!optimizedCode;
  const fileName = viewingVulnerability?.fileName || '';
  const originalCode = projectFiles[fileName] || '';
  const targetLine = viewingVulnerability?.lineNumber || 0;

  const handleCopy = () => {
    if (!optimizedCode) return;
    navigator.clipboard.writeText(optimizedCode);
    setCopied(true);
    toast.success("Optimized code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && resetOptimization()}>
      <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] flex flex-col p-0 overflow-hidden bg-slate-900 border-slate-800">
        <DialogHeader className="p-4 border-b border-slate-800 flex flex-row items-center justify-between bg-slate-900">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <DialogTitle className="text-white text-lg">
                Code Optimization Comparison
              </DialogTitle>
              <DialogDescription className="text-slate-400 text-xs flex items-center">
                <FileCode className="h-3 w-3 mr-1" /> {fileName}
                <span className="mx-2">•</span>
                Optimized version of vulnerable code at line {targetLine}
              </DialogDescription>
            </div>
          </div>
          <Button 
            onClick={handleCopy} 
            variant="outline" 
            size="sm"
            className="border-slate-700 hover:bg-slate-800 text-slate-200"
          >
            {copied ? <Check className="h-4 w-4 mr-2 text-green-400" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "Copied!" : "Copy Optimized Code"}
          </Button>
        </DialogHeader>

        <div className="flex-grow flex overflow-hidden">
          {/* Original Code */}
          <div className="flex-1 flex flex-col border-r border-slate-800 overflow-hidden">
            <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Original Code</span>
              <span className="text-[10px] text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded">Vulnerable</span>
            </div>
            <div className="flex-grow overflow-auto bg-[#1d1f21]">
              <SyntaxHighlighter
                language={getLanguage(fileName)}
                style={atomDark}
                showLineNumbers={true}
                wrapLines={true}
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  fontSize: '13px',
                  backgroundColor: 'transparent',
                }}
                lineProps={(lineNumber) => {
                  if (lineNumber === targetLine) {
                    return { style: { display: "block", width: "100%", backgroundColor: "rgba(239, 68, 68, 0.1)", borderLeft: "3px solid #ef4444" } };
                  }
                  return {};
                }}
              >
                {originalCode}
              </SyntaxHighlighter>
            </div>
          </div>

          {/* Optimized Code */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Optimized Code</span>
              <span className="text-[10px] text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded flex items-center">
                <ShieldCheck className="h-3 w-3 mr-1" /> Secured
              </span>
            </div>
            <div className="flex-grow overflow-auto bg-[#1d1f21]">
              <SyntaxHighlighter
                language={getLanguage(fileName)}
                style={atomDark}
                showLineNumbers={true}
                wrapLines={true}
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  fontSize: '13px',
                  backgroundColor: 'transparent',
                }}
              >
                {optimizedCode || ''}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

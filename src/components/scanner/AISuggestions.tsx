
import React from 'react';
import { useScan } from '../../context/ScanContext';
import { Vulnerability } from '@/types';
import { ThumbsUp, ThumbsDown, Copy, BrainCircuit } from 'lucide-react';

interface AISuggestionsProps {
  vulnerability: Vulnerability;
}

export const AISuggestions: React.FC<AISuggestionsProps> = ({ vulnerability }) => {
  const { generateAISuggestion, provideFeedback } = useScan();

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, you would show a toast or notification
    console.log('Copied to clipboard');
  };

  const handleFeedback = (vulId: string, helpful: boolean) => {
    provideFeedback(vulId, helpful);
    // In a real app, you would show a thank you message or disable the buttons
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2 flex items-center">
        <BrainCircuit className="h-5 w-5 mr-2 text-scanner-blue-600 dark:text-scanner-blue-400" />
        AI-Suggested Fix
      </h3>

      {vulnerability.aiSuggestion ? (
        <div className="space-y-4">
          <div className="code-block">
            {/* This would be better with a syntax highlighted code block in a real app */}
            <pre className="text-slate-800 dark:text-slate-200 whitespace-pre-wrap">{vulnerability.aiSuggestion}</pre>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <button
                onClick={() => handleFeedback(vulnerability.id, true)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-scanner-blue-700 dark:text-scanner-blue-300 bg-scanner-blue-100 dark:bg-scanner-blue-900/20 hover:bg-scanner-blue-200 dark:hover:bg-scanner-blue-900/30 transition-colors"
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                Helpful
              </button>
              <button
                onClick={() => handleFeedback(vulnerability.id, false)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <ThumbsDown className="h-4 w-4 mr-1" />
                Not Helpful
              </button>
            </div>

            <button
              onClick={() => handleCopyToClipboard(vulnerability.aiSuggestion || '')}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy to Clipboard
            </button>
          </div>
        </div>
      ) : (
        <div>
          {vulnerability.aiSuggestionLoading ? (
            <div className="p-8 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-center space-x-2">
                <div className="loading-dots">
                  <span className="animate-loading-dots"></span>
                  <span className="animate-loading-dots-2"></span>
                  <span className="animate-loading-dots-3"></span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">Generating AI suggestion...</p>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <p className="text-slate-700 dark:text-slate-300 mb-4">No suggestion has been generated yet.</p>
              <button
                onClick={() => generateAISuggestion(vulnerability.id)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-scanner-blue-600 hover:bg-scanner-blue-700 transition-colors"
              >
                <BrainCircuit className="h-4 w-4 mr-2" />
                Generate AI Suggestion
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


import React, { useState } from 'react';
import { FileJson, FileText, Share, Download, Mail, File as FileIcon } from 'lucide-react';
import { useScan } from '../../context/ScanContext';
import { Button } from '../ui/button';
import { generatePDFReport } from '../../lib/pdfGenerator';
import { cleanText } from '../../lib/utils';

export const ReportSection: React.FC = () => {
  const { vulnerabilities, selectedFile, report, isGeneratingReport, generateReport } = useScan();
  const [reportFormat, setReportFormat] = useState<'pdf' | 'json' | 'md'>('md');

  if (vulnerabilities.length === 0) {
    return null;
  }

  const handleGenerateReport = async () => {
    await generateReport();
  };

  const handleDownload = () => {
    if (!report) return;
    
    if (reportFormat === 'pdf') {
      generatePDFReport(vulnerabilities, report, selectedFile?.name || 'project');
      return;
    }
    
    const element = document.createElement("a");
    const file = new Blob([report], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `security-report-${selectedFile?.name || 'project'}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = () => {
    if (!report) return;
    navigator.clipboard.writeText(report);
    alert("Report copied to clipboard!");
  };

  const handleEmailReport = () => {
    if (!report) return;
    const mailtoUrl = `mailto:?subject=Security Report for ${selectedFile?.name}&body=${encodeURIComponent(report)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="mt-12 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-card overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center">
            Report Generation
          </h2>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-2/3 space-y-4">
              <p className="text-slate-700 dark:text-slate-300">
                Generate a comprehensive report of all vulnerabilities found in {selectedFile?.name}. You can download the report or share it directly.
              </p>
              
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="reportFormat"
                    className="form-radio text-scanner-blue-600"
                    checked={reportFormat === 'md'}
                    onChange={() => setReportFormat('md')}
                  />
                  <span className="text-slate-700 dark:text-slate-300 flex items-center">
                    <FileText className="mr-1 h-4 w-4" /> Markdown
                  </span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="reportFormat"
                    className="form-radio text-scanner-blue-600"
                    checked={reportFormat === 'pdf'}
                    onChange={() => setReportFormat('pdf')}
                  />
                  <span className="text-slate-700 dark:text-slate-300 flex items-center">
                    <FileIcon className="mr-1 h-4 w-4" /> PDF
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer opacity-50 cursor-not-allowed">
                  <input
                    type="radio"
                    name="reportFormat"
                    className="form-radio text-scanner-blue-600"
                    disabled
                  />
                  <span className="text-slate-700 dark:text-slate-300 flex items-center">
                    <FileJson className="mr-1 h-4 w-4" /> JSON (Coming Soon)
                  </span>
                </label>
              </div>
            </div>
            
            <div className="w-full md:w-1/3 flex justify-center md:justify-end">
              {!report ? (
                <Button
                  onClick={handleGenerateReport}
                  disabled={isGeneratingReport}
                  className="w-full md:w-auto"
                >
                  {isGeneratingReport ? (
                    <>
                      <div className="loading-dots">
                        <span className="animate-loading-dots"></span>
                        <span className="animate-loading-dots-2"></span>
                        <span className="animate-loading-dots-3"></span>
                      </div>
                      <span className="ml-2">Generating...</span>
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Generate Report
                    </>
                  )}
                </Button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={handleDownload} variant="default">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button onClick={handleShare} variant="outline">
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button onClick={handleEmailReport} variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                </div>
              )}
            </div>
          </div>

          {report && (
            <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 max-h-96 overflow-y-auto">
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Report Preview</h3>
              <div className="prose dark:prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300 font-sans">
                  {cleanText(report)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

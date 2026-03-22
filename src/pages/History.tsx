import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ThemeProvider } from '../context/ThemeContext';
import { useHistory } from '../context/HistoryContext';
import { HistoryItem, Vulnerability } from '@/types';
import { Calendar, FileCode, Trash2, ArrowRight, ShieldCheck, AlertTriangle, Download, Loader2, Eye, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { generateReportFromVulnerabilities } from '../lib/gemini';
import { generatePDFReport } from '../lib/pdfGenerator';
import { cleanText } from '../lib/utils';

const History = () => {
  const { history, removeFromHistory, clearHistory, updateHistoryItem } = useHistory();
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleExpandSummary = async (item: HistoryItem) => {
    setSelectedItem(item);
    setIsDialogOpen(true);

    if (!item.report) {
      setIsGenerating(true);
      try {
        const generatedReport = await generateReportFromVulnerabilities(item.vulnerabilities);
        updateHistoryItem(item.id, { report: generatedReport });
        // Update local state if needed (though context update will trigger re-render)
        setSelectedItem({ ...item, report: generatedReport });
      } catch (error) {
        console.error("Failed to generate report:", error);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handleDownload = () => {
    if (selectedItem && selectedItem.report) {
      generatePDFReport(selectedItem.vulnerabilities, selectedItem.report, selectedItem.fileName);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Navbar />
        
        <main className="flex-grow pt-20">
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Recent Scans
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400">
                    Review your past security audits and AI-suggested improvements.
                  </p>
                </div>
                {history.length > 0 && (
                  <button 
                    onClick={clearHistory}
                    className="mt-4 md:mt-0 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear All History
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl p-12 text-center border border-slate-200 dark:border-slate-700 shadow-sm animate-fade-in">
                  <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <FileCode className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No scans yet</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">Start by scanning your code for vulnerabilities.</p>
                  <Link to="/scanner" className="inline-flex items-center px-6 py-3 bg-scanner-blue-600 hover:bg-scanner-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-scanner-blue-500/20">
                    Go to Scanner
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              ) : (
                <div className="grid gap-6">
                  {history.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                      <div className="p-6">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                          <div className="flex items-start">
                            <div className="p-3 bg-scanner-blue-100 dark:bg-scanner-blue-900/20 text-scanner-blue-600 dark:text-scanner-blue-400 rounded-lg mr-4 mt-1">
                              <ShieldCheck className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-scanner-blue-600 dark:group-hover:text-scanner-blue-400 transition-colors">
                                {item.fileName}
                              </h3>
                              <div className="flex flex-wrap items-center text-sm text-slate-500 dark:text-slate-400 mt-2 gap-y-2">
                                <div className="flex items-center bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded mr-3">
                                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                                  {new Date(item.timestamp).toLocaleString()}
                                </div>
                                <div className="flex items-center bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 px-2 py-0.5 rounded">
                                  <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
                                  {item.vulnerabilities.length} Issues Found
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 w-full lg:w-auto">
                            <button 
                              onClick={() => handleExpandSummary(item)}
                              className="flex-grow lg:flex-grow-0 inline-flex items-center justify-center px-5 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-sm font-semibold hover:bg-slate-800 dark:hover:bg-white transition-colors"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Summary
                            </button>
                            <button 
                              onClick={() => removeFromHistory(item.id)}
                              className="p-2.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all"
                              title="Delete from history"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
        
        <Footer />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center">
              <FileText className="mr-2 h-6 w-6 text-scanner-blue-600" />
              Scan Summary: {selectedItem?.fileName}
            </DialogTitle>
            <DialogDescription>
              Detailed security analysis and AI-recommended improvements.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Total Issues</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedItem?.vulnerabilities.length}</p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/20">
                <p className="text-xs text-red-500 uppercase font-bold tracking-wider mb-1">High Severity</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {selectedItem?.vulnerabilities.filter(v => v.severity === 'high').length}
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Date Scanned</p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {selectedItem && new Date(selectedItem.timestamp).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">AI Analysis Report</h3>
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center p-12 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
                  <Loader2 className="h-10 w-10 text-scanner-blue-600 animate-spin mb-4" />
                  <p className="text-slate-600 dark:text-slate-400 font-medium">Generating detailed report...</p>
                </div>
              ) : selectedItem?.report ? (
                <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 prose dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                    {cleanText(selectedItem.report)}
                  </pre>
                </div>
              ) : (
                <div className="p-6 text-center text-slate-500 dark:text-slate-400 italic">
                  Report could not be loaded.
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
            {selectedItem?.report && (
              <Button 
                onClick={handleDownload}
                className="w-full sm:w-auto bg-scanner-blue-600 hover:bg-scanner-blue-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default History;



import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { UploadSection } from '../components/scanner/UploadSection';
import { ResultsDisplay } from '../components/scanner/ResultsDisplay';
import { ReportSection } from '../components/scanner/ReportSection';
import { CodeViewer } from '../components/scanner/CodeViewer';
import { CodeComparison } from '../components/scanner/CodeComparison';
import { ScanProvider } from '../context/ScanContext';
import { ThemeProvider } from '../context/ThemeContext';

const Scanner = () => {
  return (
    <ThemeProvider>
      <ScanProvider>
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
          <Navbar />
          
          <main className="flex-grow pt-20">
            <section className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center mb-12">
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    Scan Your Code
                  </h1>
                  <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl">
                    Upload your files to identify vulnerabilities and get AI-powered solutions.
                  </p>
                </div>
                
                <UploadSection />
                <ResultsDisplay />
                <ReportSection />
                <CodeViewer />
                <CodeComparison />
              </div>
            </section>
          </main>
          
          <Footer />
        </div>
      </ScanProvider>
    </ThemeProvider>
  );
};

export default Scanner;

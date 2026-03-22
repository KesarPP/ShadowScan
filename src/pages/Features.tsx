
import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { FileCode, Scan, BrainCircuit, Database, Shield, Check } from 'lucide-react';
import { ThemeProvider } from '../context/ThemeContext';

const Features = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Navbar />
        
        <main className="flex-grow pt-20">
          {/* Features Hero Section */}
          <section className="py-16 sm:py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex flex-col items-center text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                  <span className="blue-gradient-text">Advanced Features</span>
                </h1>
                <p className="text-xl max-w-3xl text-slate-700 dark:text-slate-300">
                  Discover how SHADOWSCAN empowers your security workflow with these powerful features.
                </p>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-0 left-0 right-0 h-full overflow-hidden -z-10">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-scanner-blue-100 dark:bg-scanner-blue-900/20 rounded-full filter blur-3xl opacity-50"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-scanner-blue-50 dark:bg-scanner-blue-900/10 rounded-full filter blur-3xl opacity-40"></div>
            </div>
          </section>
          
          {/* Extended Features Section */}
          <section className="py-12 bg-white dark:bg-slate-800 border-y border-slate-200 dark:border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="flex flex-col items-center text-center p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-card transition-all duration-300">
                  <div className="p-3 bg-scanner-blue-50 dark:bg-scanner-blue-900/20 rounded-full mb-4">
                    <FileCode className="h-7 w-7 text-scanner-blue-600 dark:text-scanner-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Easy Code Upload</h3>
                  <p className="text-slate-600 dark:text-slate-400">Drag-and-drop your code files for instant vulnerability scanning.</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-card transition-all duration-300">
                  <div className="p-3 bg-scanner-blue-50 dark:bg-scanner-blue-900/20 rounded-full mb-4">
                    <Scan className="h-7 w-7 text-scanner-blue-600 dark:text-scanner-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Detailed Analysis</h3>
                  <p className="text-slate-600 dark:text-slate-400">Get comprehensive reports with line-by-line vulnerability detection.</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-card transition-all duration-300">
                  <div className="p-3 bg-scanner-blue-50 dark:bg-scanner-blue-900/20 rounded-full mb-4">
                    <BrainCircuit className="h-7 w-7 text-scanner-blue-600 dark:text-scanner-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">AI-Powered Fixes</h3>
                  <p className="text-slate-600 dark:text-slate-400">Receive intelligent suggestions to patch vulnerabilities immediately.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="p-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
                  <div className="flex items-start mb-4">
                    <div className="p-2 bg-scanner-blue-50 dark:bg-scanner-blue-900/20 rounded-full mr-4">
                      <Database className="h-6 w-6 text-scanner-blue-600 dark:text-scanner-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Multi-language Support</h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        SHADOWSCAN supports all major programming languages including JavaScript, Python, Java, Go, Ruby, PHP, and more.
                      </p>
                    </div>
                  </div>
                  <ul className="mt-4 pl-12 space-y-2">
                    <li className="flex items-center text-slate-600 dark:text-slate-400">
                      <Check className="h-5 w-5 text-scanner-blue-600 dark:text-scanner-blue-400 mr-2" />
                      Language-specific vulnerability detection
                    </li>
                    <li className="flex items-center text-slate-600 dark:text-slate-400">
                      <Check className="h-5 w-5 text-scanner-blue-600 dark:text-scanner-blue-400 mr-2" />
                      Framework-aware scanning
                    </li>
                    <li className="flex items-center text-slate-600 dark:text-slate-400">
                      <Check className="h-5 w-5 text-scanner-blue-600 dark:text-scanner-blue-400 mr-2" />
                      Custom rule configurations
                    </li>
                  </ul>
                </div>
                
                <div className="p-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
                  <div className="flex items-start mb-4">
                    <div className="p-2 bg-scanner-blue-50 dark:bg-scanner-blue-900/20 rounded-full mr-4">
                      <Shield className="h-6 w-6 text-scanner-blue-600 dark:text-scanner-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Enhanced Security</h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        Your code is securely processed and never stored permanently. We use encryption to protect your intellectual property.
                      </p>
                    </div>
                  </div>
                  <ul className="mt-4 pl-12 space-y-2">
                    <li className="flex items-center text-slate-600 dark:text-slate-400">
                      <Check className="h-5 w-5 text-scanner-blue-600 dark:text-scanner-blue-400 mr-2" />
                      End-to-end encryption
                    </li>
                    <li className="flex items-center text-slate-600 dark:text-slate-400">
                      <Check className="h-5 w-5 text-scanner-blue-600 dark:text-scanner-blue-400 mr-2" />
                      Temporary processing only
                    </li>
                    <li className="flex items-center text-slate-600 dark:text-slate-400">
                      <Check className="h-5 w-5 text-scanner-blue-600 dark:text-scanner-blue-400 mr-2" />
                      Compliant with security standards
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Features;

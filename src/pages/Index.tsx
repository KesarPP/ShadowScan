
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ThemeProvider } from '../context/ThemeContext';
import { Shield, Scan, Code, FileCode, CheckCircle, Lock } from 'lucide-react';

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Navbar />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative py-16 sm:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="bg-scanner-blue-100 dark:bg-scanner-blue-900/30 p-4 rounded-full inline-flex items-center justify-center mb-6">
                  <Shield className="h-10 w-10 text-scanner-blue-600 dark:text-scanner-blue-400" />
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                  <span className="blue-gradient-text">SHADOWSCAN</span>
                </h1>
                
                <p className="text-xl md:text-2xl max-w-3xl text-slate-700 dark:text-slate-300 mb-8">
                  Powerful AI-driven vulnerability scanning to keep your code secure. Upload your code and get instant security analysis.
                </p>
                
                <div className="flex items-center justify-center space-x-4">
                  <Link to="/scanner" className="px-6 py-3 bg-scanner-blue-600 hover:bg-scanner-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center">
                    <Scan className="mr-2 h-5 w-5" />
                    Start Scanning
                  </Link>
                  <Link to="/demo" className="px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-medium rounded-lg transition-colors duration-200 flex items-center">
                    <Code className="mr-2 h-5 w-5" />
                    Start Demo
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-0 left-0 right-0 h-full overflow-hidden -z-10">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-scanner-blue-100 dark:bg-scanner-blue-900/20 rounded-full filter blur-3xl opacity-50"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-scanner-blue-50 dark:bg-scanner-blue-900/10 rounded-full filter blur-3xl opacity-40"></div>
            </div>
          </section>
          
          {/* Features Preview Section */}
          <section className="py-12 bg-white dark:bg-slate-800 border-y border-slate-200 dark:border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Key Features
                </h2>
                <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl">
                  SHADOWSCAN provides comprehensive security scanning powered by advanced AI
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    <Lock className="h-7 w-7 text-scanner-blue-600 dark:text-scanner-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">AI-Powered Fixes</h3>
                  <p className="text-slate-600 dark:text-slate-400">Receive intelligent suggestions to patch vulnerabilities immediately.</p>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <Link to="/features" className="inline-flex items-center justify-center px-6 py-3 border border-scanner-blue-600 text-scanner-blue-600 dark:border-scanner-blue-400 dark:text-scanner-blue-400 hover:bg-scanner-blue-50 dark:hover:bg-scanner-blue-900/10 font-medium rounded-lg transition-colors duration-200">
                  Explore All Features
                </Link>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-16 sm:py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="bg-scanner-blue-600 dark:bg-scanner-blue-700/80 rounded-2xl overflow-hidden shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                  <div className="p-8 lg:p-12">
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Ready to Secure Your Code?
                    </h2>
                    <p className="text-xl text-scanner-blue-100 mb-6">
                      Try our scanner now and identify vulnerabilities in your code before they become security issues.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                      <Link to="/scanner" className="inline-flex items-center justify-center px-6 py-3 bg-white text-scanner-blue-600 hover:bg-scanner-blue-50 font-medium rounded-lg transition-colors duration-200">
                        <Scan className="mr-2 h-5 w-5" />
                        Start Scanning
                      </Link>
                      <Link to="/demo" className="inline-flex items-center justify-center px-6 py-3 border border-white text-white hover:bg-scanner-blue-700 font-medium rounded-lg transition-colors duration-200">
                        <Code className="mr-2 h-5 w-5" />
                        View Demo
                      </Link>
                    </div>
                  </div>
                  <div className="hidden lg:flex justify-center p-12">
                    <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Security Features</h3>
                        <ul className="space-y-3">
                          <li className="flex items-center text-slate-700 dark:text-slate-300">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            AI-powered vulnerability detection
                          </li>
                          <li className="flex items-center text-slate-700 dark:text-slate-300">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            Multi-language support
                          </li>
                          <li className="flex items-center text-slate-700 dark:text-slate-300">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            Automatic fix suggestions
                          </li>
                          <li className="flex items-center text-slate-700 dark:text-slate-300">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            Comprehensive reporting
                          </li>
                          <li className="flex items-center text-slate-700 dark:text-slate-300">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            Secure code handling
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-0 left-0 right-0 h-full overflow-hidden -z-10">
              <div className="absolute -bottom-24 right-24 w-96 h-96 bg-scanner-blue-100 dark:bg-scanner-blue-900/20 rounded-full filter blur-3xl opacity-30"></div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;

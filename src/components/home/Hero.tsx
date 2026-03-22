
import React from 'react';
import { Shield, Lock, AlertCircle, CheckCircle } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
      {/* Background gradient elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[50%] top-0 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-[10%] rounded-full bg-scanner-blue-50 dark:bg-scanner-blue-900/20 opacity-20 blur-3xl"></div>
        <div className="absolute right-[25%] bottom-0 h-[800px] w-[800px] rounded-full bg-scanner-blue-100 dark:bg-scanner-blue-900/30 opacity-20 blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:mx-auto lg:col-span-6 lg:text-left">
            <div className="inline-flex items-center py-1 px-3 rounded-full text-sm font-medium bg-scanner-blue-100 dark:bg-scanner-blue-900/30 text-scanner-blue-800 dark:text-scanner-blue-300 mb-6 animate-fade-in">
              <Shield className="mr-1 h-4 w-4" />
              AI-Powered Vulnerability Scanner
            </div>
            
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block xl:inline">Detect vulnerabilities with </span>
              <span className="block blue-gradient-text xl:inline">intelligent precision</span>
            </h1>
            
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 sm:mt-5 sm:text-lg md:mt-5 md:text-xl lg:mx-0">
              SHADOWSCAN uses advanced AI to analyze your code, identify security vulnerabilities, and recommend fixes—all in one intuitive interface.
            </p>
            
            <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a
                  href="/scanner"        
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-scanner-blue-600 hover:bg-scanner-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200 animated-button"
                >
                  Start Scanning
                </a>
              </div>
             
            </div>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
              <div className="flex items-center text-slate-600 dark:text-slate-400">
                <CheckCircle className="h-5 w-5 text-scanner-blue-600 dark:text-scanner-blue-400 mr-2" />
                Severity levels
              </div>
              <div className="flex items-center text-slate-600 dark:text-slate-400">
                <CheckCircle className="h-5 w-5 text-scanner-blue-600 dark:text-scanner-blue-400 mr-2" />
                Real-time Analysis
              </div>
              <div className="flex items-center text-slate-600 dark:text-slate-400">
                <CheckCircle className="h-5 w-5 text-scanner-blue-600 dark:text-scanner-blue-400 mr-2" />
                AI-Powered Fixes
              </div>
            </div>
          </div>
          
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-xl lg:max-w-md">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-scanner-blue-50 dark:bg-scanner-blue-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
              <div className="absolute -bottom-6 -right-6 w-56 h-56 bg-scanner-blue-100 dark:bg-scanner-blue-900/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '1s' }}></div>
              
              {/* Image/illustration */}
              <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 shadow-lg">
                <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-lg mb-2 flex items-center justify-between">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400">code.js</div>
                  <div></div>
                </div>
                
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg overflow-hidden">
                  <div className="font-mono text-sm text-left leading-relaxed">
                    <div className="flex">
                      <span className="text-slate-500 dark:text-slate-500 w-8">1</span>
                      <span className="text-slate-800 dark:text-slate-300">function <span className="text-scanner-blue-600 dark:text-scanner-blue-400">validateUser</span>(user) {'{'}</span>
                    </div>
                    <div className="flex">
                      <span className="text-slate-500 dark:text-slate-500 w-8">2</span>
                      <span className="text-slate-800 dark:text-slate-300">&nbsp;&nbsp;const query = <span className="text-green-600 dark:text-green-400">`SELECT * FROM users WHERE id = ${'${userId}'}`</span>;</span>
                    </div>
                    <div className="flex bg-red-100 dark:bg-red-900/20">
                      <span className="text-slate-500 dark:text-slate-500 w-8">3</span>
                      <div className="flex-1 flex items-start">
                        <span className="text-slate-800 dark:text-slate-300">&nbsp;&nbsp;db.execute(query);</span>
                        <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 ml-2 animate-pulse" />
                      </div>
                    </div>
                    <div className="flex">
                      <span className="text-slate-500 dark:text-slate-500 w-8">4</span>
                      <span className="text-slate-800 dark:text-slate-300">{'}'}</span>
                    </div>
                    <div className="flex pt-3">
                      <span className="text-slate-500 dark:text-slate-500 w-8">5</span>
                      <span className="text-slate-800 dark:text-slate-300">function <span className="text-scanner-blue-600 dark:text-scanner-blue-400">renderHTML</span>(content) {'{'}</span>
                    </div>
                    <div className="flex bg-red-100 dark:bg-red-900/20">
                      <span className="text-slate-500 dark:text-slate-500 w-8">6</span>
                      <div className="flex-1 flex items-start">
                        <span className="text-slate-800 dark:text-slate-300">&nbsp;&nbsp;return <span className="text-red-600 dark:text-red-400">{'{'} dangerouslySetInnerHTML: {'{'} __html: content {'}'} {'}'}</span>;</span>
                        <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 ml-2 animate-pulse" />
                      </div>
                    </div>
                    <div className="flex">
                      <span className="text-slate-500 dark:text-slate-500 w-8">7</span>
                      <span className="text-slate-800 dark:text-slate-300">{'}'}</span>
                    </div>
                  </div>
                </div>
                
                {/* Scanning animation overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute inset-0 bg-scanner-blue-600/5 dark:bg-scanner-blue-400/10 backdrop-blur-[1px]"></div>
                  <div className="w-full h-1 bg-scanner-blue-100 dark:bg-scanner-blue-900/30 overflow-hidden">
                    <div className="h-full w-1/3 bg-scanner-blue-500 dark:bg-scanner-blue-400 animate-pulse"></div>
                  </div>
                  <div className="absolute top-1/3 left-0 right-0 flex justify-center">
                    <div className="bg-scanner-blue-600/90 dark:bg-scanner-blue-500/90 text-white text-xs font-medium px-3 py-1 rounded-full animate-pulse shadow-lg">
                      Scanning for vulnerabilities...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

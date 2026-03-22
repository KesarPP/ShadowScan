
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Github, Twitter, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-[#0b0f1a] pt-16 pb-8 border-t border-slate-200 dark:border-slate-800/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="md:col-span-4 lg:col-span-5">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-scanner-blue-500 rounded-xl shadow-lg shadow-scanner-blue-500/20">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">
                ShadowScan
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed mb-8">
              Protecting the digital frontier with advanced AI-powered vulnerability detection. 
              Our mission is to empower developers with immediate, actionable security insights.
            </p>
            <div className="flex items-center space-x-5">
              <a href="#" className="p-2 rounded-lg bg-slate-200/50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-scanner-blue-600 dark:hover:text-scanner-blue-400 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-200/50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-scanner-blue-600 dark:hover:text-scanner-blue-400 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="mailto:parabkesarp20@gmail.com" className="p-2 rounded-lg bg-slate-200/50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-scanner-blue-600 dark:hover:text-scanner-blue-400 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6">
              Product
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/features" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-scanner-blue-600 dark:hover:text-scanner-blue-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/scanner" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-scanner-blue-600 dark:hover:text-scanner-blue-400 transition-colors">
                  Live Scanner
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-scanner-blue-600 dark:hover:text-scanner-blue-400 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6">
              Resources
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/docs" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-scanner-blue-600 dark:hover:text-scanner-blue-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-scanner-blue-600 dark:hover:text-scanner-blue-400 transition-colors">
                  F.A.Q
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-scanner-blue-600 dark:hover:text-scanner-blue-400 transition-colors">
                  API License
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2 lg:col-span-3">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6">
              Connect
            </h3>
            <div className="space-y-4">
              <a href="mailto:parabkesarp20@gmail.com" className="inline-flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-scanner-blue-600 dark:hover:text-scanner-blue-400 transition-colors group">
                <span className="p-1.5 rounded-md bg-slate-200/50 dark:bg-slate-800 mr-2 group-hover:bg-scanner-blue-500/10 transition-colors">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                Support Email
              </a>
              <div className="pt-2">
                <div className="p-4 rounded-xl bg-gradient-to-br from-slate-100 to-white dark:from-slate-800/80 dark:to-slate-900 border border-slate-200 dark:border-slate-700/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Subscribe to our security newsletter for the latest threats & fixes.
                  </p>
                  <div className="mt-3 flex">
                    <input type="email" placeholder="Email" className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-l-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-scanner-blue-500 transition-all dark:text-white" />
                    <button className="bg-scanner-blue-600 hover:bg-scanner-blue-700 text-white rounded-r-lg px-3 py-1.5 text-xs font-medium transition-colors">
                      Join
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 order-2 md:order-1">
            &copy; {new Date().getFullYear()} ShadowScan Intelligence. Built for modern security.
          </p>
          <div className="flex items-center space-x-6 order-1 md:order-2">
            <Link to="/privacy" className="text-[10px] uppercase font-bold tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-[10px] uppercase font-bold tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

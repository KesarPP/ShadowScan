
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToggleTheme } from '../ui/ToggleTheme';
import {  Menu, X, Home } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 blur-backdrop shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
        <Link  to="/">
          <div className="flex items-center">                    
              <img src="logo.jpg" className="h-8 w-8 text-scanner-blue-600 dark:text-scanner-blue-400" />
              <span className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
                SHADOWSCAN
              </span>
             
          </div>
          </Link>
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-slate-700 dark:text-slate-200 hover:text-scanner-blue-600 dark:hover:text-scanner-blue-400 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="text-slate-700 dark:text-slate-200 hover:text-scanner-blue-600 dark:hover:text-scanner-blue-400 transition-colors"
            >
              Features
            </Link>
            <Link
              to="/scanner"
              className="text-slate-700 dark:text-slate-200 hover:text-scanner-blue-600 dark:hover:text-scanner-blue-400 transition-colors"
            >
              Scanner
            </Link>
            <Link
              to="/faq"
              className="text-slate-700 dark:text-slate-200 hover:text-scanner-blue-600 dark:hover:text-scanner-blue-400 transition-colors"
            >
              FAQ
            </Link>
            <Link
              to="/history"
              className="text-slate-700 dark:text-slate-200 hover:text-scanner-blue-600 dark:hover:text-scanner-blue-400 transition-colors"
            >
              History
            </Link>
            <Link
              to="/demo"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-scanner-blue-600 hover:bg-scanner-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-scanner-blue-500"
            >
              Start Demo
            </Link>
            <ToggleTheme />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ToggleTheme />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 dark:text-slate-200 hover:text-scanner-blue-600 dark:hover:text-scanner-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-scanner-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? 'max-h-screen opacity-100 visible'
            : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <div className="blur-backdrop px-4 pt-2 pb-4 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-scanner-blue-600 dark:hover:text-scanner-blue-400"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/features"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-scanner-blue-600 dark:hover:text-scanner-blue-400"
            onClick={() => setMobileMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            to="/scanner"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-scanner-blue-600 dark:hover:text-scanner-blue-400"
            onClick={() => setMobileMenuOpen(false)}
          >
            Scanner
          </Link>
          <Link
            to="/faq"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-scanner-blue-600 dark:hover:text-scanner-blue-400"
            onClick={() => setMobileMenuOpen(false)}
          >
            FAQ
          </Link>
          <Link
            to="/history"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-scanner-blue-600 dark:hover:text-scanner-blue-400"
            onClick={() => setMobileMenuOpen(false)}
          >
            History
          </Link>
          <Link
            to="/demo"
            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-scanner-blue-600 hover:bg-scanner-blue-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            Start Demo
          </Link>
        </div>
      </div>
    </nav>
  );
};

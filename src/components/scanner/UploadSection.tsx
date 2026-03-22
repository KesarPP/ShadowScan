
import React, { useState, useRef } from 'react';
import { Upload, FileCode, FilePlus, Eye, RotateCw } from 'lucide-react';
import { useScan } from '../../context/ScanContext';

export const UploadSection: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { startScan, resetScan, selectedFile, isScanning, scanProgress, viewingCode, toggleViewCode, vulnerabilities } = useScan();

  const handleDragIn = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(dragCounter + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragOut = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(dragCounter - 1);
    if (dragCounter - 1 === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setDragCounter(0);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    if (files.length > 0) {
      const fileArray = Array.from(files);
      startScan(fileArray);
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleNewScan = () => {
    resetScan();
  };

  // Accepted file types
  const acceptedTypes = ['.js', '.ts', '.py', '.java', '.go', '.rb', '.php', '.html', '.css', '.json', '.xml'];

  return (
    <div className="w-full my-8">
      {!selectedFile ? (
        <div
          className={`border-2 border-dashed rounded-xl p-8 transition-all duration-200 ease-in-out ${isDragging
            ? 'border-scanner-blue-500 bg-scanner-blue-50 dark:bg-scanner-blue-900/10'
            : 'border-slate-300 dark:border-slate-700 hover:border-scanner-blue-400 dark:hover:border-scanner-blue-500 bg-white dark:bg-slate-800'
            }`}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-4">
              <div className={`p-4 rounded-full ${isDragging
                ? 'bg-scanner-blue-100 dark:bg-scanner-blue-900/20 text-scanner-blue-600 dark:text-scanner-blue-400'
                : 'bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400'
                }`}>
                <Upload className="h-8 w-8" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              {isDragging ? 'Drop your file here' : 'Drag & drop your code file'}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              or <button className="text-scanner-blue-600 dark:text-scanner-blue-400 font-medium hover:underline" onClick={handleBrowseClick}>browse</button> from your computer
            </p>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              <p className="mb-1">Accepted file types: {acceptedTypes.join(', ')}</p>
              <p>Maximum file size: 10MB</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedTypes.join(',')}
              className="hidden"
              onChange={handleFileInput}
              {...({ webkitdirectory: "", directory: "" } as any)}
              multiple
            />
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-card overflow-hidden transition-all duration-300 animate-fade-in">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-scanner-blue-100 dark:bg-scanner-blue-900/20 text-scanner-blue-600 dark:text-scanner-blue-400 mr-4">
                <FileCode className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">
                  {selectedFile.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>

            <div className="flex space-x-2">

              <button
                onClick={handleNewScan}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                aria-label="New scan"
              >
                <RotateCw className="h-4 w-4 mr-1" />
                New Scan
              </button>
            </div>
          </div>

          {isScanning && (
            <div className="p-8 flex flex-col items-center justify-center">
              <div className="w-full max-w-md mb-4">
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mb-2">
                  <div
                    className="bg-scanner-blue-600 dark:bg-scanner-blue-500 h-2.5 rounded-full transition-all duration-200 ease-in-out"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Scanning...</span>
                  <span>{scanProgress}%</span>
                </div>
              </div>
              <div className="loading-dots">
                <span className="animate-loading-dots"></span>
                <span className="animate-loading-dots-2"></span>
                <span className="animate-loading-dots-3"></span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

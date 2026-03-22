
import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ThemeProvider } from '../context/ThemeContext';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, AlertTriangle, ArrowRight } from 'lucide-react';

const Demo = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Navbar />
        
        <main className="flex-grow pt-20">
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center text-center mb-12">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Try SHADOWSCAN Demo
                </h1>
                <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mb-8">
                  See how SHADOWSCAN detects and fixes vulnerabilities with these interactive examples
                </p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
                <Tabs defaultValue="sql-injection" className="w-full">
                  <div className="px-6 pt-6 border-b border-slate-200 dark:border-slate-700">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="sql-injection">SQL Injection</TabsTrigger>
                      <TabsTrigger value="xss">XSS Attack</TabsTrigger>
                      <TabsTrigger value="auth">Auth Bypass</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="sql-injection" className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Vulnerable Code</h3>
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-md p-4 font-mono text-sm overflow-x-auto">
                          <pre className="text-slate-800 dark:text-slate-300">
                            <div className="flex">
                              <span className="text-slate-500 dark:text-slate-500 w-8">1</span>
                              <span className="text-slate-800 dark:text-slate-300">function getUserData(userId) {'{'}</span>
                            </div>
                            <div className="flex">
                              <span className="text-slate-500 dark:text-slate-500 w-8">2</span>
                              <span className="text-slate-800 dark:text-slate-300">&nbsp;&nbsp;const query = <span className="text-green-600 dark:text-green-400">`SELECT * FROM users WHERE id = ${'{userId}'}`</span>;</span>
                            </div>
                            <div className="flex bg-red-100 dark:bg-red-900/20">
                              <span className="text-slate-500 dark:text-slate-500 w-8">3</span>
                              <span className="text-slate-800 dark:text-slate-300">&nbsp;&nbsp;return db.execute(query);</span>
                            </div>
                            <div className="flex">
                              <span className="text-slate-500 dark:text-slate-500 w-8">4</span>
                              <span className="text-slate-800 dark:text-slate-300">{'}'}</span>
                            </div>
                          </pre>
                        </div>
                        
                        <div className="mt-4 flex items-start p-4 bg-red-50 dark:bg-red-900/10 rounded-md">
                          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-red-800 dark:text-red-400">SQL Injection Vulnerability</h4>
                            <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                              This code is vulnerable to SQL injection attacks because it directly inserts user input into the SQL query without parameterization.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">AI-Suggested Fix</h3>
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-md p-4 font-mono text-sm overflow-x-auto">
                          <pre className="text-slate-800 dark:text-slate-300">
                            <div className="flex">
                              <span className="text-slate-500 dark:text-slate-500 w-8">1</span>
                              <span className="text-slate-800 dark:text-slate-300">function getUserData(userId) {'{'}</span>
                            </div>
                            <div className="flex bg-green-100 dark:bg-green-900/20">
                              <span className="text-slate-500 dark:text-slate-500 w-8">2</span>
                              <span className="text-slate-800 dark:text-slate-300">&nbsp;&nbsp;const query = <span className="text-green-600 dark:text-green-400">"SELECT * FROM users WHERE id = ?"</span>;</span>
                            </div>
                            <div className="flex bg-green-100 dark:bg-green-900/20">
                              <span className="text-slate-500 dark:text-slate-500 w-8">3</span>
                              <span className="text-slate-800 dark:text-slate-300">&nbsp;&nbsp;return db.execute(query, [userId]);</span>
                            </div>
                            <div className="flex">
                              <span className="text-slate-500 dark:text-slate-500 w-8">4</span>
                              <span className="text-slate-800 dark:text-slate-300">{'}'}</span>
                            </div>
                          </pre>
                        </div>
                        
                        <div className="mt-4 flex items-start p-4 bg-green-50 dark:bg-green-900/10 rounded-md">
                          <Shield className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-green-800 dark:text-green-400">Secure Implementation</h4>
                            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                              This version uses parameterized queries with placeholders, which ensures that user input is properly escaped and prevents SQL injection attacks.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="xss" className="p-6">
                    {/* Similar structure for XSS demo */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Vulnerable Code</h3>
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-md p-4 font-mono text-sm overflow-x-auto">
                          <pre className="text-slate-800 dark:text-slate-300">
                            <div className="flex">
                              <span className="text-slate-500 dark:text-slate-500 w-8">1</span>
                              <span className="text-slate-800 dark:text-slate-300">function displayUserComment(comment) {'{'}</span>
                            </div>
                            <div className="flex bg-red-100 dark:bg-red-900/20">
                              <span className="text-slate-500 dark:text-slate-500 w-8">2</span>
                              <span className="text-slate-800 dark:text-slate-300">&nbsp;&nbsp;document.getElementById('comments').innerHTML += comment;</span>
                            </div>
                            <div className="flex">
                              <span className="text-slate-500 dark:text-slate-500 w-8">3</span>
                              <span className="text-slate-800 dark:text-slate-300">{'}'}</span>
                            </div>
                          </pre>
                        </div>
                        
                        <div className="mt-4 flex items-start p-4 bg-red-50 dark:bg-red-900/10 rounded-md">
                          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-red-800 dark:text-red-400">Cross-Site Scripting (XSS) Vulnerability</h4>
                            <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                              This code is vulnerable to XSS attacks because it directly inserts user input into the DOM without sanitization.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">AI-Suggested Fix</h3>
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-md p-4 font-mono text-sm overflow-x-auto">
                          <pre className="text-slate-800 dark:text-slate-300">
                            <div className="flex">
                              <span className="text-slate-500 dark:text-slate-500 w-8">1</span>
                              <span className="text-slate-800 dark:text-slate-300">function displayUserComment(comment) {'{'}</span>
                            </div>
                            <div className="flex bg-green-100 dark:bg-green-900/20">
                              <span className="text-slate-500 dark:text-slate-500 w-8">2</span>
                              <span className="text-slate-800 dark:text-slate-300">&nbsp;&nbsp;const sanitized = document.createTextNode(comment);</span>
                            </div>
                            <div className="flex bg-green-100 dark:bg-green-900/20">
                              <span className="text-slate-500 dark:text-slate-500 w-8">3</span>
                              <span className="text-slate-800 dark:text-slate-300">&nbsp;&nbsp;document.getElementById('comments').appendChild(sanitized);</span>
                            </div>
                            <div className="flex">
                              <span className="text-slate-500 dark:text-slate-500 w-8">4</span>
                              <span className="text-slate-800 dark:text-slate-300">{'}'}</span>
                            </div>
                          </pre>
                        </div>
                        
                        <div className="mt-4 flex items-start p-4 bg-green-50 dark:bg-green-900/10 rounded-md">
                          <Shield className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-green-800 dark:text-green-400">Secure Implementation</h4>
                            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                              This version creates a text node which automatically escapes HTML, preventing script execution and ensuring user input is safely displayed.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="auth" className="p-6">
                    {/* Auth bypass demo */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Vulnerable Code</h3>
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-md p-4 font-mono text-sm overflow-x-auto">
                          <pre className="text-slate-800 dark:text-slate-300">
                            <div className="flex">
                              <span className="text-slate-500 dark:text-slate-500 w-8">1</span>
                              <span className="text-slate-800 dark:text-slate-300">app.get('/profile', (req, res) {'=>'} {'{'}</span>
                            </div>
                            <div className="flex">
                              <span className="text-slate-500 dark:text-slate-500 w-8">2</span>
                              <span className="text-slate-800 dark:text-slate-300">&nbsp;&nbsp;const userId = req.query.id;</span>
                            </div>
                            <div className="flex bg-red-100 dark:bg-red-900/20">
                              <span className="text-slate-500 dark:text-slate-500 w-8">3</span>
                              <span className="text-slate-800 dark:text-slate-300">&nbsp;&nbsp;// No authentication check</span>
                            </div>
                            <div className="flex bg-red-100 dark:bg-red-900/20">
                              <span className="text-slate-500 dark:text-slate-500 w-8">4</span>
                              <span className="text-slate-800 dark:text-slate-300">&nbsp;&nbsp;getUserProfile(userId).then(profile {'=>'} {'{'}</span>
                            </div>
                            <div className="flex">
                              <span className="text-slate-500 dark:text-slate-500 w-8">5</span>
                              <span className="text-slate-800 dark:text-slate-300">&nbsp;&nbsp;&nbsp;&nbsp;res.json(profile);</span>
                            </div>
                            <div className="flex">
                              <span className="text-slate-500 dark:text-slate-500 w-8">6</span>
                              <span className="text-slate-800 dark:text-slate-300">&nbsp;&nbsp;{'});'}</span>
                            </div>
                            <div className="flex">
                              <span className="text-slate-500 dark:text-slate-500 w-8">7</span>
                              <span className="text-slate-800 dark:text-slate-300">{'});'}</span>
                            </div>
                          </pre>
                        </div>
                        
                        <div className="mt-4 flex items-start p-4 bg-red-50 dark:bg-red-900/10 rounded-md">
                          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-red-800 dark:text-red-400">Authentication Bypass Vulnerability</h4>
                            <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                              This endpoint is vulnerable to authentication bypass because it does not verify the user is authenticated or authorized to access the profile.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">AI-Suggested Fix</h3>
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-md p-4 font-mono text-sm overflow-x-auto">
                          <pre className="text-slate-800 dark:text-slate-300">
                            <div className="flex">
                              <span className="text-slate-500 dark:text-slate-500 w-8">1</span>
                              <span className="text-slate-800 dark:text-slate-300">app.get('/profile', authenticate, (req, res) {'=>'} {'{'}</span>
                            </div>
                            <div className="flex">
                              <span className="text-slate-500 dark:text-slate-500 w-8">2</span>
                              <span className="text-slate-800 dark:text-slate-300">&nbsp;&nbsp;const userId = req.query.id;</span>
                            </div>
                            <div className="flex bg-green-100 dark:bg-green-900/20">
                              <span className="text-slate-500 dark:text-slate-500 w-8">3</span>
                              <span className="text-slate-800 dark:text-slate-300">&nbsp;&nbsp;// Check if user is authorized for this profile</span>
                            </div>
                            <div className="flex bg-green-100 dark:bg-green-900/20">
                              <span className="text-slate-500 dark:text-slate-500 w-8">4</span>
                              <span className="text-slate-800 dark:text-slate-300">&nbsp;&nbsp;if (req.user.id !== userId && !req.user.isAdmin) {'{'}</span>
                            </div>
                            <div className="flex bg-green-100 dark:bg-green-900/20">
                              <span className="text-slate-500 dark:text-slate-500 w-8">5</span>
                              <span className="text-slate-800 dark:text-slate-300">&nbsp;&nbsp;&nbsp;&nbsp;return res.status(403).json({'{'} error: 'Unauthorized' {'}'});</span>
                            </div>
                            <div className="flex bg-green-100 dark:bg-green-900/20">
                              <span className="text-slate-500 dark:text-slate-500 w-8">6</span>
                              <span className="text-slate-800 dark:text-slate-300">&nbsp;&nbsp;{'}'}</span>
                            </div>
                            <div className="flex">
                              <span className="text-slate-500 dark:text-slate-500 w-8">7</span>
                              <span className="text-slate-800 dark:text-slate-300">&nbsp;&nbsp;getUserProfile(userId).then(profile {'=>'} {'{'}</span>
                            </div>
                            <div className="flex">
                              <span className="text-slate-500 dark:text-slate-500 w-8">8</span>
                              <span className="text-slate-800 dark:text-slate-300">&nbsp;&nbsp;&nbsp;&nbsp;res.json(profile);</span>
                            </div>
                            <div className="flex">
                              <span className="text-slate-500 dark:text-slate-500 w-8">9</span>
                              <span className="text-slate-800 dark:text-slate-300">&nbsp;&nbsp;{'});'}</span>
                            </div>
                            <div className="flex">
                              <span className="text-slate-500 dark:text-slate-500 w-8">10</span>
                              <span className="text-slate-800 dark:text-slate-300">{'});'}</span>
                            </div>
                          </pre>
                        </div>
                        
                        <div className="mt-4 flex items-start p-4 bg-green-50 dark:bg-green-900/10 rounded-md">
                          <Shield className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-green-800 dark:text-green-400">Secure Implementation</h4>
                            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                              This version adds authentication middleware and checks that the user is authorized to access the requested profile, preventing unauthorized access.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="mt-12 text-center">
                <a href="/scanner" className="inline-flex items-center justify-center px-6 py-3 bg-scanner-blue-600 hover:bg-scanner-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
                  Try the Scanner Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Demo;

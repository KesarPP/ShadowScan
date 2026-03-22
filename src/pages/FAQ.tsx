
import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ThemeProvider } from '../context/ThemeContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Navbar />
        
        <main className="flex-grow pt-20">
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center text-center mb-12">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Frequently Asked Questions
                </h1>
                <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mb-8">
                  Learn how to get the most out of SHADOWSCAN
                </p>
              </div>
              
              <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg text-left font-medium text-slate-900 dark:text-white">
                      What file types can I scan?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-700 dark:text-slate-300">
                      SHADOWSCAN supports a wide range of file types including JavaScript, TypeScript, Python, Java, Go, Ruby, PHP, HTML, CSS, and more. Our system is designed to detect vulnerabilities in all major programming languages.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg text-left font-medium text-slate-900 dark:text-white">
                      How accurate are the AI suggestions?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-700 dark:text-slate-300">
                      Our AI suggestions are highly accurate and based on the latest security best practices. We continuously train our models on real-world vulnerabilities and fixes. However, we recommend reviewing them before implementation as context and specific project requirements may vary.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg text-left font-medium text-slate-900 dark:text-white">
                      Is my code secure when uploaded?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-700 dark:text-slate-300">
                      Yes! Your code is processed securely and not stored permanently. We use encryption to protect your intellectual property during the scanning process. All uploaded files are deleted from our servers once the analysis is complete.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-lg text-left font-medium text-slate-900 dark:text-white">
                      What is the maximum file size?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-700 dark:text-slate-300">
                      The maximum file size is 10MB per file. For larger codebases, we recommend scanning files individually or contacting us for enterprise solutions that can handle larger projects and provide continuous integration options.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-lg text-left font-medium text-slate-900 dark:text-white">
                      How does the AI generate fix suggestions?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-700 dark:text-slate-300">
                      Our AI analyzes the vulnerability and its context in your code. It then references a vast database of common vulnerability patterns and their solutions. The AI considers best practices, language-specific fixes, and the surrounding code structure to suggest the most appropriate solution.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-6">
                    <AccordionTrigger className="text-lg text-left font-medium text-slate-900 dark:text-white">
                      Can I integrate SHADOWSCAN with my CI/CD pipeline?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-700 dark:text-slate-300">
                      Yes, we offer API access for enterprise customers that allows you to integrate SHADOWSCAN directly into your continuous integration and deployment workflow. Contact our sales team for more information about enterprise solutions.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-7">
                    <AccordionTrigger className="text-lg text-left font-medium text-slate-900 dark:text-white">
                      How often is the vulnerability database updated?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-700 dark:text-slate-300">
                      Our vulnerability database is updated daily with the latest security threats and vulnerabilities. We monitor security advisories, CVE databases, and research publications to ensure our scanner can detect the most recent security issues.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-8">
                    <AccordionTrigger className="text-lg text-left font-medium text-slate-900 dark:text-white">
                      Do you offer custom scanning rules?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-700 dark:text-slate-300">
                      Enterprise customers can define custom scanning rules specific to their organization's security policies and requirements. This allows you to enforce internal security standards and detect organization-specific vulnerabilities.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default FAQ;

import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey || '');
const model = genAI.getGenerativeModel({
  model: 'gemini-3.1-flash-lite-preview',
});

// Helper to clean Gemini response
const cleanGeminiResponse = (response: string) => {
  let cleanResponse = response;
  if (response.includes('```json')) {
    cleanResponse = response.split('```json')[1].split('```')[0].trim();
  } else if (response.includes('```')) {
    cleanResponse = response.split('```')[1].split('```')[0].trim();
  }
  return cleanResponse;
};

app.post('/api/scan', async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: 'Code is required' });

    const prompt = `
    You are a professional security auditor. Analyze the following source code for potential security vulnerabilities and attack vectors (e.g., OWASP Top 10, Injection, XSS, Broken Auth, etc.).
    
    CRITICAL INSTRUCTION: Ignore general logical errors, business logic flaws, or coding best practices that do not pose a direct security risk. Focus EXCLUSIVELY on identifying exploitable vulnerabilities and security attacks.
    
    Return a JSON array of objects. Do not include any text outside the JSON.
    
    JSON Schema:
    {
      "id": "unique-string",
      "name": "Vulnerability Name",
      "description": "Clear explanation of the risk",
      "fileName": "name of the file",
      "lineNumber": number,
      "severity": "high" | "medium" | "low",
      "code": "the exact line of code where the issue exists"
    }

    Source Code:
    ${code}
    `;

    const result = await model.generateContent(prompt);
    const cleanResponse = cleanGeminiResponse(result.response.text());
    res.json(JSON.parse(cleanResponse));
  } catch (error: any) {
    console.error('Scan Error:', error);
    res.status(500).json({ error: error.message || 'Failed to scan code' });
  }
});

app.post('/api/report', async (req: Request, res: Response) => {
  try {
    const { vulnerabilities } = req.body;
    if (!vulnerabilities) return res.status(400).json({ error: 'Vulnerabilities are required' });

    const prompt = `
    You are a professional security consultant. Based on the following vulnerabilities found during a code scan, 
    generate a comprehensive, high-level security report in Markdown format.
    
    The report should include:
    1. Executive Summary: A brief overview of the security posture.
    2. Vulnerability Statistics: A count of vulnerabilities by severity (High, Medium, Low).
    3. Key Findings: Highlight the most critical issues and their potential impact.
    4. Recommendations: High-level steps to improve the overall security of the codebase.
    
    Vulnerabilities:
    ${JSON.stringify(vulnerabilities, null, 2)}
    
    Use a professional and clear tone.
    `;

    const result = await model.generateContent(prompt);
    res.json({ report: result.response.text() });
  } catch (error: any) {
    console.error('Report Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate report' });
  }
});

app.post('/api/optimize', async (req: Request, res: Response) => {
  try {
    const { fullCode, vulnerability } = req.body;
    if (!fullCode || !vulnerability) return res.status(400).json({ error: 'Full code and vulnerability are required' });

    const prompt = `
    You are a professional security engineer. Your task is to optimize the provided source code by fixing a specific security vulnerability while maintaining the original logic and functionality.
    
    Vulnerability to fix:
    - Name: ${vulnerability.name}
    - Description: ${vulnerability.description}
    - Location: Line ${vulnerability.lineNumber}
    - Vulnerable snippet: ${vulnerability.code}
    
    Source Code:
    ${fullCode}
    
    Instructions:
    1. Provide the ENTIRE optimized source code file.
    2. Do NOT change the logic or functionality of the application.
    3. Ensure the fix is robust and follows security best practices.
    4. Return ONLY the code, without any markdown formatting or explanations.
    `;

    const result = await model.generateContent(prompt);
    let resolvedCode = result.response.text();
    if (resolvedCode.startsWith('```')) {
      resolvedCode = resolvedCode.replace(/^```[a-z]*\n/i, '').replace(/\n```$/i, '');
    }
    res.json({ optimizedCode: resolvedCode });
  } catch (error: any) {
    console.error('Optimization Error:', error);
    res.status(500).json({ error: error.message || 'Failed to optimize code' });
  }
});

app.post('/api/fix', async (req: Request, res: Response) => {
  try {
    const { code, name } = req.body;
    if (!code || !name) return res.status(400).json({ error: 'Code and issue name are required' });

    const prompt = `
    Issue: ${name}
    Code: ${code}
    Provide a secure code snippet to fix this and a 1-sentence explanation.
    `;
    const result = await model.generateContent(prompt);
    res.json({ fix: result.response.text() });
  } catch (error: any) {
    console.error('Fix Error:', error);
    res.status(500).json({ error: error.message || 'Failed to get fix suggestion' });
  }
});

// Export for Vercel
export default app;

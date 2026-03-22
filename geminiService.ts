
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Vulnerability, SeverityType } from "@/types/vulnerability";
import { v4 as uuidv4 } from "uuid";

interface GeminiVulnerability {
  file: string;
  line: number;
  name: string;
  type: string;
  severity: string;
  description: string;
  impact: string;
  risk: string;
  code: string;
  fixCode: string;
  fixDescription: string;
}

export const createPromptTemplate = (files: { name: string, content: string }[]): string => {
  let prompt = `
Mission: You are a seasoned cybersecurity expert tasked with a comprehensive security audit of the provided codebase. Your mission is to identify all potential security vulnerabilities, including exploitable bugs, malicious code, injection vulnerabilities, insecure data handling, broken authentication/authorization, missing security measures, insecure API interactions, exposure of sensitive information, compromised application integrity, deployment security flaws, and dependency vulnerabilities (within the explicitly imported modules). You will output your findings in JSON format as specified below.

Critical Analysis Scope Boundaries:

*   Complete Code Snapshot: The provided Subject Codebase is the entirety of the application's code. Any reliance on external libraries, modules, or resources not explicitly defined within this snapshot is a potential security vulnerability.
*   Explicit Resource Checks: Confirm that all imported files, modules, or assets exist within the provided codebase and that import paths are correct. External dependencies are a major concern unless their code is fully included.
*   Language-Agnostic Analysis: Apply security principles relevant to the programming language(s) present in the codebase.
*   Runtime Logic Test (Security Focus): Simulate user interactions and data flow, paying close attention to:
    *   How user-supplied data is handled and if it's sanitized/validated before use.
    *   Potential entry points for injection attacks.
    *   The handling of sensitive information.
    *   Client-side logic that could be manipulated or exploited.
    *   The security of any data stored locally.
*   Resource Absence Reporting (Security Impact): Any imported resource (file, module, library) that is not found within the Subject Codebase is a critical security vulnerability. Include this in the JSON output.
*   Access Control Assessment (Where Applicable): If the codebase implements any form of access control or routing, analyze it for weaknesses and potential bypasses. Ensure that sensitive functionality is not accessible without proper authorization checks (even if basic within the scope).
*   Input Validation and Sanitization Checks: Identify every point where user input is processed. Flag any missing or insufficient validation and sanitization that could lead to vulnerabilities like XSS, SQL injection (if relevant), or command injection.
*   Data Exposure Risks: Analyze how application state, variables, and data structures are managed. Identify any unintentional exposure of sensitive data in logs, error messages, the UI, or through insecure data handling practices.
*   Authentication/Authorization Flaws: Scrutinize any authentication or authorization logic for weaknesses, bypasses, or insecure state management.
*   Local/Session Storage Security: If used, evaluate what data is stored and whether sensitive information is adequately protected (e.g., through encryption, though this might be beyond the scope of basic code).
*   Error Handling Security: Examine error handling mechanisms. Report any verbose error messages that could reveal internal application details or potential attack vectors.
*   Malicious Code Detection: Look for any code patterns or functionalities that seem suspicious or could potentially be harmful. This might include attempts to access system resources, network requests to unexpected locations, or unusual data manipulation.
*   Dependency Vulnerabilities: (Within the scope of explicitly imported modules in the provided codebase). Flag any usage of imported code that is known to have security vulnerabilities (though this requires recognizing known bad practices within the provided code itself, as external lookups are out of scope).

---

Output Format:

Your output must be a valid JSON array. Each element in the array will be a JSON object representing a single security finding. Each object must have the following keys:

*   file: The name of the file where the vulnerability is located.
*   line: The line number where the vulnerability occurs (or the relevant section of code if a specific line isn't applicable).
*   name: A concise name for the type of vulnerability or security issue.
*   type: A broader classification of the vulnerability (e.g., "XSS", "Command Injection", "Hardcoded Credentials", "Missing Input Sanitization").
*   severity: The severity of the vulnerability ("high", "medium", "low", "info").
*   description: A detailed explanation of the vulnerability, including its cause.
*   impact: A description of the potential consequences if the vulnerability is exploited.
*   risk: An assessment of the likelihood and impact of the vulnerability.
*   code: The specific code snippet where the vulnerability is located (or a relevant excerpt).
*   fixCode: A suggested code snippet to remediate the vulnerability (if applicable and feasible within the scope).
*   fixDescription: A brief explanation of how the suggested fix addresses the vulnerability.

---

Example Response (Illustrative Only):
---
json
[
  {
    "file": "test_code.py",
    "line": 7,
    "name": "SQL Injection",
    "type": "SQL Injection",
    "severity": "high",
    "description": "The code uses string formatting to construct an SQL query, making it vulnerable to SQL injection attacks. User-controlled input is directly embedded into the query without proper sanitization or parameterization.",
    "impact": "An attacker can manipulate the query to bypass authentication, extract sensitive data, modify data, or even execute arbitrary commands on the database server.",
    "risk": "High risk due to the ease of exploitation and potentially devastating impact. The provided user_input demonstrates a classic SQL injection payload that bypasses authentication.",
    "code": "query = f\"SELECT * FROM users WHERE username = '{user_input}'\"",
    "fixCode": "import sqlite3\nconn = sqlite3.connect('your_database.db')\ncursor = conn.cursor()\nuser_input = \"admin' OR 1=1 --\"\nquery = \"SELECT * FROM users WHERE username = ?\"\ncursor.execute(query, (user_input,))",
    "fixDescription": "The fix uses parameterized queries (also known as prepared statements). Instead of directly embedding the user input into the query string, we use a placeholder (?).  The database library then safely substitutes the user input into the query, escaping any potentially malicious characters and preventing SQL injection."
  },
  {
    "file": "test_code.py",
    "line": 10,
    "name": "Hardcoded Password",
    "type": "Hardcoded Credentials",
    "severity": "high",
    "description": "The code contains a hardcoded password, 'supersecretpassword'. Hardcoding credentials directly into the source code exposes them to anyone who can access the code.",
    "impact": "An attacker who gains access to the code can use the hardcoded password to gain unauthorized access to the system or account associated with the password.",
    "risk": "High risk as the password is in plain text and easily discoverable by inspecting the code or decompiling the application.",
    "code": "password = \"supersecretpassword\"",
    "fixCode": "import os\npassword = os.environ.get('USER_PASSWORD')\nif password is None:\n    # Handle the case where the environment variable is not set\n    print(\"Error: USER_PASSWORD environment variable not set.\")",
    "fixDescription": "The fix uses environment variables to store the password. This makes it harder for attackers to find the password and allows the password to be changed without modifying the code.  A check is included to handle the case where the environment variable is not set."
  },
  {
    "file": "test_code.py",
    "line": 11,
    "name": "Hardcoded API Key",
    "type": "Hardcoded Credentials",
    "severity": "high",
    "description": "The code contains a hardcoded API key, '12345-67890-ABCDE'. Hardcoding API keys directly into the source code exposes them to anyone who can access the code.",
    "impact": "An attacker who gains access to the code can use the hardcoded API key to access resources or services that require the key, potentially incurring costs or causing damage.",
    "risk": "High risk as the API key is in plain text and easily discoverable by inspecting the code or decompiling the application.",
    "code": "api_key = \"12345-67890-ABCDE\"",
    "fixCode": "import os\napi_key = os.environ.get('API_KEY')\nif api_key is None:\n    # Handle the case where the environment variable is not set\n    print(\"Error: API_KEY environment variable not set.\")",
    "fixDescription": "The fix uses environment variables to store the API key. This makes it harder for attackers to find the key and allows the key to be changed without modifying the code. A check is included to handle the case where the environment variable is not set."
  },
  {
    "file": "test_code.py",
    "line": 15,
    "name": "Command Injection",
    "type": "Command Injection",
    "severity": "high",
    "description": "The code uses os.system to execute a shell command, and the command is constructed using user-controlled input without proper sanitization.  This allows an attacker to inject arbitrary commands into the shell.",
    "impact": "An attacker can execute arbitrary commands on the server with the privileges of the user running the script. In the provided example, the attacker is attempting to delete the entire file system.",
    "risk": "High risk due to the ease of exploitation and potentially devastating impact. The provided user_input demonstrates a classic command injection payload.",
    "code": "os.system(f\"echo {user_input}\")",
    "fixCode": "import subprocess\nuser_input = \"rm -rf /\"\ncommand = ['echo', user_input]\nresult = subprocess.run(command, capture_output=True, text=True, check=True)",
    "fixDescription": "The fix uses subprocess.run with a list of arguments. This prevents the shell from interpreting any special characters in the user input as shell commands. The capture_output=True, text=True, and check=True arguments ensure that the output of the command is captured, and an exception is raised if the command fails.  Alternatively, if echo is not needed, avoid using user input in any system calls. If user input must be used, use proper input validation and sanitization techniques."
  }
]


---


Important: Prioritize identifying and reporting all potential security vulnerabilities, no matter how seemingly minor. Provide specific details for each field in the JSON output. For fixCode and fixDescription, provide concrete suggestions whenever possible. If a missing resource is identified, create a JSON object with the type as "Missing Dependency" and describe the impact of this missing resource on security.*

---

Okay, here's the modified prompt to generate output in the specified JSON format:

---

Mission: You are a seasoned cybersecurity expert tasked with a comprehensive security audit of the provided codebase. Your mission is to identify all potential security vulnerabilities, including exploitable bugs, malicious code, injection vulnerabilities, insecure data handling, broken authentication/authorization, missing security measures, insecure API interactions, exposure of sensitive information, compromised application integrity, deployment security flaws, and dependency vulnerabilities (within the explicitly imported modules). You will output your findings in JSON format as specified below.

Critical Analysis Scope Boundaries:

*   Complete Code Snapshot: The provided Subject Codebase is the entirety of the application's code. Any reliance on external libraries, modules, or resources not explicitly defined within this snapshot is a potential security vulnerability.
*   Explicit Resource Checks: Confirm that all imported files, modules, or assets exist within the provided codebase and that import paths are correct. External dependencies are a major concern unless their code is fully included.
*   Language-Agnostic Analysis: Apply security principles relevant to the programming language(s) present in the codebase.
*   Runtime Logic Test (Security Focus): Simulate user interactions and data flow, paying close attention to:
    *   How user-supplied data is handled and if it's sanitized/validated before use.
    *   Potential entry points for injection attacks.
    *   The handling of sensitive information.
    *   Client-side logic that could be manipulated or exploited.
    *   The security of any data stored locally.
*   Resource Absence Reporting (Security Impact): Any imported resource (file, module, library) that is not found within the Subject Codebase is a critical security vulnerability. Include this in the JSON output.
*   Access Control Assessment (Where Applicable): If the codebase implements any form of access control or routing, analyze it for weaknesses and potential bypasses. Ensure that sensitive functionality is not accessible without proper authorization checks (even if basic within the scope).
*   Input Validation and Sanitization Checks: Identify every point where user input is processed. Flag any missing or insufficient validation and sanitization that could lead to vulnerabilities like XSS, SQL injection (if relevant), or command injection.
*   Data Exposure Risks: Analyze how application state, variables, and data structures are managed. Identify any unintentional exposure of sensitive data in logs, error messages, the UI, or through insecure data handling practices.
*   Authentication/Authorization Flaws: Scrutinize any authentication or authorization logic for weaknesses, bypasses, or insecure state management.
*   Local/Session Storage Security: If used, evaluate what data is stored and whether sensitive information is adequately protected (e.g., through encryption, though this might be beyond the scope of basic code).
*   Error Handling Security: Examine error handling mechanisms. Report any verbose error messages that could reveal internal application details or potential attack vectors.
*   Malicious Code Detection: Look for any code patterns or functionalities that seem suspicious or could potentially be harmful. This might include attempts to access system resources, network requests to unexpected locations, or unusual data manipulation.
*   Dependency Vulnerabilities: (Within the scope of explicitly imported modules in the provided codebase). Flag any usage of imported code that is known to have security vulnerabilities (though this requires recognizing known bad practices within the provided code itself, as external lookups are out of scope).

---

Subject Codebase:
~~~
{{ full_code }}
~~~

---

Output Format:

Your output must be a valid JSON array. Each element in the array will be a JSON object representing a single security finding. Each object must have the following keys:

*   file: The name of the file where the vulnerability is located.
*   line: The line number where the vulnerability occurs (or the relevant section of code if a specific line isn't applicable).
*   name: A concise name for the type of vulnerability or security issue.
*   type: A broader classification of the vulnerability (e.g., "XSS", "Command Injection", "Hardcoded Credentials", "Missing Input Sanitization").
*   severity: The severity of the vulnerability ("high", "medium", "low", "info").
*   description: A detailed explanation of the vulnerability, including its cause.
*   impact: A description of the potential consequences if the vulnerability is exploited.
*   risk: An assessment of the likelihood and impact of the vulnerability.
*   code: The specific code snippet where the vulnerability is located (or a relevant excerpt).
*   fixCode: A suggested code snippet to remediate the vulnerability (if applicable and feasible within the scope).
*   fixDescription: A brief explanation of how the suggested fix addresses the vulnerability.

---

Example Response (Illustrative Only):
---
\`\`\`json
[
  {
    "file": "test_code.py",
    "line": 7,
    "name": "SQL Injection",
    "type": "SQL Injection",
    "severity": "high",
    "description": "The code uses string formatting to construct an SQL query, making it vulnerable to SQL injection attacks. User-controlled input is directly embedded into the query without proper sanitization or parameterization.",
    "impact": "An attacker can manipulate the query to bypass authentication, extract sensitive data, modify data, or even execute arbitrary commands on the database server.",
    "risk": "High risk due to the ease of exploitation and potentially devastating impact. The provided user_input demonstrates a classic SQL injection payload that bypasses authentication.",
    "code": "query = f\"SELECT * FROM users WHERE username = '{user_input}'\"",
    "fixCode": "import sqlite3\nconn = sqlite3.connect('your_database.db')\ncursor = conn.cursor()\nuser_input = \"admin' OR 1=1 --\"\nquery = \"SELECT * FROM users WHERE username = ?\"\ncursor.execute(query, (user_input,))",
    "fixDescription": "The fix uses parameterized queries (also known as prepared statements). Instead of directly embedding the user input into the query string, we use a placeholder (?).  The database library then safely substitutes the user input into the query, escaping any potentially malicious characters and preventing SQL injection."
  },
  {
    "file": "test_code.py",
    "line": 10,
    "name": "Hardcoded Password",
    "type": "Hardcoded Credentials",
    "severity": "high",
    "description": "The code contains a hardcoded password, 'supersecretpassword'. Hardcoding credentials directly into the source code exposes them to anyone who can access the code.",
    "impact": "An attacker who gains access to the code can use the hardcoded password to gain unauthorized access to the system or account associated with the password.",
    "risk": "High risk as the password is in plain text and easily discoverable by inspecting the code or decompiling the application.",
    "code": "password = \"supersecretpassword\"",
    "fixCode": "import os\npassword = os.environ.get('USER_PASSWORD')\nif password is None:\n    # Handle the case where the environment variable is not set\n    print(\"Error: USER_PASSWORD environment variable not set.\")",
    "fixDescription": "The fix uses environment variables to store the password. This makes it harder for attackers to find the password and allows the password to be changed without modifying the code.  A check is included to handle the case where the environment variable is not set."
  },
  {
    "file": "test_code.py",
    "line": 11,
    "name": "Hardcoded API Key",
    "type": "Hardcoded Credentials",
    "severity": "high",
    "description": "The code contains a hardcoded API key, '12345-67890-ABCDE'. Hardcoding API keys directly into the source code exposes them to anyone who can access the code.",
    "impact": "An attacker who gains access to the code can use the hardcoded API key to access resources or services that require the key, potentially incurring costs or causing damage.",
    "risk": "High risk as the API key is in plain text and easily discoverable by inspecting the code or decompiling the application.",
    "code": "api_key = \"12345-67890-ABCDE\"",
    "fixCode": "import os\napi_key = os.environ.get('API_KEY')\nif api_key is None:\n    # Handle the case where the environment variable is not set\n    print(\"Error: API_KEY environment variable not set.\")",
    "fixDescription": "The fix uses environment variables to store the API key. This makes it harder for attackers to find the key and allows the key to be changed without modifying the code. A check is included to handle the case where the environment variable is not set."
  },
  {
    "file": "test_code.py",
    "line": 15,
    "name": "Command Injection",
    "type": "Command Injection",
    "severity": "high",
    "description": "The code uses os.system to execute a shell command, and the command is constructed using user-controlled input without proper sanitization.  This allows an attacker to inject arbitrary commands into the shell.",
    "impact": "An attacker can execute arbitrary commands on the server with the privileges of the user running the script. In the provided example, the attacker is attempting to delete the entire file system.",
    "risk": "High risk due to the ease of exploitation and potentially devastating impact. The provided user_input demonstrates a classic command injection payload.",
    "code": "os.system(f\"echo {user_input}\")",
    "fixCode": "import subprocess\nuser_input = \"rm -rf /\"\ncommand = ['echo', user_input]\nresult = subprocess.run(command, capture_output=True, text=True, check=True)",
    "fixDescription": "The fix uses subprocess.run with a list of arguments. This prevents the shell from interpreting any special characters in the user input as shell commands. The capture_output=True, text=True, and check=True arguments ensure that the output of the command is captured, and an exception is raised if the command fails.  Alternatively, if echo is not needed, avoid using user input in any system calls. If user input must be used, use proper input validation and sanitization techniques."
  }
]

\`\`\`
---


Important: Prioritize identifying and reporting all potential security vulnerabilities, no matter how seemingly minor. Provide specific details for each field in the JSON output. For fixCode and fixDescription, provide concrete suggestions whenever possible. If a missing resource is identified, create a JSON object with the type as "Missing Dependency" and describe the impact of this missing resource on security.*

---

Here are the code files to analyze:

`;

  files.forEach(file => {
    prompt += `File: ${file.name}\nCode:\n${file.content}\n\n`;
  });

  return prompt;
};

export const scanFilesWithGemini = async (
  files: File[],
  apiKey: string
): Promise<Vulnerability[]> => {
  try {
    // Read file contents
    const fileContents = await Promise.all(
      files.map(async (file) => {
        const content = await file.text();
        return { name: file.name, content };
      })
    );

    // Create the prompt
    const prompt = createPromptTemplate(fileContents);
    
    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    
    // Generate content with the prompt
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    console.log(responseText)

    // Parse the response
    let geminiVulnerabilities: GeminiVulnerability[] = [];
    try {
      // Extract JSON from the response (handling potential text around the JSON)
      const jsonMatch = responseText.match(/\[\s*\{.*\}\s*\]/s);
      const jsonStr = jsonMatch ? jsonMatch[0] : "[]";
      
      geminiVulnerabilities = JSON.parse(jsonStr);
    } catch (error) {
      console.error("Failed to parse Gemini response:", error);
      return [];
    }

    // Map Gemini vulnerabilities to our application format
    return geminiVulnerabilities.map((vuln) => ({
      id: uuidv4(),
      name: vuln.name,
      type: vuln.type,
      severity: validateSeverity(vuln.severity),
      file: vuln.file,
      line: vuln.line,
      description: vuln.description,
      impact: vuln.impact,
      risk: vuln.risk,
      code: vuln.code,
      fixCode: vuln.fixCode,
      fixDescription: vuln.fixDescription,
      fixAvailable: !!vuln.fixCode,
      references: []
    }));
  } catch (error) {
    console.error("Error scanning files with Gemini:", error);
    throw error;
  }
};

// Helper function to validate severity values
const validateSeverity = (severity: string): SeverityType => {
  const validSeverities: SeverityType[] = ['high', 'medium', 'low', 'info'];
  const lowercaseSeverity = severity.toLowerCase() as SeverityType;
  
  if (validSeverities.includes(lowercaseSeverity)) {
    return lowercaseSeverity;
  }
  
  // Map to closest valid severity if invalid
  if (lowercaseSeverity.includes('high') || lowercaseSeverity.includes('critical')) {
    return 'high';
  } else if (lowercaseSeverity.includes('med')) {
    return 'medium';
  } else if (lowercaseSeverity.includes('low')) {
    return 'low';
  }
  
  return 'info'; // Default value
}

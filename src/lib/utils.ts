import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cleanText(text: string): string {
  if (!text) return "";
  
  return text
    // Remove Markdown headers (e.g., ### Title)
    .replace(/^#+\s+/gm, '')
    // Remove bold/italic markers (**text**, *text*, __text__, _text_)
    .replace(/(\*\*|__|\*|_)/g, '')
    // Remove inline code markers (`text`)
    .replace(/`/g, '')
    // Remove links ([text](url)) - keeping only the text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove list markers at beginning of lines (- , * , + )
    .replace(/^[\s]*[-*+]\s+/gm, '')
    // Remove blockquote markers (> )
    .replace(/^[\s]*>\s+/gm, '')
    // Remove horizontal rules (---, ***, ___)
    .replace(/^[\s]*[-*_]{3,}[\s]*$/gm, '')
    // Clean up excessive newlines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

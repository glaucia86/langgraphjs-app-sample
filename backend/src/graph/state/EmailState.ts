export interface EmailInput {
  sender: string;
  subject: string;
  body: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface EmailState {
  email: EmailInput;
  isSpam: boolean | null;
  spamReason: string | null;
  emailCategory: string | null;
  emailDraft: string | null;
  messages: ChatMessage[];
  executionPath: string[];
  processingComplete: boolean;
}

export const createInitialState = (email: EmailInput): EmailState => ({
  email,
  isSpam: null,
  spamReason: null,
  emailCategory: null,
  emailDraft: null,
  messages: [],
  executionPath: [],
  processingComplete: false
});
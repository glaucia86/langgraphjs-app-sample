import { Annotation } from "@langchain/langgraph";

export interface EmailInput {
  sender: string;
  subject: string;
  body: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const EmailStateAnnotation = Annotation.Root({
  email: Annotation<EmailInput>({
    reducer: (existing, update) => update ?? existing,
    default: () => ({ sender: '', subject: '', body: ''})
  }),

  isSpam: Annotation<boolean | null>({
    reducer: (existing, update) => update ?? existing,
    default: () => null
  }),

  spamReason: Annotation<string | null>({
    reducer: (existing, update) => update ?? existing,
    default: () => null
  }),

  emailCategory: Annotation<string | null>({
    reducer: (existing, update) => update ?? existing,
    default: () => null
  }),

  emailDraft: Annotation<string | null>({
    reducer: (existing, update) => update ?? existing,
    default: () => null
  }),

  messages: Annotation<ChatMessage[]>({
    reducer: (existing = [], update) => update ?? existing,
    default: () => []
  }),
  
  // Rastreamento de execução
  executionPath: Annotation<string[]>({
    reducer: (existing = [], update) => update ?? existing,
    default: () => []
  }),
  
  processingComplete: Annotation<boolean>({
    reducer: (existing, update) => update ?? existing,
    default: () => false
  })
});

export type EmailState = typeof EmailStateAnnotation.State

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
export interface EmailInput {
  sender: string;
  subject: string;
  body: string;
}

export interface GraphResult {
  isSpam: boolean | null;
  spamReason: string | null;
  emailCategory: string | null;
  emailDraft: string | null;
  executionPath: string[];
  processingComplete: boolean;
}

export interface ApiResponse {
  success: boolean;
  runId: string;
  executionTime?: number;
  result?: GraphResult;
  error?: string;
}
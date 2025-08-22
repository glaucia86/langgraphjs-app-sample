import { EmailState } from "../state/EmailState";
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

export async function readEmail(state: EmailState): Promise<Partial<EmailState>> {
  const { email } = state;

  logger.info(`Alfred está processando email de ${email.sender}`);
  // Redact or sanitize the subject before logging
  const sanitizedSubject = email.subject ? "[REDACTED]" : "";
  logger.info(`Assunto: ${sanitizedSubject}`);

  return {
    executionPath: [...state.executionPath, 'readEmail'],
  };
} 
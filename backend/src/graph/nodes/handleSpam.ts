import { EmailState } from "../state/EmailState";
import { createContextLogger } from "../../lib/logger";

const logger = createContextLogger("handleSpam");

export async function handleSpam(state: EmailState): Promise<Partial<EmailState>> {
  logger.info("Alfred marcou email como SPAM. Motivo:", { spamReason: state.spamReason });

  return {
    processingComplete: true,
    executionPath: [...state.executionPath, 'handleSpam'],
  };
}
import { EmailState } from "../state/EmailState";
import { createContextLogger } from "../../lib/logger";

const logger = createContextLogger("notifyOwner");

export async function notifyOwner(state: EmailState): Promise<Partial<EmailState>> {
  const { email, emailCategory, emailDraft } = state;

  logger.info("Notificando Sr. Wayne sobre novo email", {
    sender: email.sender,
    subject: email.subject,
    category: emailCategory,
    hasDraft: !!emailDraft
  });

  // Log estruturado da notificação completa
  logger.info("Detalhes da notificação", {
    email: {
      sender: email.sender,
      subject: email.subject,
      bodyLength: email.body.length
    },
    category: emailCategory,
    draft: emailDraft ? {
      length: emailDraft.length,
      preview: emailDraft.substring(0, 100) + "..."
    } : null
  });

  // Para visualização no console (apenas em desenvolvimento)
  if (process.env.NODE_ENV === 'development') {
    console.log('\n' + '='.repeat(60));
    console.log(`📧 NOTIFICAÇÃO PARA O SR. WAYNE`);
    console.log('='.repeat(60));
    console.log(`De: ${email.sender}`);
    console.log(`Assunto: ${email.subject}`);
    console.log(`Categoria: ${emailCategory}`);
    console.log(`\n📝 RASCUNHO DE RESPOSTA PREPARADO:`);
    console.log('-'.repeat(40));
    console.log(emailDraft);
    console.log('='.repeat(60) + '\n');
  }

  return {
    processingComplete: true,
    executionPath: [...state.executionPath, 'notifyOwner'],
  }
}
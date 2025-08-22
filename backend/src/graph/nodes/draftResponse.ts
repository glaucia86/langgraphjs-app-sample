import { HumanMessage } from "@langchain/core/messages";
import { EmailState } from '../state/EmailState';
import { createLLMProvider } from "../../lib/llm";
import { createContextLogger } from "../../lib/logger";

const logger = createContextLogger("draftResponse");  

export async function draftResponse(state: EmailState): Promise<Partial<EmailState>> {
  const { email, emailCategory } = state;
  const model = createLLMProvider();

  const prompt = `
    Como Alfred, o mordomo profissional, redija uma resposta cortês e preliminar para este email.

    Email original:
    De: ${email.sender}
    Assunto: ${email.subject}
    Corpo: ${email.body}

    Categoria identificada: ${emailCategory || 'geral'}

    Instruções:
    - Seja formal, mas acolhedor
    - Mantenha o tom profissional de um mordomo
    - Crie uma resposta que o Sr. Wayne possa revisar e personalizar
    - Não faça promessas específicas
    - Mantenha a resposta concisa (máximo 3 parágrafos)

    Redija apenas a resposta, sem explicações adicionais.
  `;

  try {
    const messages = [new HumanMessage(prompt)];
    const response = await model.invoke(messages);

    const draft = response.content as string;

    logger.info("Rascunho de resposta criado", {
      sender: email.sender,
      category: emailCategory,
      draftLength: draft.length
    });

    return {
      emailDraft: draft,
      messages: [
        ...state.messages,
        { role: 'user', content: prompt },
        { role: 'assistant', content: draft }
      ],

      executionPath: [...state.executionPath, 'draftResponse'],
    };
  } catch (error) {
    logger.error("Erro ao redigir resposta", {
      error: error instanceof Error ? error.message : String(error),
      sender: email.sender,
      category: emailCategory
    });

    logger.info("Usando rascunho de fallback", {
      sender: email.sender
    });

    const fallbackDraft = `
      Prezado(a) ${email.sender},

      Agradecemos seu contato. Recebemos sua mensagem e a encaminharemos para a devida atenção.

      Entraremos em contato em breve.

      Atenciosamente,
      Alfred Pennyworth
      Em nome do Sr. Wayne    
    `;

    return {
      emailDraft: fallbackDraft,
      executionPath: [...state.executionPath, 'draftResponse'], 
    };
  }
}
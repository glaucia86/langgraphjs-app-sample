import { HumanMessage } from "@langchain/core/messages";
import { EmailState } from "../state/EmailState";
import { createLLMProvider } from "../../lib/llm";
import { createContextLogger } from "../../lib/logger";
import { z } from "zod";

const logger = createContextLogger("classifyEmail");

const ClassificationSchema = z.object({
  isSpam: z.boolean(),
  spamReason: z.string().optional(),
  emailCategory: z.string().optional(),
  confidence: z.number().min(0).max(1)
});

export async function classifyEmail(state: EmailState): Promise<Partial<EmailState>> {
  const { email } = state;
  const model = createLLMProvider();

  const prompt = `
    Como Alfred, o mordomo, analise este email e determine se é spam ou legítimo.

    Email:
    De: ${email.sender}
    Assunto: ${email.subject}
    Corpo: ${email.body}

    Responda APENAS com um JSON válido seguindo este formato:
    {
      "isSpam": boolean,
      "spamReason": "motivo se for spam",
      "emailCategory": "categoria se legítimo (ex: consulta, reclamação, agradecimento)",
      "confidence": 0.95
    }

    Categorias válidas para emails legítimos:
    - consulta: Perguntas sobre serviços
    - reclamação: Problemas ou insatisfações
    - agradecimento: Elogios ou gratidão
    - solicitado: Pedidos específicos
    - informação: compartilhamento de informações
  `;

  try {
    const messages = [new HumanMessage(prompt)];
    const response = await model.invoke(messages);

    let responseText = response.content as string;

    responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const parsed = JSON.parse(responseText);
    const classification = ClassificationSchema.parse(parsed);

    logger.info("Email classificado", {
      isSpam: classification.isSpam,
      category: classification.emailCategory,
      confidence: classification.confidence,
      sender: email.sender
    });

    return {
      isSpam: classification.isSpam,
      spamReason: classification.spamReason || null,
      emailCategory: classification.emailCategory || null,
      messages: [
        ...state.messages,
        { role: 'user', content: prompt },
        { role: 'assistant', content: response.content as string } 
      ],
      executionPath: [...state.executionPath, 'classifyEmail'],
    };
  } catch (error) {
    logger.error("Erro na classificação do email", {
      error: error instanceof Error ? error.message : String(error),
      sender: email.sender,
      subject: email.subject
    });

    // Fallback para classificação básica
    const isSpam = email.subject.includes("!!!!") ||
                   email.body.toLowerCase().includes('ganhou') ||
                   email.body.toLowerCase().includes('prêmio');

    logger.info("Usando classificação de fallback", {
      isSpam,
      sender: email.sender
    });

    return {
      isSpam,
      spamReason: isSpam ? 'Padrões típicos de spam detectados' : null,
      emailCategory: isSpam ? null : 'consulta',
      executionPath: [...state.executionPath, 'classifyEmail'],
    };
  }
}
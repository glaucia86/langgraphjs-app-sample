import { HumanMessage } from "@langchain/core/messages";
import { EmailState } from "../state/EmailState";
import { createLLMProvider } from "../../lib/llm";
import { z } from "zod";

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

    console.log(`Classificação: ${classification.isSpam ? 'SPAM' : 'LEGÍTIMO'}`);

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
    console.error('Erro na classificação:', error);

    const isSpam = email.subject.includes("!!!!") ||
                   email.body.toLowerCase().includes('ganhou') ||
                   email.body.toLowerCase().includes('prêmio');

    return {
      isSpam,
      spamReason: isSpam ? 'Padrões típicos de spam detectados' : null,
      emailCategory: isSpam ? null : 'consulta',
      executionPath: [...state.executionPath, 'classifyEmail'],
    };
  }
}
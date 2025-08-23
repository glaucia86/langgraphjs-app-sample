import { Router } from 'express';
import { z } from 'zod';
import { compiledGraph } from '../graph/index';
import { EmailInput } from '../graph/state/EmailState';
import { v4 as uuidv4 } from 'uuid';

export const graphRouter = Router();

const EmailInputSchema = z.object({
  sender: z.string().email('Email do remetente inválido'),
  subject: z.string().min(1, 'Assunto é obrigatório'),
  body: z.string().min(1, 'Corpo do email é obrigatório'),
});

graphRouter.post('/run', async (req, res) => {

const runId = uuidv4();
  
  try {
    console.log(`\n Iniciando execução ${runId}`);
    
    // Validar entrada
    const emailData = EmailInputSchema.parse(req.body.email);
    
    // Criar estado inicial usando a API correta do LangGraph.js
    const initialState = {
      email: emailData,
      isSpam: null,
      spamReason: null,
      emailCategory: null,
      emailDraft: null,
      messages: [],
      executionPath: [],
      processingComplete: false
    };
    
    // Executar o grafo
    const startTime = Date.now();
    const result = await compiledGraph.invoke(initialState, {
      configurable: { thread_id: runId }
    });
    const executionTime = Date.now() - startTime;
    
    console.log(`Execução ${runId} concluída em ${executionTime}ms`);
    
    // Retornar resultado estruturado
    res.json({
      success: true,
      runId,
      executionTime,
      result: {
        isSpam: result.isSpam,
        spamReason: result.spamReason,
        emailCategory: result.emailCategory,
        emailDraft: result.emailDraft,
        executionPath: result.executionPath,
        processingComplete: result.processingComplete
      }
    });
    
  } catch (error) {
    console.error(`Erro na execução ${runId}:`, error);
    
    res.status(500).json({
      success: false,
      runId,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// Rota para testar saúde da API
graphRouter.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'LangGraph Email Agent'
  });
});
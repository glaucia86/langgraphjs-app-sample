import { ChatOpenAI } from "@langchain/openai";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";

interface LLMConfig {
  MODEL_PROVIDER: string;
  MODEL_NAME: string;
  TEMPERATURE: number;
  GITHUB_TOKEN?: string;
  GITHUB_MODELS_ENDPOINT?: string;
  OPENAI_API_KEY?: string;
}

function getEnvironmentConfig(): LLMConfig {
  const requiredVars = ['MODEL_PROVIDER', 'MODEL_NAME', 'MODEL_TEMPERATURE'];
  
  // Verificar se as variáveis obrigatórias estão definidas
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      throw new Error(`Variável de ambiente obrigatória não encontrada: ${varName}`);
    }
  }

  const temperature = parseFloat(process.env.MODEL_TEMPERATURE!);
  if (isNaN(temperature)) {
    throw new Error('MODEL_TEMPERATURE deve ser um número válido');
  }

  return {
    MODEL_PROVIDER: process.env.MODEL_PROVIDER!,
    MODEL_NAME: process.env.MODEL_NAME!,
    TEMPERATURE: temperature,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    GITHUB_MODELS_ENDPOINT: process.env.GITHUB_MODELS_ENDPOINT,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  };
}

function validateEnvironmentVariables(config: LLMConfig): void {
  switch (config.MODEL_PROVIDER) {
    case "openai/gpt-4o":
      if (!config.GITHUB_TOKEN) {
        throw new Error("GITHUB_TOKEN é obrigatório para o provedor do modelo");
      }
      if (!config.GITHUB_MODELS_ENDPOINT) {
        throw new Error("GITHUB_MODELS_ENDPOINT é obrigatório para o provedor do modelo");
      }
      break;
    case "openai":
      if (!config.OPENAI_API_KEY) {
        throw new Error("OPENAI_API_KEY é obrigatório para o provedor openai");
      }
      break;
  }
}

export function createLLMProvider(): BaseChatModel {
  const config = getEnvironmentConfig();
  
  validateEnvironmentVariables(config);

  switch (config.MODEL_PROVIDER) {
    case "openai/gpt-4o":
      return new ChatOpenAI({
        model: config.MODEL_NAME,
        temperature: config.TEMPERATURE,
        maxCompletionTokens: 500,
        configuration: {
          apiKey: config.GITHUB_TOKEN,
          baseURL: config.GITHUB_MODELS_ENDPOINT
        }
      });

    case "openai":
      return new ChatOpenAI({
        model: config.MODEL_NAME,
        temperature: config.TEMPERATURE,
        configuration: {
          apiKey: config.OPENAI_API_KEY
        }
      });

    default:
      throw new Error(`Provedor LLM não suportado: ${config.MODEL_PROVIDER}. Provedores suportados: openai, openai/gpt-4o`);
  }
}
import { StateGraph } from "@langchain/langgraph";
import { EmailStateAnnotation } from './state/EmailState.js';
import { readEmail } from './nodes/readEmail.js';
import { classifyEmail } from './nodes/classifyEmail.js';
import { handleSpam } from './nodes/handleSpam.js';
import { draftResponse } from './nodes/draftResponse.js';
import { notifyOwner } from './nodes/notifyOwner.js';
import { routeEmail } from './routing.js';

// Criar o grafo de estados usando a API oficial
const emailGraph = new StateGraph(EmailStateAnnotation)
  // Adicionar todos os nós
  .addNode("readEmail", readEmail)
  .addNode("classifyEmail", classifyEmail)
  .addNode("handleSpam", handleSpam)
  .addNode("draftResponse", draftResponse)
  .addNode("notifyOwner", notifyOwner)
  
  // Definir o ponto de entrada
  .addEdge("__start__", "readEmail")
  
  // Definir fluxo linear inicial
  .addEdge("readEmail", "classifyEmail")
  
  // Adicionar ramificação condicional após classificação
  .addConditionalEdges(
    "classifyEmail",
    routeEmail,
    {
      "spam": "handleSpam",
      "legitimate": "draftResponse"
    }
  )
  
  // Definir finalizações
  .addEdge("handleSpam", "__end__")
  .addEdge("draftResponse", "notifyOwner")
  .addEdge("notifyOwner", "__end__");

// Compilar o grafo
export const compiledGraph = emailGraph.compile();

console.log('Grafo LangGraph compilado com sucesso!');
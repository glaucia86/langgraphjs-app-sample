# 🤖 Sistema de Processamento de Emails do Alfred
### Tutorial Prático: LangGraph.js em TypeScript

Um sistema completo de orquestração de IA usando **LangGraph.js** para classificar emails automaticamente, gerar respostas e gerenciar fluxos condicionais com inteligência artificial.

<div align="center">

![LangGraph.js](https://img.shields.io/badge/LangGraph.js-Latest-blue?style=for-the-badge)
![LangChain](https://img.shields.io/badge/LangChain-Latest-green?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Express.js](https://img.shields.io/badge/Express.js-4+-000000?style=for-the-badge&logo=express&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-Latest-FF6B6B?style=for-the-badge)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=for-the-badge&logo=openai&logoColor=white)
![GitHub Models](https://img.shields.io/badge/GitHub_Models-Free-181717?style=for-the-badge&logo=github&logoColor=white)
![npm](https://img.shields.io/badge/npm-9+-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![REST API](https://img.shields.io/badge/REST_API-Implemented-25D366?style=for-the-badge)
![CORS](https://img.shields.io/badge/CORS-Enabled-FF9500?style=for-the-badge)
![ES Modules](https://img.shields.io/badge/ES_Modules-✅-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![MIT License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

</div>

## 📚 O que é LangGraph.js?

**LangGraph.js** é uma biblioteca JavaScript/TypeScript para construir **aplicações de IA stateful e multi-ator**. É a versão JavaScript do LangGraph Python, desenvolvida pela LangChain.

### 🧠 Por que LangGraph.js é Importante para Agentes?

#### **1. Fluxos Complexos com Estado**
```typescript
// Em vez de chamadas lineares simples:
const response = await llm.invoke("classify email");

// LangGraph permite fluxos condicionais sofisticados:
const workflow = new StateGraph(StateAnnotation)
  .addNode("classify", classifyEmail)
  .addConditionalEdges("classify", routeBasedOnResult, {
    "spam": "handleSpam",
    "legitimate": "generateResponse"
  });
```

#### **2. Controle de Execução Granular**
- **Pontos de parada**: Pausar execução para aprovação humana
- **Retry policies**: Repetir nós que falharam automaticamente  
- **Observabilidade**: Rastrear cada passo da execução
- **Branching**: Diferentes caminhos baseados em condições

#### **3. Gerenciamento de Estado Robusto**
```typescript
// Estado compartilhado entre todos os nós
const StateAnnotation = Annotation.Root({
  messages: Annotation<Message[]>({
    reducer: (existing, update) => [...existing, ...update]
  }),
  currentStep: Annotation<string>(),
  metadata: Annotation<object>()
});
```

#### **4. Casos de Uso Ideais**
- 🔄 **Agentes Conversacionais**: Manter contexto entre interações
- 🌐 **Workflows Empresariais**: Aprovações, revisões, escalações
- 🧪 **Sistemas de Decisão**: Múltiplas etapas de análise
- 🔗 **Orquestração de APIs**: Coordenar chamadas sequenciais/paralelas
- 🎯 **Agentes com Ferramentas**: Usar tools baseado em contexto

---

## 🏗️ Arquitetura do Projeto

Este projeto demonstra um **agente de classificação de emails** que:

1. **📧 Lê emails** recebidos
2. **🤖 Classifica** como spam ou legítimo usando IA
3. **🔀 Roteia** condicionalmente baseado na classificação
4. **✍️ Gera rascunhos** de resposta para emails legítimos
5. **📢 Notifica** o usuário final

### 📊 Fluxo do Sistema

```
📧 Email Recebido
    ↓
🤖 Classificação IA (Spam/Legítimo)
    ↓
🔀 Roteamento Condicional
   ↙️        ↘️
🗑️ Spam    ✍️ Resposta
   ↓            ↓
🏁 Fim    📢 Notificação
           ↓
         🏁 Fim
```

---

## 🚀 Início Rápido

### Pré-requisitos

- **Node.js 20+**
- **npm** ou **pnpm**
- **Conta OpenAI** ou **GitHub Models** (gratuito)

### 1. Clonagem e Setup

```bash
# Clonar e organizar
git clone <seu-repo>
cd langgraph-ts-email-agent

# Setup Backend
cd email-agent-backend
npm install
cp .env.example .env
# ✏️ Editar .env com suas credenciais

# Setup Frontend  
cd ../email-agent-frontend
npm install
```

### 2. Configuração de Credenciais

**email-agent-backend/.env:**
```env
# Opção 1: GitHub Models (GRATUITO) - Recomendado
GITHUB_TOKEN=ghp_your_github_token_here
MODEL_PROVIDER=github

# Opção 2: OpenAI (PAGO)
# OPENAI_API_KEY=sk-your_openai_key_here  
# MODEL_PROVIDER=openai

PORT=3000
NODE_ENV=development
```

### 3. Execução

```bash
# Terminal 1: Backend
cd email-agent-backend
npm run dev

# Terminal 2: Frontend
cd email-agent-frontend  
npm run dev
```

**🌐 URLs:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Health Check: http://localhost:3000/api/graph/health

---

## 🧪 Testando o Sistema

### 1. Via Interface Web

1. Acesse http://localhost:5173
2. Clique em **"Carregar Email Legítimo"** ou **"Carregar Spam"**
3. Clique **"Processar Email"**
4. Veja o resultado com caminho de execução, classificação e rascunho

### 2. Via API (curl)

**Email Legítimo:**
```bash
curl -X POST http://localhost:3000/api/graph/run \
  -H "Content-Type: application/json" \
  -d '{
    "email": {
      "sender": "joao@empresa.com",
      "subject": "Consulta sobre serviços", 
      "body": "Prezado Sr. Wayne, gostaria de agendar uma reunião para discutir parcerias estratégicas."
    }
  }'
```

**Resposta esperada:**
```json
{
  "success": true,
  "runId": "uuid-12345",
  "executionTime": 2543,
  "result": {
    "isSpam": false,
    "spamReason": null, 
    "emailCategory": "consulta",
    "emailDraft": "Prezado João,\n\nAgradecemos seu interesse...",
    "executionPath": ["readEmail", "classifyEmail", "draftResponse", "notifyOwner"],
    "processingComplete": true
  }
}
```

**Email Spam:**
```bash
curl -X POST http://localhost:3000/api/graph/run \
  -H "Content-Type: application/json" \
  -d '{
    "email": {
      "sender": "premio@loteria.com",
      "subject": "VOCÊ GANHOU R$ 1.000.000!!!",
      "body": "URGENTE! Envie R$ 100 de taxa para receber seu prêmio milionário!"
    }
  }'
```

**Resposta esperada:**
```json
{
  "success": true,
  "result": {
    "isSpam": true,
    "spamReason": "Promessas de prêmios irreais e solicitação de dinheiro",
    "emailCategory": null,
    "emailDraft": null,
    "executionPath": ["readEmail", "classifyEmail", "handleSpam"],
    "processingComplete": true
  }
}
```

### 3. Via Node.js REPL

```bash
cd email-agent-backend
node

# No REPL:
const { compiledGraph } = await import('./src/graph/index.js');

const result = await compiledGraph.invoke({
  email: { 
    sender: "test@test.com", 
    subject: "Teste", 
    body: "Mensagem de teste" 
  },
  isSpam: null,
  executionPath: [],
  // ... outros campos
});

console.log("Resultado:", result);
```

---

## 🎨 Visualização do Grafo

### Método 1: Script Dedicado

```bash
cd email-agent-backend
npm run visualize
```

**Saída:**
```
🎨 VISUALIZAÇÃO DO GRAFO:
==================================================

📦 NÓS:
  - readEmail
  - classifyEmail  
  - handleSpam
  - draftResponse
  - notifyOwner

🔗 CONEXÕES:
  __start__ → readEmail
  readEmail → classifyEmail
  classifyEmail → handleSpam
  classifyEmail → draftResponse
  handleSpam → __end__
  draftResponse → notifyOwner
  notifyOwner → __end__

📊 CÓDIGO MERMAID:
graph TD
    __start__ --> readEmail
    readEmail --> classifyEmail
    ...

💡 Cole o código acima em: https://mermaid.live/
```

### Método 2: Debug Automático

```bash
npm run debug-graph
```

Mostra estrutura do grafo toda vez que iniciar o servidor.

### Método 3: Mermaid Online

1. Execute `npm run visualize`
2. Copie o código Mermaid gerado
3. Cole em https://mermaid.live/
4. Visualize o grafo interativo

---

## 📁 Estrutura do Projeto

```
langgraph-ts-email-agent/
├── email-agent-backend/              # API Backend
│   ├── src/
│   │   ├── graph/                    # Definições do LangGraph
│   │   │   ├── nodes/                # Nós individuais
│   │   │   │   ├── readEmail.ts      
│   │   │   │   ├── classifyEmail.ts  
│   │   │   │   ├── handleSpam.ts     
│   │   │   │   ├── draftResponse.ts  
│   │   │   │   └── notifyOwner.ts    
│   │   │   ├── state/                # Estado compartilhado
│   │   │   │   └── EmailState.ts     
│   │   │   ├── routing.ts            # Lógica de roteamento
│   │   │   └── index.ts              # Montagem do grafo
│   │   ├── lib/                      # Utilidades
│   │   │   └── llm.ts                # Configuração do LLM
│   │   ├── routes/                   # Endpoints da API
│   │   │   └── graph.ts              
│   │   └── index.ts                  # Servidor Express
│   ├── .env.example                  # Template de configuração
│   ├── package.json
│   └── tsconfig.json
│
└── email-agent-frontend/             # Interface React
    ├── src/
    │   ├── components/               # Componentes React
    │   │   ├── EmailForm.tsx         # Formulário de entrada
    │   │   └── ResultDisplay.tsx     # Exibição de resultados
    │   ├── types/                    # Tipos TypeScript
    │   │   └── api.ts                
    │   └── App.tsx                   # Aplicação principal
    ├── package.json
    └── tailwind.config.js
```

---

## 🔧 Comandos Disponíveis

### Backend

```bash
npm run dev         # Servidor de desenvolvimento
npm run build       # Compilar TypeScript
npm run start       # Executar versão compilada
```

### Frontend

```bash
npm run dev        # Servidor de desenvolvimento  
npm run build      # Build para produção
npm run preview    # Preview da build
```

---

## 🧩 Conceitos Importantes

### 1. **Estado Compartilhado com Annotation**

```typescript
export const EmailStateAnnotation = Annotation.Root({
  email: Annotation<EmailInput>({
    reducer: (existing, update) => update ?? existing,
    default: () => ({ sender: '', subject: '', body: '' })
  }),
  isSpam: Annotation<boolean | null>({
    reducer: (existing, update) => update ?? existing,
    default: () => null
  })
  // ... outros campos
});
```

### 2. **Nós como Funções Puras**

```typescript
export async function classifyEmail(state: EmailState) {
  // Processar entrada
  const classification = await llm.invoke(prompt);
  
  // Retornar atualização parcial do estado
  return {
    isSpam: classification.isSpam,
    emailCategory: classification.category,
    executionPath: [...state.executionPath, 'classifyEmail']
  };
}
```

### 3. **Roteamento Condicional**

```typescript
export function routeEmail(state: EmailState): 'spam' | 'legitimate' {
  return state.isSpam ? 'spam' : 'legitimate';
}

// Uso no grafo
.addConditionalEdges("classifyEmail", routeEmail, {
  "spam": "handleSpam",
  "legitimate": "draftResponse"  
})
```

### 4. **Edges Especiais**

- `"__start__"`: Ponto de entrada do grafo
- `"__end__"`: Pontos de finalização  
- Edges condicionais baseados em função de roteamento
- Edges lineares simples entre nós

---

## 🔍 Logs e Debugging

### Logs Estruturados

O sistema gera logs detalhados para cada execução:

```
🚀 Iniciando execução 12345-67890
🔍 Alfred está processando email de joao@empresa.com
📬 Assunto: Consulta sobre serviços
🤖 Classificação: LEGÍTIMO (confiança: 0.95)
✍️ Alfred redigiu rascunho de resposta
📧 NOTIFICAÇÃO PARA O SR. WAYNE
============================================================
De: joao@empresa.com
Assunto: Consulta sobre serviços  
Categoria: consulta
...
✅ Execução 12345-67890 concluída em 2543ms
```

### Health Check

```bash
curl http://localhost:3000/api/graph/health

# Resposta:
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:45.123Z",
  "service": "LangGraph Email Agent"
}
```

---

## 🛠️ Personalização e Extensão

### 1. Adicionando Novos Nós

```typescript
// 1. Criar arquivo do nó
export async function enrichWithFAQ(state: EmailState) {
  // Buscar FAQs relacionados
  const faqs = await searchFAQ(state.email.subject);
  return { 
    relatedFAQs: faqs,
    executionPath: [...state.executionPath, 'enrichWithFAQ']
  };
}

// 2. Adicionar ao estado
const EmailStateAnnotation = Annotation.Root({
  // ... campos existentes
  relatedFAQs: Annotation<string[]>({
    default: () => []
  })
});

// 3. Integrar no grafo
const emailGraph = new StateGraph(EmailStateAnnotation)
  .addNode("enrichWithFAQ", enrichWithFAQ)
  .addEdge("draftResponse", "enrichWithFAQ")
  .addEdge("enrichWithFAQ", "notifyOwner");
```

### 2. Mudando Provedor de LLM

**Para Anthropic Claude:**
```typescript
// src/lib/llm.ts
import { ChatAnthropic } from "@langchain/anthropic";

case 'anthropic':
  return new ChatAnthropic({
    modelName: "claude-3-sonnet-20240229", 
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
```

### 3. Adicionando Ferramentas (Tools)

```typescript
import { DynamicTool } from "@langchain/core/tools";

const searchTool = new DynamicTool({
  name: "search_knowledge_base",
  description: "Buscar informações na base de conhecimento", 
  func: async (query: string) => {
    // Implementar busca
    return searchResults;
  }
});

// Integrar no nó
const model = createLLMProvider().bindTools([searchTool]);
```

---

## 📈 Próximos Passos

### Funcionalidades Avançadas

- **🔄 Retry Policies**: Repetir nós que falharam
- **⏸️ Human in the Loop**: Aprovação manual em pontos específicos  
- **🔄 Loops**: Fluxos iterativos até condição ser atendida
- **📊 Observabilidade**: Integração com Langfuse/LangSmith
- **💾 Persistência**: Salvar estado em banco de dados
- **🔐 Autenticação**: Sistema de usuários e permissões

### Melhorias de Produção

- **🐳 Containerização**: Docker + Docker Compose
- **☁️ Deploy**: Vercel, Netlify, Railway
- **📈 Monitoramento**: Métricas de performance e erro
- **🔒 Segurança**: Rate limiting, validação robusta
- **📚 Documentação**: OpenAPI/Swagger
- **🧪 Testes**: Unit tests, integration tests

---

## 🤝 Contribuindo

1. Fork do projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'Adiciona nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`  
5. Abra um Pull Request

---

## 📚 Recursos Úteis

### Documentação

- [LangGraph.js Official Docs](https://langchain-ai.github.io/langgraphjs/)
- [LangChain.js Documentation](https://js.langchain.com/)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [GitHub Models](https://github.com/features/copilot)

### Tutoriais e Exemplos

- [LangGraph.js Quickstart](https://langchain-ai.github.io/langgraphjs/tutorials/quickstart/)
- [Building Agents with LangGraph](https://blog.langchain.dev/langgraph/)
- [State Management Patterns](https://langchain-ai.github.io/langgraphjs/concepts/#state)

### Comunidade

- [LangChain Discord](https://discord.gg/langchain)
- [GitHub Discussions](https://github.com/langchain-ai/langgraphjs/discussions)
- [Twitter/X @LangChainAI](https://twitter.com/LangChainAI)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 👨‍💻 Autor

Desenvolvido como material educacional para aprender **LangGraph.js** e **orquestração de agentes de IA** em TypeScript.

---

<div align="center">

**🚀 Construa Agentes Inteligentes com LangGraph.js + TypeScript! 🤖**

[⭐ Star este projeto](https://github.com/seu-usuario/langgraph-ts-email-agent) • [🐛 Reportar Bug](https://github.com/seu-usuario/langgraph-ts-email-agent/issues) • [💡 Sugerir Feature](https://github.com/seu-usuario/langgraph-ts-email-agent/issues)

</div>
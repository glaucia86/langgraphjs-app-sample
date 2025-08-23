import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { graphRouter } from './routes/graph.js';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/graph', graphRouter);

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: 'LangGraph Email Agent API',
    version: '1.0.0',
    endpoints: {
      health: '/api/graph/health',
      run: 'POST /api/graph/run'
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/graph/health`);
});
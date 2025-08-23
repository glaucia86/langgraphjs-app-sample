import { useState } from 'react';
import axios from 'axios';
import { EmailForm } from './components/EmailForm';
import { ResultDisplay } from './components/ResultDisplay';
import type { EmailInput, ApiResponse } from './types/api';

const API_BASE_URL = 'http://localhost:3000/api/graph';

function App() {
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProcessEmail = async (email: EmailInput) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/run`, { email });
      setResult(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || err.message);
      } else {
        setError('Erro desconhecido ao processar email');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🤖 Sistema de IA do Alfred
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Processamento inteligente de emails com LangGraph.js para classificação, 
            detecção de spam e geração automática de respostas
          </p>
        </header>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Formulário */}
            <div className="order-1">
              <EmailForm onSubmit={handleProcessEmail} loading={loading} />
            </div>

            {/* Resultado */}
            <div className="order-2">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6 shadow-sm">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">❌</span>
                    <div>
                      <strong className="font-semibold">Erro no processamento:</strong>
                      <p className="mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {result && result.success && result.result && (
                <ResultDisplay
                  result={result.result}
                  executionTime={result.executionTime}
                  runId={result.runId}
                />
              )}

              {!result && !error && !loading && (
                <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                  <div className="text-gray-400 text-6xl mb-4">📧</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Pronto para analisar emails
                  </h3>
                  <p className="text-gray-500 text-lg">
                    Preencha o formulário ao lado e clique em "Processar Email" para ver a mágica acontecer
                  </p>
                </div>
              )}

              {loading && (
                <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                  <div className="animate-spin text-6xl mb-4">🔄</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Processando email...
                  </h3>
                  <p className="text-gray-500">
                    O Alfred está analisando o email com inteligência artificial
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
import type { GraphResult } from '../types/api';

interface ResultDisplayProps {
  result: GraphResult;
  executionTime?: number;
  runId: string;
}

export function ResultDisplay({ result, executionTime, runId }: ResultDisplayProps) {
  return (
    <div className="card space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">📊</span>
        <h3 className="text-2xl font-bold text-gray-800">
          Resultado do Processamento
        </h3>
      </div>
      
      {/* Metadados da execução */}
      <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <span>ℹ️</span>
          <span>Informações da Execução</span>
        </h4>
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex items-center gap-2">
            <span>🆔</span>
            <span>ID: <code className="font-mono bg-white px-2 py-1 rounded text-xs">{runId}</code></span>
          </div>
          {executionTime && (
            <div className="flex items-center gap-2">
              <span>⏱️</span>
              <span>Tempo: <strong>{executionTime}ms</strong></span>
            </div>
          )}
        </div>
      </div>

      {/* Caminho de execução */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span>🛤️</span>
          <span>Caminho Percorrido</span>
        </h4>
        <div className="flex flex-wrap gap-3">
          {result.executionPath.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium shadow-sm"
            >
              <span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold">
                {index + 1}
              </span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Classificação */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span>🏷️</span>
          <span>Classificação</span>
        </h4>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div
            className={`px-6 py-3 rounded-lg font-semibold text-lg shadow-sm ${
              result.isSpam
                ? 'bg-red-100 text-red-700 border border-red-200'
                : 'bg-green-100 text-green-700 border border-green-200'
            }`}
          >
            {result.isSpam ? '🗑️ SPAM DETECTADO' : '✅ EMAIL LEGÍTIMO'}
          </div>
          
          {result.emailCategory && (
            <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium border border-purple-200">
              <span className="flex items-center gap-2">
                <span>📂</span>
                <span>{result.emailCategory}</span>
              </span>
            </div>
          )}
        </div>
        
        {result.spamReason && (
          <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <div>
                <strong className="text-red-700 font-semibold">Motivo da Classificação como Spam:</strong>
                <p className="text-red-600 mt-2 leading-relaxed">{result.spamReason}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rascunho de resposta */}
      {result.emailDraft && (
        <div>
          <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span>✍️</span>
            <span>Rascunho de Resposta Gerado</span>
          </h4>
          <div className="p-6 bg-green-50 border border-green-200 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm text-green-600 font-medium">Resposta automática gerada pelo Alfred</span>
            </div>
            <div className="prose prose-green max-w-none">
              <pre className="whitespace-pre-wrap text-green-800 font-sans leading-relaxed bg-white p-4 rounded border border-green-200">
                {result.emailDraft}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Status */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <div
            className={`w-4 h-4 rounded-full shadow-sm ${
              result.processingComplete ? 'bg-green-500' : 'bg-yellow-500'
            }`}
          />
          <span className="text-sm font-medium text-gray-700">
            {result.processingComplete ? 'Processamento Concluído' : 'Em Processamento'}
          </span>
        </div>
        
        {result.processingComplete && (
          <div className="text-green-600 text-xl">
            ✅
          </div>
        )}
      </div>
    </div>
  );
}
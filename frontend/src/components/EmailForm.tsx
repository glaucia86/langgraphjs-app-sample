import React, { useState } from 'react';
import type { EmailInput } from '../types/api';

interface EmailFormProps {
  onSubmit: (email: EmailInput) => void;
  loading: boolean;
}

const EXAMPLE_EMAILS = {
  legitimate: {
    sender: "joao.silva@empresa.com",
    subject: "Consulta sobre serviços de consultoria",
    body: "Prezado Sr. Wayne, fui indicado por um colega e gostaria de saber mais sobre seus serviços de consultoria. Poderíamos agendar uma conversa na próxima semana? Atenciosamente, João Silva"
  },
  spam: {
    sender: "vencedor@loteria-internacional.com",
    subject: "VOCÊ GANHOU R$ 5.000.000!!!",
    body: "PARABÉNS! Você foi selecionado como vencedor da nossa loteria internacional! Para receber seus R$ 5.000.000, envie seus dados bancários e uma taxa de processamento de R$ 500."
  }
};

export function EmailForm({ onSubmit, loading }: EmailFormProps) {
  const [email, setEmail] = useState<EmailInput>({
    sender: '',
    subject: '',
    body: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  const loadExample = (type: 'legitimate' | 'spam') => {
    setEmail(EXAMPLE_EMAILS[type]);
  };

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">📧</span>
        <h2 className="text-2xl font-bold text-gray-800">
          Processador de Emails do Alfred
        </h2>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => loadExample('legitimate')}
          className="flex-1 px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <span>📨</span>
          <span>Email Legítimo</span>
        </button>
        <button
          type="button"
          onClick={() => loadExample('spam')}
          className="flex-1 px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <span>🗑️</span>
          <span>Email Spam</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            📤 Remetente (Email)
          </label>
          <input
            type="email"
            value={email.sender}
            onChange={(e) => setEmail({ ...email, sender: e.target.value })}
            className="input-field"
            placeholder="exemplo@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            📝 Assunto
          </label>
          <input
            type="text"
            value={email.subject}
            onChange={(e) => setEmail({ ...email, subject: e.target.value })}
            className="input-field"
            placeholder="Digite o assunto do email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            💬 Corpo do Email
          </label>
          <textarea
            value={email.body}
            onChange={(e) => setEmail({ ...email, body: e.target.value })}
            rows={8}
            className="input-field resize-none"
            placeholder="Digite o conteúdo do email..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">🔄</span>
              <span>Processando...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span>🚀</span>
              <span>Processar Email</span>
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
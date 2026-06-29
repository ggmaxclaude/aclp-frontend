'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout, estaLogado, getPerfil } from '../../lib/api';

export default function Painel() {
  const router = useRouter();
  const [copiado, setCopiado] = useState(false);
  const [perfil, setPerfil] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!estaLogado()) {
      router.push('/ativar');
      return;
    }
    getPerfil()
      .then(data => setPerfil(data))
      .catch(() => {
        logout();
        router.push('/ativar');
      })
      .finally(() => setLoading(false));
  }, []);

  function handleLogout() {
    logout();
    router.push('/');
  }

  function copiarComando() {
    navigator.clipboard.writeText('fcc-claude');
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  function formatarData(data: string | null) {
    if (!data) return 'N/A';
    return new Date(data).toLocaleDateString('pt-BR');
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-gray-400">Carregando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-purple-400">GGMAX AI</span>
        <button onClick={handleLogout} className="text-gray-400 hover:text-white text-sm transition">
          Sair
        </button>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-1">Bem-vindo!</h1>
        {perfil && (
          <p className="text-gray-400 mb-4 text-sm">{perfil.email}</p>
        )}

        {perfil && (
          <div className="bg-purple-900 border border-purple-700 rounded-2xl p-5 mb-8 flex items-center justify-between">
            <div>
              <p className="text-purple-300 text-sm">Status da licenca</p>
              <p className="text-white font-semibold text-lg">
                {perfil.licenca_ativa ? 'Ativa' : 'Inativa'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-purple-300 text-sm">Expira em</p>
              <p className="text-white font-semibold text-lg">{formatarData(perfil.data_expiracao)}</p>
            </div>
            <div className="text-right">
              <p className="text-purple-300 text-sm">Plano</p>
              <p className="text-white font-semibold text-lg">{perfil.dias_duracao} dias</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-1">Passo 1 — Instale o Claude Code</h2>
            <p className="text-gray-400 text-sm mb-3">Abra o terminal e rode:</p>
            <code className="block bg-gray-800 px-4 py-3 rounded-lg text-purple-300 text-sm">
              npm install -g @anthropic-ai/claude-code
            </code>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-1">Passo 2 — Inicie o servidor</h2>
            <p className="text-gray-400 text-sm mb-3">Mantenha rodando em um terminal:</p>
            <code className="block bg-gray-800 px-4 py-3 rounded-lg text-purple-300 text-sm">
              fcc-server
            </code>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-1">Passo 3 — Abra o Claude Code</h2>
            <p className="text-gray-400 text-sm mb-3">Em outro terminal, rode:</p>
            <div className="flex items-center gap-3">
              <code className="flex-1 block bg-gray-800 px-4 py-3 rounded-lg text-purple-300 text-sm">
                fcc-claude
              </code>
              <button onClick={copiarComando}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-3 rounded-lg text-sm transition">
                {copiado ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
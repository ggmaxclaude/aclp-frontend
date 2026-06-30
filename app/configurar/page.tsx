'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { salvarApiKey } from '../../lib/api';

export default function Configurar() {
  const router = useRouter();
  const [apiKey, setApiKey] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      await salvarApiKey(apiKey);
      router.push('/painel');
    } catch (err: any) {
      setErro(err?.detail || 'Erro ao salvar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-8 border border-gray-800">
        <h1 className="text-2xl font-bold mb-2 text-center">Configurar API Key</h1>
        <p className="text-gray-400 text-center mb-8">
          Insira sua chave da NVIDIA NIM para comecar a usar o Claude Code
        </p>
        <form onSubmit={handleSalvar} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">NVIDIA NIM API Key</label>
            <input
              type="text"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 font-mono text-sm"
              placeholder="nvapi-..."
              required
            />
          </div>
          <p className="text-gray-500 text-xs">
            Gere sua chave gratuita em build.nvidia.com/settings/api-keys
          </p>
          {erro && <p className="text-red-400 text-sm">{erro}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Salvando...' : 'Salvar e continuar'}
          </button>
        </form>
      </div>
    </main>
  );
}
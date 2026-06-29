'use client';

import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function Admin() {
  const [adminKey, setAdminKey] = useState('');
  const [logado, setLogado] = useState(false);
  const [licencas, setLicencas] = useState<any[]>([]);
  const [dias, setDias] = useState(7);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const [novaLicenca, setNovaLicenca] = useState<any>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin-licencas/listar`, {
        headers: { 'x-admin-key': adminKey }
      });
      if (!res.ok) throw new Error('Chave invalida');
      const data = await res.json();
      setLicencas(data);
      setLogado(true);
    } catch {
      setErro('Chave de administrador invalida.');
    } finally {
      setLoading(false);
    }
  }

  async function gerarLicenca() {
    setErro('');
    setLoading(true);
    setNovaLicenca(null);
    try {
      const res = await fetch(`${API_URL}/admin-licencas/gerar`, {
        method: 'POST',
        headers: { 'x-admin-key': adminKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ dias_duracao: dias })
      });
      if (!res.ok) throw new Error('Erro ao gerar');
      const data = await res.json();
      setNovaLicenca(data);
      setLicencas(prev => [data, ...prev]);
    } catch {
      setErro('Erro ao gerar licenca.');
    } finally {
      setLoading(false);
    }
  }

  function formatarData(data: string | null) {
    if (!data) return 'Nao ativada';
    return new Date(data).toLocaleDateString('pt-BR');
  }

  if (!logado) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <h1 className="text-2xl font-bold mb-2 text-center">Painel Admin</h1>
          <p className="text-gray-400 text-center mb-8">Acesso restrito</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Chave de Administrador</label>
              <input type="password" value={adminKey} onChange={e => setAdminKey(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                placeholder="chave secreta" required />
            </div>
            {erro && <p className="text-red-400 text-sm">{erro}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition disabled:opacity-50">
              {loading ? 'Verificando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-purple-400">GGMAX AI — Admin</span>
        <button onClick={() => setLogado(false)} className="text-gray-400 hover:text-white text-sm transition">
          Sair
        </button>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Gerar Nova Licenca</h2>
          <div className="flex gap-4 items-end">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Dias</label>
              <select value={dias} onChange={e => setDias(Number(e.target.value))}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500">
                <option value={7}>7 dias</option>
                <option value={30}>30 dias</option>
                <option value={90}>90 dias</option>
              </select>
            </div>
            <button onClick={gerarLicenca} disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50">
              {loading ? 'Gerando...' : 'Gerar Licenca'}
            </button>
          </div>
          {novaLicenca && (
            <div className="mt-4 bg-green-900 border border-green-700 rounded-lg p-4">
              <p className="text-green-300 text-sm mb-1">Licenca gerada com sucesso!</p>
              <p className="text-white font-mono text-lg font-bold">{novaLicenca.chave_ggmax}</p>
              <p className="text-green-400 text-sm">{novaLicenca.dias_duracao} dias</p>
            </div>
          )}
          {erro && <p className="text-red-400 text-sm mt-2">{erro}</p>}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Licencas ({licencas.length})</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {licencas.map((l, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-3">
                <span className="font-mono text-purple-300 text-sm">{l.chave_ggmax}</span>
                <span className="text-xs text-gray-400">{l.dias_duracao} dias</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  l.status === 'ativa' ? 'bg-green-900 text-green-300' :
                  l.status === 'disponivel' ? 'bg-blue-900 text-blue-300' :
                  'bg-gray-700 text-gray-400'
                }`}>{l.status}</span>
                <span className="text-xs text-gray-500">{formatarData(l.data_ativacao)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
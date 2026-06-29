'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cadastrar, login, ativarLicenca } from '../../lib/api';

export default function Ativar() {
  const router = useRouter();
  const [etapa, setEtapa] = useState('login');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [chave, setChave] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const [novaConta, setNovaConta] = useState(false);
  
  async function handleLogin(e) {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      if (novaConta) {
        await cadastrar(email, senha);
      }
      await login(email, senha);
      setEtapa('licenca');
    } catch (err) {
      setErro(err?.detail || 'Erro ao autenticar.');
    } finally {
      setLoading(false);
    }
  }

  async function handleAtivar(e) {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      await ativarLicenca(chave);
      router.push('/configurar');
    } catch (err) {
      setErro(err?.detail || 'Licenca invalida.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-8 border border-gray-800">
        <h1 className="text-2xl font-bold mb-2 text-center">
          {etapa === 'login' ? 'Entrar na sua conta' : 'Ativar Licenca'}
        </h1>
        <p className="text-gray-400 text-center mb-8">
          {etapa === 'login' ? 'Acesse sua conta GGMAX AI' : 'Insira a chave recebida na GGMAX'}
        </p>

        {etapa === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                placeholder="seu@email.com" required />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Senha</label>
              <input type="password" value={senha} onChange={e => setSenha(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                placeholder="senha" required />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
              <input type="checkbox" checked={novaConta} onChange={e => setNovaConta(e.target.checked)} />
              Criar nova conta
            </label>
            {erro && <p className="text-red-400 text-sm">{erro}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition disabled:opacity-50">
              {loading ? 'Aguarde...' : novaConta ? 'Criar conta e entrar' : 'Entrar'}
            </button>
          </form>
        )}

        {etapa === 'licenca' && (
          <form onSubmit={handleAtivar} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Chave da Licenca</label>
              <input type="text" value={chave} onChange={e => setChave(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 font-mono"
                placeholder="BIG-XXXX-XXXX" required />
            </div>
            {erro && <p className="text-red-400 text-sm">{erro}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition disabled:opacity-50">
              {loading ? 'Ativando...' : 'Ativar Licenca'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
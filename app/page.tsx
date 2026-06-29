import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-purple-400">GGMAX AI</span>
        <Link href="/ativar" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition">
          Ativar Licenca
        </Link>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-5xl font-bold mb-4">
          Claude Code com seu proprio provedor
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mb-10">
          Compre uma licenca, conecte sua API key e use o Claude Code com modelos de IA de alta performance.
        </p>
        <Link href="/ativar" className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-xl text-lg font-semibold transition">
          Comecar agora
        </Link>
      </section>

      <section className="px-6 pb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Planos</h2>
        <div className="flex flex-col md:flex-row gap-6 max-w-3xl mx-auto">
          <div className="flex-1 border border-gray-800 rounded-2xl p-8 bg-gray-900">
            <h3 className="text-xl font-bold mb-2">Starter</h3>
            <p className="text-gray-400 mb-6">Perfeito para testar</p>
            <div className="text-4xl font-bold mb-6">7 dias</div>
            <ul className="text-gray-400 space-y-2 mb-8">
              <li>Acesso completo ao Claude Code</li>
              <li>Modelos NVIDIA NIM</li>
              <li>Suporte via chat</li>
            </ul>
            <Link href="/ativar" className="block text-center bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition">
              Comprar na GGMAX
            </Link>
          </div>

          <div className="flex-1 border border-purple-600 rounded-2xl p-8 bg-gray-900 relative">
            <span className="absolute top-4 right-4 bg-purple-600 text-xs px-2 py-1 rounded-full">Popular</span>
            <h3 className="text-xl font-bold mb-2">Mensal</h3>
            <p className="text-gray-400 mb-6">Para uso continuo</p>
            <div className="text-4xl font-bold mb-6">30 dias</div>
            <ul className="text-gray-400 space-y-2 mb-8">
              <li>Acesso completo ao Claude Code</li>
              <li>Modelos NVIDIA NIM</li>
              <li>Suporte prioritario</li>
              <li>Historico de conversas</li>
            </ul>
            <Link href="/ativar" className="block text-center bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition">
              Comprar na GGMAX
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 px-6 py-4 text-center text-gray-600 text-sm">
        GGMAX AI 2026
      </footer>
    </main>
  );
}

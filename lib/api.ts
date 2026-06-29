const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

function headers(auth = false): HeadersInit {
  const h: HeadersInit = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) h['Authorization'] = `Bearer ${token}`;
  }
  return h;
}

export async function cadastrar(email: string, senha: string) {
  const res = await fetch(`${API_URL}/auth/cadastro`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, senha }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function login(email: string, senha: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, senha }),
  });
  if (!res.ok) throw await res.json();
  const data = await res.json();
  localStorage.setItem('token', data.access_token);
  return data;
}

export async function ativarLicenca(chave_ggmax: string) {
  const res = await fetch(`${API_URL}/auth/ativar-licenca`, {
    method: 'POST',
    headers: headers(true),
    body: JSON.stringify({ chave_ggmax }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function salvarApiKey(nvidia_api_key?: string, openrouter_api_key?: string) {
  const res = await fetch(`${API_URL}/auth/salvar-api-key`, {
    method: 'PUT',
    headers: headers(true),
    body: JSON.stringify({ nvidia_api_key, openrouter_api_key }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function enviarMensagem(mensagem: string) {
  const res = await fetch(`${API_URL}/chat/enviar`, {
    method: 'POST',
    headers: headers(true),
    body: JSON.stringify({ mensagem }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export function logout() {
  localStorage.removeItem('token');
}

export function estaLogado(): boolean {
  return !!getToken();
}

export async function getPerfil() {
  const res = await fetch(`${API_URL}/auth/perfil`, {
    method: 'GET',
    headers: headers(true),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}
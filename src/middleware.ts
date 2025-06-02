import { NextRequest, NextResponse } from 'next/server';

// Defina as rotas públicas que não precisam de autenticação
const PUBLIC_PATHS = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permite acesso livre às rotas públicas
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Exemplo de verificação de autenticação (cookie fictício)
  const token = request.cookies.get('auth_token');
  if (!token) {
    // Redireciona para a página de login se não estiver autenticado
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Permite acesso às rotas protegidas se autenticado
  return NextResponse.next();
}

// Configuração de matcher para aplicar o middleware apenas em rotas desejadas
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
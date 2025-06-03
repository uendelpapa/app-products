# Coffee Mania

Coffee Mania é um sistema de cadastro e gerenciamento de produtos (cafés), desenvolvido com [Next.js](https://nextjs.org), React, Zustand, Zod, HeroUI e TailwindCSS.

## Funcionalidades

- Cadastro, edição e remoção de produtos (cafés)
- Upload e atualização de imagens dos produtos
- Autenticação de usuários (login e cadastro)
- Dashboard com gráficos de vendas e métricas
- Filtros e paginação de produtos
- Tema claro/escuro com persistência
- Interface responsiva e moderna

## Tecnologias Utilizadas

- [Next.js 14 (App Router)](https://nextjs.org/)
- [React 18](https://react.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Zod](https://zod.dev/)
- [HeroUI](https://heroui.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Axios](https://axios-http.com/)

## Como rodar o projeto

1. Instale as dependências:

```sh
npm install
```
2. Inicie o servidor de desenvolvimento:

```sh
npm run dev
```
3. Acesse http://localhost:3000 no seu navegador.

## Estrutura de Pastas
src/
  api/           # Funções para comunicação com a API
  app/           # Páginas e layouts do Next.js
  components/    # Componentes reutilizáveis
  data/          # Dados mockados (exemplo)
  lib/           # Configurações de bibliotecas (ex: axios)
  store/         # Zustand store (estado global)
  [middleware.ts](http://_vscodecontentref_/0)  # Middleware de autenticação

Desenvolvido por Uendel Papa.
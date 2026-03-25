# Color Grading Danillo

Projeto React + Vite

## Rodar localmente

1. Instale as dependencias: `npm install`
2. Crie seu arquivo `.env` a partir do `.env.example`
3. Inicie o projeto: `npm run dev`

O frontend sobe no Vite e a API local sobe em `http://localhost:3002`.
O Vite encaminha `/api` automaticamente para essa API local.

## Gerenciamento de Dados
O conteúdo do site é lido dos arquivos `.json` na raiz do projeto.
No ambiente local, o painel admin consegue salvar alterações nesses arquivos usando o `server.js`.

## Admin

As credenciais do admin devem ficar no arquivo `.env`, nunca fixas no código.

Exemplo:

- `ADMIN_USER=painel_nava_26`
- `ADMIN_PASSWORD=ColorGrade#NVA26!Studio`

## Deploy

O deploy atual na Vercel funciona bem para servir o site e ler os JSONs, mas nao e um bom lugar para persistir edicoes do painel, porque o filesystem da funcao serverless nao deve ser usado como banco de dados.

Se o objetivo e o cliente entrar no admin e salvar alteracoes de verdade, o caminho correto e:

1. Hospedar um backend Node/Express com escrita em disco ou banco de dados
2. Ou manter o frontend na Vercel e mover a API para outro servidor/banco

Se voce for usar Hostinger com Node habilitado, esse projeto fica bem mais adequado para o painel administrativo.


## Build

- `npm run build`
- `npm run preview`

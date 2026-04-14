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

O deploy na Vercel pode servir o site e, com Firebase configurado, persistir as edicoes do painel no Firestore.

Variaveis de ambiente necessarias no deploy:

- `ADMIN_USER`
- `ADMIN_PASSWORD`
- `JWT_SECRET`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

O valor de `FIREBASE_PRIVATE_KEY` deve ser colado na Vercel com as quebras de linha escapadas como `\n`.

Para enviar o conteudo atual dos arquivos `.json` para o Firestore pela primeira vez:

- preencha as variaveis do Firebase no `.env`
- rode `npm run firebase:seed`

Se o Firebase nao estiver configurado, a API da Vercel continua em modo somente leitura e faz fallback para os arquivos `.json`.


## Build

- `npm run build`
- `npm run preview`

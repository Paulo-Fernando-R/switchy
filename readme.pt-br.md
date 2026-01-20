[🇺🇸 Read in English](readme.md)

# Switchy

#### Download na Play Store: https://play.google.com/store/apps/details?id=com.ferreira.switchy

**Switchy** é uma plataforma de rede social completa composta por uma aplicação móvel (React Native/Expo) e uma API robusta (Node.js). O projeto permite aos usuários compartilhar atualizações, interagir com publicações e conectar-se com outros usuários em um ambiente dinâmico e responsivo.

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura e Design](#-arquitetura-e-design)
  - [Backend (Switchy API)](#backend-switchy-api)
  - [Frontend (Switchy App)](#frontend-switchy-app)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Execução](#-instalação-e-execução)
  - [Configurando a API](#configurando-a-api)
  - [Configurando o App](#configurando-o-app)
- [Documentação da API](#-documentação-da-api)

---

## 🚀 Sobre o Projeto

O **Switchy** foi desenvolvido com o objetivo de criar uma experiência social fluida. Ele implementa conceitos modernos de desenvolvimento de software, separando claramente as responsabilidades entre frontend e backend, e utilizando padrões de projeto que garantem escalabilidade e manutenibilidade.

A aplicação foca em postagens de texto curtas (microblogging), permitindo pré-visualização de links e integração rica com conteúdo externo.

---

## ✨ Funcionalidades

### 🔐 Autenticação e Usuários

- **Cadastro e Login**: Autenticação segura via JWT.
- **Recuperação de Senha**: Fluxo completo de recuperação de acesso.
- **Perfil de Usuário**: Edição de perfil e visualização de perfis de outros usuários.
- **Busca**: Pesquisa por usuários e conteúdos na plataforma.

### 📱 Feed e Interações

- **Publicações**: Criação de posts de texto (limite de 512 caracteres).
- **Link Preview**: Pré-visualização automática de links compartilhados nos posts.
- **Interações Social**: Comentários e sistema de likes (implícito nas funcionalidades sociais).
- **Notificações**: Central de notificações para atividades relevantes.

---

## 🏗 Arquitetura e Design

O projeto segue uma arquitetura baseada em **Modulos** (conceitualmente separados por pastas `api` e `app`) com forte ênfase em **Clean Code** e separação de responsabilidades.

### Backend (Switchy API)

A API foi construída seguindo princípios de **Domain-Driven Design (DDD)** e **Injeção de Dependência**.

- **Dependency Injection**: Utiliza `InversifyJS` para gerenciar dependências, tornando o código altamente testável e desacoplado.
- **Repository Pattern**: Abstração da camada de dados para facilitar a troca de banco de dados ou mockagem em testes.
- **Camadas**:
  - `Controllers`: Gerenciam as requisições HTTP.
  - `Services`: Contêm a regra de negócio.
  - `Repositories`: Acesso direto ao banco de dados (MongoDB).
  - `Domain`: Definições de tipos e interfaces do domínio.

### Frontend (Switchy App)

O aplicativo móvel utiliza arquitetura componentizada e gerenciamento de estado moderno.

- **React Query (@tanstack/react-query)**: Gerenciamento de estado do servidor, cache e atualizações otimistas.
- **Context API**: Para gerenciamento de estado global da aplicação (como sessão do usuário).
- **Repository Pattern**: Também aplicado no frontend (`src/repositories`) para centralizar as chamadas à API, desacoplando os componentes da lógica de rede.
- **Componentização**: Interface construída com componentes reutilizáveis (`ButtonDefault`, `SnackBar`, etc.).

---

## 🛠 Tecnologias Utilizadas

### Backend (Node.js)

- **Runtime**: Node.js
- **Framework**: Express
- **Linguagem**: TypeScript
- **Banco de Dados**: MongoDB (via Mongoose)
- **Autenticação**: JWT (JSON Web Token) & Bcrypt
- **Documentação**: Swagger (Swagger UI Express)
- **Email**: Nodemailer
- **DI Container**: InversifyJS

### Frontend (Mobile)

- **Framework**: React Native (via Expo)
- **Linguagem**: TypeScript
- **Gerenciamento de Estado**: React Query & Context API
- **Formulários**: React Hook Form
- **Navegação**: React Navigation (Stack & Tab)
- **HTTP Client**: Axios
- **Armazenamento Seguro**: Expo Secure Store
- **Integrações**: Link Preview JS, Embed Instagram

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão LTS recomendada)
- **NPM** ou **Yarn**
- **MongoDB** (Local ou Atlas URI)
- **Expo CLI** (Opcional, mas recomendado: `npm install -g expo-cli`)
- Dispositivo físico ou emulador (Android Studio/Xcode) para rodar o app.

---

## ⚙️ Instalação e Execução

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/switchy.git
cd switchy
```

### Configurando a API

1. Navegue até a pasta da API:

   ```bash
   cd switchy_api
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz de `switchy_api` baseando-se no `example.env`:

   ```env
   PORT=3333
   DB_PASSWORD=sua_senha
   DB_USER=seu_usuario
   DB_NAME=switchy_db
   DB_URL=sua_url_mongo_connection_string
   JWT_SECRET=seu_segredo_jwt
   TOKEN_EXPIRES=1d
   REFRESH_TOKEN_EXPIRES=2d
   ENCRYPT_SALT=10
   ```

4. Execute a API (Modo Desenvolvimento):
   Isso iniciará o servidor e gerará a documentação Swagger automaticamente.
   ```bash
   npm run dev
   ```

### Configurando o App

1. Em um novo terminal, navegue até a pasta do aplicativo:

   ```bash
   cd switchy_app
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz de `switchy_app` baseando-se no `example.env`:

   ```env
   # Substitua pelo IP da sua máquina se estiver rodando no dispositivo físico/emulador
   EXPO_PUBLIC_API_URL=http://localhost:3333
   ```

4. Execute o aplicativo:

   ```bash
   npm start
   ```

   - Pressione `a` para abrir no emulador Android.
   - Pressione `i` para abrir no simulador iOS.
   - Ou escaneie o QR Code com o app Expo Go no seu celular.

---

## 📖 Documentação da API

Com a API rodando, você pode acessar a documentação completa dos endpoints através do Swagger UI.

Acesse em seu navegador:

```
http://localhost:3333/api-docs
```

Para atualizar a documentação do Swagger após alterações no código:

```bash
npm run swagger
```

---

## 📱 Build e Deploy

### App (Expo)

Para gerar builds de produção utilizando o EAS (Expo Application Services):

```bash
# Build para Produção
eas build --profile production

# Submissão para Play Store (Android)
eas submit --platform android
```

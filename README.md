# 🚀 CRUD Backend - Node.js, TypeScript & JWT

API RESTful robusta, segura e escalável desenvolvida em **Node.js** com **TypeScript**, utilizando **MongoDB** para persistência de dados e autenticação baseada em **JSON Web Tokens (JWT)**.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

O projeto foi construído utilizando tecnologias modernas e amplamente adotadas no mercado de desenvolvimento backend:

* **Node.js**: Ambiente de execução JavaScript/TypeScript assíncrono e de alta performance.
* **TypeScript**: Superset do JavaScript que adiciona tipagem estática, garantindo maior segurança e manutenibilidade do código.
* **Express**: Framework web minimalista, flexível e rápido para criação de rotas e APIs.
* **MongoDB & Mongoose**: Banco de dados NoSQL orientado a documentos e ODM para modelagem e validação dos dados.
* **Zod**: Biblioteca de validação de esquemas de dados em tempo de execução com tipagem estática.
* **JWT (JSON Web Tokens)**: Padrão da indústria para autenticação segura e stateless de usuários.
* **Bcryptjs**: Biblioteca robusta para hash e criptografia segura de senhas.
* **CORS & Dotenv**: Gerenciamento de variáveis de ambiente e segurança de origens cruzadas.

---

## ✨ Características e Vantagens da Arquitetura

* **Tipagem Estrita (End-to-End)**: O uso do TypeScript mitiga erros em tempo de desenvolvimento e garante contratos claros nas requisições.
* **Validação Robusta com Zod**: As entradas de dados (corpo das requisições, parâmetros) são rigorosamente validadas antes de atingirem a camada de controle, blindando a aplicação contra dados maliciosos ou incorretos.
* **Segurança de Ponta**: 
  * Senhas nunca são armazenadas em texto plano (hash com `bcryptjs`).
  * Rotas protegidas por meio de **Middlewares de Autenticação JWT**, garantindo que apenas usuários autenticados acessem ou modifiquem recursos restritos.
* **Separação de Responsabilidades**: Arquitetura modular dividida em camadas (Rotas, Controladores, Middlewares, Modelos e Validadores), facilitando a testabilidade e futuras manutenções.

---

## 📌 Rotas da API

### **Autenticação (`/auth`)**
* `POST /auth/register` - Realiza o cadastro de um novo usuário.
* `POST /auth/login` - Autentica um usuário e retorna um token JWT de acesso.

### **Tarefas / Tasks (`/tasks`)** *(Requer Autenticação via Bearer Token)*
* `GET /tasks` - Lista todas as tarefas cadastradas do usuário logado.
* `POST /tasks` - Cria uma nova tarefa.
* `PUT /tasks/:id` - Atualiza uma tarefa existente pelo ID.
* `DELETE /tasks/:id` - Remove uma tarefa pelo ID.

---

## ⚙️ Como Executar o Projeto Localmente

1. Clone o repositório:
   ```bash
   git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)


   Instale as dependências:

Bash
npm install
Configure o arquivo .env na raiz do projeto baseando-se nas variáveis necessárias (ex: PORT, MONGO_URI, JWT_SECRET).

Inicie o servidor em modo de desenvolvimento:

Bash
npm run dev

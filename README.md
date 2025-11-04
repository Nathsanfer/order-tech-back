# 🍳 API de Receitas Culinárias

Este projeto é uma API REST para gerenciar receitas culinárias de diversas partes do mundo, permitindo criar, listar, atualizar e deletar receitas com informações detalhadas sobre ingredientes, modo de preparo, tempo de cozimento e muito mais.

A API foi construída com **Node.js, Express e Prisma**, utilizando SQLite como banco de dados (ou PostgreSQL, caso deseje).

---

## �️ Instalação e Configuração

### 1. Clonar o projeto e abrir no VS Code

```bash
git clone https://github.com/Nathsanfer/recipes-api.git
cd recipes-api
code .
```

> O comando `code .` abre o projeto diretamente no **VS Code** na pasta atual.

### 2. Instalar as dependências

Dentro do VS Code, abra o terminal e execute:

```bash
npm install
```

### 3. Configurar o arquivo `.env`

O projeto já possui um arquivo `.env.example` com a estrutura necessária:

```
PORT=
DATABASE_URL=
```

Para rodar localmente com **SQLite**, crie um arquivo `.env` na raiz do projeto com:

```env
PORT=5000
DATABASE_URL="file:./dev.db"
```

### 4. Rodar a migração do Prisma

Rode este comando no terminal e lembre-se de executá-lo sempre que houver alterações no schema:

```bash
npx prisma migrate dev
```

Esse comando:

* Aplica as alterações no banco de dados
* Cria e executa a migração
* Atualiza o Prisma Client automaticamente

### 5. Popular o banco de dados (opcional)

Para inserir receitas de exemplo no banco de dados:

```bash
npm run prisma:seed
```

Isso irá adicionar **19 receitas** de diferentes culinárias (Brasileira, Italiana, Japonesa, Mexicana, Francesa, Chinesa, Americana e Cubana).

### 6. Rodar a API

```bash
npm run dev
```

A API estará disponível em `http://localhost:5000` (ou na porta que você definir no `.env`).

---

## 📄 Exemplo de Resposta da API

Ao consultar uma receita específica (GET /recipes/:id), a API retorna algo como:

```json
{
  "id": 4,
  "name": "Lasanha à Bolonhesa",
  "category": "Prato Principal",
  "time": 90,
  "cuisine": "Italiana",
  "servings": 8,
  "rating": 4.9,
  "description": "Camadas deliciosas de massa, molho bolonhesa e molho branco gratinadas no forno.",
  "ingredients": "500g de massa para lasanha, 800g de carne moída, 2 latas de tomate pelado, 500ml de leite, 50g de manteiga, 50g de farinha de trigo, queijo parmesão, mussarela, alho, cebola, sal e pimenta",
  "instructions": "Prepare o molho bolonhesa refogando carne com alho, cebola e tomate. Faça o molho branco com manteiga, farinha e leite. Monte camadas alternando massa, molho bolonhesa, molho branco e queijo. Asse por 40 minutos a 180°C.",
  "imageUrl": "https://example.com/lasanha.jpg",
  "createdAt": "2025-11-02T20:15:00.000Z",
  "updatedAt": "2025-11-02T20:15:00.000Z"
}
```

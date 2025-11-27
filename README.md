# 🍔 OrderTech — API do Backend

API REST para gerenciar um cardápio, usuários, pedidos e os itens de cada pedido (order_menu).

Tecnologias: Node.js, Express, Prisma (SQLite por padrão), bcryptjs.

Este README documenta como iniciar o projeto localmente, como popular a base (seed), e como testar tudo no Postman (requests + exemplos + scripts de teste).

---

## Começando (instalação & configuração)

1. Clone o repositório e abra a pasta:

```cmd
git clone https://github.com/Nathsanfer/recipes-api.git
cd recipes-api
```

2. Instale dependências:

```cmd
npm install
```

3. Crie um arquivo `.env` na raiz (exemplo mínimo):

```env
PORT=5001
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_jwt_secret_here"
```

4. Gerar Prisma Client (sempre que alterar o schema):

```cmd
npx prisma generate
```

5. Aplicar migrations (use `migrate dev` em desenvolvimento — ele cria/atualiza migrações):

```cmd
npx prisma migrate dev
```

6. Popular banco com seed (opcional, inclui menu e usuários de exemplo):

```cmd
npm run prisma:seed
```

7. Rodar a API em modo desenvolvimento (nodemon):

```cmd
npm run dev
```

A API ficará disponível em `http://localhost:5000` por padrão.

Nota de PowerShell: se estiver no PowerShell e receber erros ao rodar `npm run`, use o Prompt de Comando (cmd.exe) ou invoque `npm.cmd`.

---

## Visão geral do projeto

Principais entidades (Prisma schema):

- `User` (tabela `users`) — campos: `id_user`, `nickname`, `password` (hash), timestamps.
- `Menu` (tabela `items`) — campos: `id_item`, `name`, `type`, `description`, `cost`, `size`, `imageUrl`.
- `Order` (tabela `orders`) — campos: `id_order`, `id_user`, `status`, `password_panel`, `total_cost`.
- `Order_Menu` (tabela associativa) — chave composta `[id_order, id_item]` com `quantity` e `observation`.

Controllers e rotas principais estão em `src/controllers` e `src/routes`.

Fluxo comum do totem (recomendo):

1. Cliente escolhe produtos do `Menu` (GET /menu).
2. O totem manda um único request `POST /orders/with-items` com `id_user` (ou usuário guest) e uma lista de itens — o servidor cria o pedido, grava `order_menu` e calcula `total_cost` automaticamente.

---

## Endpoints (resumo)

Base URL: `{{base_url}}` onde por padrão é `http://localhost:5000`.

Menu (items)

- GET /menu — listar todos
- GET /menu/:id — obter item
- POST /menu — criar item
- PUT /menu/:id — atualizar
- DELETE /menu/:id — remover

User

- GET /user — listar usuários (resposta não expõe senha)
- GET /user/:id — obter usuário (sem senha)
- POST /user — criar usuário (senha é armazenada como hash)
- PUT /user/:id — atualizar
- DELETE /user/:id — remover

Orders

- GET /orders — listar pedidos
- GET /orders/:id — obter pedido
- POST /orders — criar pedido (antigo: exige `total_cost` enviado)
- POST /orders/with-items — criar pedido e itens em uma única requisição (recomendado)
- PUT /orders/:id — atualizar
- DELETE /orders/:id — remover

Order_Menu

- GET /order_menu — listar todas as relações
- GET /order_menu/:orderId/:itemId — obter relação específica
- POST /order_menu — adicionar item a pedido
- PUT /order_menu/:orderId/:itemId — atualizar item do pedido
- DELETE /order_menu/:orderId/:itemId — remover item do pedido

---

## Seed (o que o seed faz)

O seed populou o `menu` com vários itens (44) e adiciona 5 usuários de exemplo: `alice`, `bob`, `carol`, `dave`, `guest`.

Para executar o seed:

```cmd
npm run prisma:seed
```

O seed é idempotente e, por padrão, limpa as tabelas `items` e `users` antes de inserir (você pode controlar com a variável de ambiente `SEED_CLEAN=0`).

---

## Testando tudo no Postman (passo-a-passo)

Crie um Environment no Postman com estas variáveis:

- `base_url` = `http://localhost:5000`
- `userId` = (vazio)
- `orderId` = (vazio)
- `itemId` = (vazio)
- `itemId2` = (vazio)

Estrutura sugerida da Collection (nomes das requests):

Menu

- `Menu - getAll` — GET {{base_url}}/menu
- `Menu - getById` — GET {{base_url}}/menu/{{itemId}}
- `Menu - create` — POST {{base_url}}/menu
- `Menu - update` — PUT {{base_url}}/menu/{{itemId}}
- `Menu - delete` — DELETE {{base_url}}/menu/{{itemId}}

User

- `User - getAll` — GET {{base_url}}/user
- `User - create` — POST {{base_url}}/user
- `User - getById` — GET {{base_url}}/user/{{userId}}
- `User - update` — PUT {{base_url}}/user/{{userId}}
- `User - delete` — DELETE {{base_url}}/user/{{userId}}

Orders

- `Order - getAll` — GET {{base_url}}/orders
- `Order - createWithItems` — POST {{base_url}}/orders/with-items (recomendado)
- `Order - create` — POST {{base_url}}/orders (fluxo antigo)
- `Order - getById` — GET {{base_url}}/orders/{{orderId}}
- `Order - update` — PUT {{base_url}}/orders/{{orderId}}
- `Order - delete` — DELETE {{base_url}}/orders/{{orderId}}

Order_Menu

- `OrderMenu - create` — POST {{base_url}}/order_menu
- `OrderMenu - getByKey` — GET {{base_url}}/order_menu/{{orderId}}/{{itemId}}

### Headers (quando usar)

- Para todas as requests que enviam JSON no corpo (POST/PUT) use:

  Key: Content-Type

  Value: application/json

  No Postman, se você selecionar Body → raw → JSON, ele já adiciona esse header automaticamente.

### Exemplos de corpo (copie/cole em Body → raw → JSON)

1. Criar usuário (POST /user)

```json
{
  "nickname": "ellen",
  "password": "ellenpass"
}
```

2. Criar pedido com items (POST /orders/with-items) — RECOMENDADO

```json
{
  "id_user": {{userId}},
  "status": "pending",
  "password_panel": "1234",
  "items": [
    { "id_item": {{itemId}}, "quantity": 2 },
    { "id_item": {{itemId2}}, "quantity": 1 }
  ]
}
```

3. Criar pedido (antigo, POST /orders) — precisa enviar total_cost

```json
{
  "id_user": 1,
  "status": "pending",
  "password_panel": "1234",
  "total_cost": 45.5
}
```

### Snippets de Tests para Postman (cole na aba Tests de cada request)

1. GET /menu — salva `itemId` e `itemId2`:

```javascript
pm.test("Status 200", () => pm.response.to.have.status(200));
const json = pm.response.json();
pm.test("Has items array", () => pm.expect(json.items).to.be.an("array"));
if (json.items && json.items.length > 0) {
  pm.environment.set("itemId", json.items[0].id_item);
  if (json.items.length > 1)
    pm.environment.set("itemId2", json.items[1].id_item);
}
```

2. GET /user — salva `userId`:

```javascript
pm.test("Status 200", () => pm.response.to.have.status(200));
const json = pm.response.json();
if (json.users && json.users.length > 0)
  pm.environment.set("userId", json.users[0].id_user);
```

3. POST /orders/with-items — salva `orderId` e valida total:

```javascript
pm.test("Status 201", () => pm.response.to.have.status(201));
const j = pm.response.json();
pm.expect(j).to.have.property("id_order");
pm.environment.set("orderId", j.id_order);
// validar total
if (j.items && j.items.length > 0) {
  let sum = 0;
  j.items.forEach((it) => {
    const price = it.menu?.cost ?? it.cost;
    sum += Number(price) * Number(it.quantity);
  });
  pm.test("Total calculado confere", () =>
    pm.expect(Number(j.total_cost)).to.eql(sum)
  );
}
```

> Dica: rode as requests na ordem: `Menu - getAll` → `User - getAll` (ou crie um user) → `Order - createWithItems` → `Order - getAll`.

---

## Troubleshooting (erros comuns)

- 400 Bad Request: campos obrigatórios faltando ou mal formatados. Verifique nomes exatos: `id_user`, `status`, `password_panel`, `total_cost` (quando usar POST /orders).
- 415 Unsupported Media Type: esqueceu o header `Content-Type: application/json` ou não escolheu `Body → raw → JSON`.
- 500 Internal Server Error: verifique o terminal onde o servidor está rodando (`npm run dev`) para a stack trace. Cole aqui que eu ajudo.
- PowerShell: se `npx`/`npm` falhar por política de execução, use `cmd.exe` ou `npm.cmd`.

---

## Boas práticas e próximos passos recomendados

- Não retorne hashes de senha em endpoints públicos (GET). Este projeto já remove senha em GETs, mas o POST /user retorna o objeto criado (contendo hash) — trate com cuidado.
- Se for usar em produção, troque SQLite por Postgres/MySQL e proteja `JWT_SECRET`.
- Implementar autenticação (login/JWT) e middleware para proteger endpoints sensíveis.
- Se quiser, eu posso gerar uma Collection do Postman com scripts de teste já embutidos — me avise.

---

Se precisar, eu posso:

- montar a collection exportável do Postman com os Tests inclusos, ou
- gerar scripts automatizados de teste (e.g., Newman) para rodar em CI.

Bom trabalho — me diz o que quer que eu faça a seguir.

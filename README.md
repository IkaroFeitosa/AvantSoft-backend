# AvantSoft Backend

Este projeto é um backend em Node.js + TypeScript usando Prisma ORM, Express e PostgreSQL/SQLite.

## Requisitos

- Node.js >= 18
- Banco de dados PostgreSQL ou SQLite

## Instalação

1. **Clone o repositório:**
   ```sh
   git clone <url-do-repo>
   cd AvantSoft-backend
   ```
2. **Instale as dependências:**
   ```sh
   npm install
   ```
3. **Configure o banco de dados:**
   - Edite o arquivo `.env` para definir a variável `DATABASE_URL` conforme seu banco (PostgreSQL ou SQLite).
   - Exemplo para SQLite:
     ```env
     DATABASE_URL="file:./dev.db"
     ```
   - Exemplo para PostgreSQL:
     ```env
     DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
     ```
4. **Gere o Prisma Client:**
   ```sh
   npx prisma generate
   ```
5. **Crie as tabelas no banco:**

   ```sh
   npm run prisma:push
   # ou, para PostgreSQL com migrações:
   npm run prisma:migrate
   ```

6. **Insira dados iniciais para teste:**
   Já existe um script de seed em `prisma/seed.ts` com dados iniciais.
   Para rodar o seed, basta executar:

```sh
npm run prisma:seed
```

Ou, se preferir, pode rodar diretamente:

```sh
npx ts-node prisma/seed.ts
```

Você também pode usar o Prisma Studio para visualizar e editar dados manualmente:

```sh
npx prisma studio
```

## Inicialização

Para rodar o servidor em modo desenvolvimento:

```sh
npm run dev
```

A API estará disponível em `http://localhost:8000` (ou porta definida no `.env`).

## Testes

```sh
npm run test
```

## Observações

- Use o Prisma Studio para visualizar e editar dados facilmente: `npx prisma studio`
- O projeto já está configurado para rodar com TypeScript e ts-node-dev.

---

Se tiver dúvidas, consulte os arquivos `.env` e `prisma/schema.prisma` para ajustar o banco conforme sua necessidade.

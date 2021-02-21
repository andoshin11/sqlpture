# sqlpture

**sqlpture** (`/ˈskʌlptʃə/`) is a type-level SQL parser & validator, inspired by [ts-sql](https://github.com/codemix/ts-sql).

```typescript
import { Query } from 'sqlpture'
import { DB } from './types/DB'

const query = 'SELECT name, email, age FROM customer;'
type result = Query<typeof query, DB> // Array<{ name: string, email: string | null, age: number }>
```

## Installation

```sh
yarn add -D sqlpture
```

## Getting Started
**:warning: You will need TypeScript 4.1 or higher**

1. Setup Database

2. Generate Type Definition for Your Relational Database
  - Reccomend to use [schemats](https://github.com/SweetIQ/schemats) to generate Table type intefaces for MySQL & Postgres
  - Your DB type definition should meet such structure, `type Database = { dialect: string; schema: Record<string, any> }`

3. Install [sqlpture](https://github.com/andoshin11/sqlpture)

## How to use in Real World ?

Check out the example repository!

https://github.com/andoshin11/sqlpture-example

There you can see...

- How I manage PostgreSQL DB
- How I do codegen TypeScript schema from actual DB
- How I call PostgreSQL query on Node.js application
- How I develop a type-safe Node.js API server

## TODO
- [ ] Query Result Type
  - [ ] Querying Data
    - [ ] `SELECT`
      - [x] `SELECT * FROM table_name`
      - [x] `SELECT select_list FROM table_name`
      - [x] `SELECT DISTINCT column_name FROM table_name`
      - [ ] (PostgreSQL) SELECT statement with expressions
      - [ ] `LENGTH()` function
    - [ ] Column Alias
      - [x] `SELECT column_name AS alias_name FROM table_name`
      - [x] `SELECT column_name alias_name FROM table_name`
      - [ ] Column Aliases that contain spaces
- [ ] Query Validator
  - [ ] `SELECT`
    - [ ] Column Aliases that contain spaces
    - [ ] `ORDER BY` clause
    - [ ] NULL check inside `ORDER BY` clause
    - [ ] `WHERE` clause
    - [ ] `LIMIT` clause
      - [ ] accepts `number | null` only
      - [ ] `OFFSET` clause
    - [ ] `FETCH` clause
  - [ ] `INSERT`
  - [ ] `UPDATE`
  - [ ] `DELETE`

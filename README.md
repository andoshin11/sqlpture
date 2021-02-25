# sqlpture

**sqlpture** (`/ˈskʌlptʃə/`) is a type-level SQL parser & validator, inspired by [ts-sql](https://github.com/codemix/ts-sql).

```typescript
import { Query } from 'sqlpture'
import { DB } from './types/DB'

const query = 'SELECT name, email, age FROM customer;'
type result = Query<typeof query, DB> // Array<{ name: string, email: string | null, age: number }>
```

![DEMO](https://user-images.githubusercontent.com/8381075/108982201-e27c3c80-76d0-11eb-8c40-9051bb6a24a7.gif)

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
      - [ ] `SUM()` function
      - [ ] `COUNT()` function
      - [ ] `HAVING` clause
    - [ ] Column Alias
      - [x] `SELECT column_name AS alias_name FROM table_name`
      - [x] `SELECT column_name alias_name FROM table_name`
      - [ ] Column Aliases that contain spaces
    - [ ] Join Tables
      - [x] INNER JOIN multiple tables
      - [x] field name from public table
      - [x] field name with table alias prefix
      - [x] SELF JOIN
      - [x] `USING`
      - [x] LEFT JOIN
      - [x] RIGHT JOIN
      - [ ] FULL OUTER JOIN
      - [ ] CROSS JOIN
      - [ ] NATURAL JOIN
    - [ ] GROUP BY
    - [ ] UNION
      - [ ] UNION ALL
    - [ ] INTERSECT
    - [ ] EXCEPT
  - [ ] Modifying Data
    - [ ] `INSERT`
      - [ ] Return Data
      - [ ] Insert multiple rows
- [ ] Query Validator
  - [ ] `SELECT`
    - [x] Field names
      - [x] Invalid filed names from public schema
      - [x] Invalid field names with table alias prefix
      - [x] Invalid field names with alias
    - [x] Join
      - [x] Invalid Join target table
      - [x] Invalid `ON` target fields
    - [ ] `ORDER BY` clause
      - [ ] Invalid field names
    - [x] `WHERE` clause
      - [x] Invalid field names
  - [ ] `INSERT`
    - [ ] Insert field names
    - [ ] Return field names
    - [ ] Check field value type
    - [ ] Insert multiple rows
  - [ ] `UPDATE`
  - [ ] `DELETE`

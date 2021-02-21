# sqlpture

sqlpture (ˈskʌlptʃə/) is a type-level SQL parser & validator, inspired by [ts-sql](https://github.com/codemix/ts-sql).

This is a SQL database implemented purely in TypeScript type annotations.  
This means that it operates solely on types - you define a "database"
(just a type annotation) and then query it using some more type annotations.

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

It supports a subset of SQL, including SELECT (with conditions and joins), INSERT, UPDATE and DELETE statements.

# [See the live demo]()

You can install ts-sql in your own project with `npm install @codemix/ts-sql` or
`yarn add @codemix/ts-sql` (TypeScript 4.1 is required).

An example query looks like this:

```typescript
import { Query } from "sqlpture";

const db = {
  things: [
    { id: 1, name: "a", active: true },
    { id: 2, name: "b", active: false },
    { id: 3, name: "c", active: true },
  ],
} as const;

type ActiveThings = Query<
  "SELECT id, name AS nom FROM things WHERE active = true",
  typeof db
>;

// ActiveThings is now equal to the following type:
type Expected = [{ id: 1; nom: "a" }, { id: 3; nom: "c" }];
```

[See the full demo on the TypeScript playground!]()

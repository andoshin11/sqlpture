import { Parse } from "./Parser";
import { Database } from "./Schema";
import { ValidateSelectStatement, ValidSelectStatement } from "./validator/select";
import { ValidateInsertStatement } from "./validator/insert";

export type ValidateQuery<
  T,
  DB extends Database
> = true extends ValidateSelectStatement<DB, Parse<T>>
  ? true
  : true extends ValidateInsertStatement<DB, Parse<T>>
  ? true
  : false;

export type ExperimentalValidQuery<DB extends Database, T extends ValidSelectStatement<DB>> = T

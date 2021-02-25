import { UnionizeValue } from "./Utils";

export type Database = {
  dialect: "postgres" | string;
  schema: Record<string, any>;
};

export type JoinedSchema<DB extends Database> = {
  public: object;
  joins: Record<string, UnionizeValue<DB["schema"]>>;
  from: {
    source: string;
    alias: string;
    schema: UnionizeValue<DB["schema"]>;
  };
};

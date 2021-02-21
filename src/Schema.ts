export type Database = {
  dialect: "postgres" | string;
  schema: Record<string, any>;
};

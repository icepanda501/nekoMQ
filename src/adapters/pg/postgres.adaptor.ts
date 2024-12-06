import pg from "pg";
import { Effect } from "effect";

export class PostgresqlDatabase implements DatabasePort {
  connect(): void {
    throw new Error("Method not implemented.");
  }
  disconnect(): void {
    throw new Error("Method not implemented.");
  }
  query(query: string) {
    throw new Error("Method not implemented.");
  }
}

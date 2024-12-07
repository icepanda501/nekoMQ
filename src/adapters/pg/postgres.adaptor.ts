import pg from "pg";
import { Effect, Schedule } from "effect";

export interface PostgresqlDatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  retry?: {
    times: number;
    exponential: number;
  };
}

export class PostgresqlDatabase implements DatabasePort {
  private config: PostgresqlDatabaseConfig;

  constructor(config: PostgresqlDatabaseConfig) {
    this.config = config;
  }

  connect(): Effect.Effect<pg.Client, unknown, never> {
    return Effect.tryPromise(() => {
      const client = new pg.Client({
        host: this.config.host,
        port: this.config.port,
        database: this.config.database,
        user: this.config.user,
        password: this.config.password,
      });
      return client.connect().then(() => client);
    }).pipe(
      Effect.tap(Effect.logDebug),
      Effect.tapError(Effect.logError),
      this.config?.retry == null
        ? Effect.tap(() => {})
        : Effect.retry({
            schedule: Schedule.exponential(1000),
            times: 3,
          }),
      Effect.mapError(() => new Error("FAILED_TO_CONNECT_TO_DATABASE")),
    );
  }
  disconnect(): void {
    throw new Error("Method not implemented.");
  }
  query(query: string) {
    throw new Error("Method not implemented.");
  }
}

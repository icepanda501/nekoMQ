import { Client as PgClient } from "pg";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { PostgresqlDatabase } from "./postgres.adaptor";
import { Effect } from "effect";

describe("PostgresqlDatabase", () => {
  let container: StartedPostgreSqlContainer;

  beforeAll(async () => {
    container = await new PostgreSqlContainer().withExposedPorts().start();
  });

  afterAll(async () => {
    await container.stop();
  });

  it("test container should works", async () => {
    const pgClient = new PgClient({
      host: container.getHost(),
      port: container.getPort(),
      database: container.getDatabase(),
      user: container.getUsername(),
      password: container.getPassword(),
    });
    await pgClient.connect();

    const result = await pgClient.query("SELECT 1 as one");
    expect(result.rows[0].one).toEqual(1);

    await pgClient.end();
  });

  it("should receive effect type postgresql error", async () => {
    const pdDb = new PostgresqlDatabase({
      host: "not-exist",
      port: 5432,
      database: "not-exist",
      user: "not-exist",
      password: "not-exist",
    })
      .connect()
      .pipe(Effect.runPromise);

    await expect(pdDb).rejects.toThrowError("FAILED_TO_CONNECT_TO_DATABASE");
  }, 15000);

  it("should connect to postgresql", async () => {
    const pgDb = new PostgresqlDatabase({
      host: container.getHost(),
      port: container.getPort(),
      database: container.getDatabase(),
      user: container.getUsername(),
      password: container.getPassword(),
    })
      .connect()
      .pipe(Effect.runPromise);

    await expect(pgDb).resolves.toBeInstanceOf(PgClient);
    await pgDb.then((client) => client.end());
  });
});

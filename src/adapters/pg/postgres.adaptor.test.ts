import { Client as PgClient } from "pg";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";

describe("example using testcontainer", () => {
  let container: StartedPostgreSqlContainer;
  let pgClient: PgClient;

  beforeAll(async () => {
    container = await new PostgreSqlContainer().withExposedPorts().start();

    pgClient = new PgClient({
      host: container.getHost(),
      port: container.getPort(),
      database: container.getDatabase(),
      user: container.getUsername(),
      password: container.getPassword(),
    });

    await pgClient.connect();
  });

  afterAll(async () => {
    await pgClient.end();
    await container.stop();
  });

  it("works", async () => {
    const result = await pgClient.query("SELECT 1 as one");
    expect(result.rows[0].one).toEqual(1);
  });
});

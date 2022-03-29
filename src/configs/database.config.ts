export function databaseConfig() {
  return {
    database: {
      username: 'neo4j',
      password: 'password',
      scheme: 'bolt',
      host: process.env.NEO4J_HOST,
      port: process.env.NEO4J_PORT,
    },
  };
}

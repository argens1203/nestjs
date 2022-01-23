import neo4j from 'neo4j-driver';
import { Injectable } from '@nestjs/common';

const URL = 'bolt://localhost:7687';
const user = 'neo4j';
const password = 'password';

@Injectable()
export class Neo4jService {
  constructor() {
    this.driver = neo4j.driver(URL, neo4j.auth.basic(user, password));
    this.session = this.driver.session();
  }

  driver: any;
  session: any;

  async put(name: string): Promise<string> {
    const session = this.driver.session();

    try {
      const result = await session.run(
        'CREATE (a:Person {name: $name}) RETURN a',
        { name },
      );

      const singleRecord = result.records[0];
      const node = singleRecord.get(0);

      console.log(node.properties.name);
      return node.properties.name;
    } catch (e) {
      console.error(e);
      return 'failed';
    } finally {
      await session.close();
      console.log('cleanup');
    }
  }

  async get(name: string): Promise<any> {
    const session = this.driver.session();

    try {
      const result = await session.run(
        'MATCH (a:Person {name: $name}) RETURN a',
        { name },
      );

      // const singleRecord = result.records[0];
      // const node = singleRecord.get(0);

      // console.log(node.properties.name);
      return result;
    } catch (e) {
      console.error(e);
      return 'failed';
    } finally {
      await session.close();
      console.log('cleanup');
    }
  }

  async test(): Promise<string> {
    const session = this.driver.session();
    const personName = 'Alice';

    try {
      const result = await session.run(
        'CREATE (a:Person {name: $name}) RETURN a',
        { name: personName },
      );

      const singleRecord = result.records[0];
      const node = singleRecord.get(0);

      console.log(node.properties.name);
      return node.properties.name;
    } catch (e) {
      console.error(e);
      return 'failed';
    } finally {
      await session.close();
      console.log('cleanup');
    }
  }

  cleanUp() {
    this.driver.close();
  }
}

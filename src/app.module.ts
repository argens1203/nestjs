import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jSandboxModule, Neo4jSandboxService } from './neo4j-sandbox';
import { Neo4jModule } from './neo4j';
import { NodeModule } from './node';
import { APP_FILTER } from '@nestjs/core';
import { Neo4jErrorFilter } from './neo4j/neo4j-error.filter';

@Module({
  imports: [
    Neo4jModule.forRoot({
      username: 'neo4j',
      password: 'password',
      scheme: 'bolt',
      host: 'localhost',
      port: '7687',
    }),
    Neo4jSandboxModule,
    NodeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Neo4jSandboxService,
    {
      provide: APP_FILTER,
      useClass: Neo4jErrorFilter,
    },
  ],
})
export class AppModule {}

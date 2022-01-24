import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jSandboxModule, Neo4jSandboxService } from './neo4j-sandbox';
import { Neo4jModule } from './neo4j';

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
  ],
  controllers: [AppController],
  providers: [AppService, Neo4jSandboxService],
})
export class AppModule {}

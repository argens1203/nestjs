import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jSandboxModule, Neo4jSandboxService } from './neo4j-sandbox';
import { Neo4jModule } from './neo4j';
import { NodeModule } from './node';
import { Neo4jErrorFilter } from './neo4j/neo4j-error.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local.neo4j',
    }),
    Neo4jModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        username: configService.get('NEO4J_USERNAME') || 'neo4j',
        password: configService.get('NEO4J_PASSWORD') || 'password',
        scheme: configService.get('NEO4J_SCHEME') || 'bolt', //was "bolt"
        host: configService.get('NEO4J_HOST'),
        port: +configService.get<number>('NEO4J_PORT'),
      }),
      inject: [ConfigService],
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

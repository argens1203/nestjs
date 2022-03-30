import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jSandboxModule, Neo4jSandboxService } from './neo4j-sandbox';
import { Neo4jModule } from './neo4j';
import { NodeModule } from './node';
import { Neo4jErrorFilter } from './neo4j/neo4j-error.filter';
import { databaseConfig } from 'src/configs/database.config';
import { RelatinoshipModule } from './relationship';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local.neo4j',
      load: [databaseConfig],
      isGlobal: true,
    }),
    Neo4jModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
    Neo4jSandboxModule,
    NodeModule,
    RelatinoshipModule,
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

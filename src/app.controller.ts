import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Neo4jSandboxService } from './neo4j-sandbox';
// import { Neo4jService } from './neo4j/neo4j.service';

class PutDbDto {
  name: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dbService: Neo4jSandboxService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('db-get/:name')
  async dbTest(@Param() params): Promise<string> {
    return await this.dbService.get(params.name);
  }

  @Post('db-put')
  async dbPut(@Body() putDbDto: PutDbDto): Promise<string> {
    return await this.dbService.put(putDbDto.name);
  }
}

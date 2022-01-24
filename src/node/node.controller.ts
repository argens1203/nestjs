import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NodeService } from './node.service';
import { CreateNodeDto } from './create-node.dto';
import { QueryResult } from 'neo4j-driver-core';

@Controller('node')
export class NodeController {
  constructor(private readonly nodeService: NodeService) {}

  @Post()
  async putNode(@Body() dto: CreateNodeDto): Promise<QueryResult> {
    return await this.nodeService.create(dto);
  }

  @Get(':title')
  async getNode(@Param() params): Promise<QueryResult> {
    return await this.nodeService.getByTitle(params.title);
  }

  @Get()
  async scanNode(): Promise<QueryResult> {
    return await this.nodeService.scan();
  }

  @Post('create-constraint')
  async addConstraint() {
    return await this.nodeService.addUniqueConstraint();
  }
}

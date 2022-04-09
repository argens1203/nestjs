import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreateNodeDto } from '../node/create-node.dto';
import { NodeService } from '../node/node.service';

@Controller('node')
export class NodeController {
  constructor(private readonly nodeService: NodeService) {}

  @Post()
  async putNode(@Body() dto: CreateNodeDto): Promise<any> {
    return await this.nodeService.create(dto);
  }

  @Get(':ref')
  async getNode(@Param() params): Promise<any[]> {
    return await this.nodeService.getByRef(params.ref);
  }

  @Get()
  async scanNode(): Promise<any[]> {
    return await this.nodeService.scan();
  }

  @Delete(':ref')
  async deleteNode(@Param() params): Promise<any> {
    return await this.nodeService.deleteByRef(params.ref);
  }
}

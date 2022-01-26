import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NodeService } from './node.service';
import { CreateNodeDto } from './create-node.dto';

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

  @Post('create-constraint')
  async addConstraint() {
    return await this.nodeService.addUniqueConstraint();
  }
}

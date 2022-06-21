import { NodeType } from '@argens1203/swap-model';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreateResponse } from '../../input/responses';
import { QueryResponse } from '../../input/responses/query-response.entity';
import { EntityNode } from '../../node';

import { CreateSketchDto } from './create-sketch.dto';
import { SketchService } from './sketch.service';

@Controller('sketch')
export class SketchController {
  constructor(private readonly sketchService: SketchService) {}

  @Post()
  async putNode(
    @Body() dto: CreateSketchDto,
  ): Promise<CreateResponse<EntityNode>> {
    return await this.sketchService.create(dto);
  }

  @Get(':ref')
  async getNode(@Param() params): Promise<QueryResponse<EntityNode>> {
    const data = await this.sketchService.getByRef(params.ref);
    return {
      success: true,
      data,
      nodeType: NodeType.ENTITY,
    };
  }

  @Get()
  async scanNode(): Promise<any[]> {
    return await this.sketchService.scan();
  }

  @Delete(':ref')
  async deleteNode(@Param() params): Promise<any> {
    return await this.sketchService.deleteByRef(params.ref);
  }
}

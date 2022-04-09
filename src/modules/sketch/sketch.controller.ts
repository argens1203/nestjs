import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreateSketchDto } from './create-sketch.dto';
import { SketchService } from './sketch.service';

@Controller('sketch')
export class SketchController {
  constructor(private readonly sketchService: SketchService) {}

  @Post()
  async putNode(@Body() dto: CreateSketchDto): Promise<any> {
    return await this.sketchService.create(dto);
  }

  @Get(':ref')
  async getNode(@Param() params): Promise<any[]> {
    return await this.sketchService.getByRef(params.ref);
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

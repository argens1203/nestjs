import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DebugService } from './debug.service';

@Controller('debug')
export class DebugController {
  constructor(private readonly debugService: DebugService) {}

  @Get()
  async scanAll(): Promise<any> {
    return await this.debugService.scanAll();
  }

  @Post('delete-all')
  async deleteAll(): Promise<any> {
    return await this.debugService.deleteAll();
  }

  @Post('query')
  async query(@Body() qs): Promise<any> {
    return await this.debugService.query(qs.query);
  }
}

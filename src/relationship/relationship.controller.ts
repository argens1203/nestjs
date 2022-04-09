import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { RelationshipService } from './relationship.service';

@Controller('relationship')
export class RelationshipController {
  constructor(private readonly relationshipService: RelationshipService) {}

  @Post()
  async putNode(@Body() dto): Promise<any> {
    return await this.relationshipService.create(dto);
  }

  @Get(':ref')
  async getNode(@Param() params): Promise<any[]> {
    return await this.relationshipService.getByRef(params.ref);
  }
}

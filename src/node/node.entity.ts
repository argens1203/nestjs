import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { NodeType } from './types/node-type.enum';

export class NodeEntity {
  @IsEnum(NodeType)
  @ApiProperty()
  type: NodeType;

  @IsString()
  @ApiProperty()
  data: string;

  // TODO
  // @IsObject()
  // @IsOptional()
  // presenetationConfig?: PresentationConfig = {};

  @IsString()
  @IsOptional()
  @ApiProperty()
  preferredPresentation?: string;

  @IsString()
  @ApiProperty()
  ref: string;
}

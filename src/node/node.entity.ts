import { IsEnum, IsOptional, IsString } from 'class-validator';

import { NodeType } from './types/node-type.enum';

export class NodeEntity {
  @IsEnum(NodeType)
  type: NodeType;

  @IsString()
  data: string;

  // TODO
  // @IsObject()
  // @IsOptional()
  // presenetationConfig?: PresentationConfig = {};

  @IsString()
  @IsOptional()
  preferredPresentation?: string;

  @IsString()
  ref: string;
}

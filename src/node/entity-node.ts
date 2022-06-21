import { IEntityNode, NodeType, DataType } from '@argens1203/swap-model';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { Node } from '../input/entities/base.entity';

export class EntityNode extends Node implements IEntityNode {
  nodeType: NodeType = NodeType.ENTITY;

  @IsEnum(DataType)
  type: DataType;

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

import { EntityType, INodeEntity, NodeType } from '@argens1203/swap-model';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { Entity } from '../input/entities/base.entity';

export class NodeEntity extends Entity implements INodeEntity {
  entityType: EntityType.NODE = EntityType.NODE;

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

import {
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { PresentationConfig } from './types';
import { NodeType } from './types/node-type.enum';

export class NodeEntity {
  @IsEnum(NodeType)
  type: NodeType;

  @IsString()
  data: string;

  @IsObject()
  @IsOptional()
  presenetationConfig?: PresentationConfig = {};

  @IsString()
  @IsOptional()
  preferredPresentation?: string;

  @IsString()
  ref: string;
}

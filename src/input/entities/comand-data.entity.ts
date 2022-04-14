import { IsEnum, IsString, ValidateIf } from 'class-validator';

import { CreateNodeDto } from '../../node/create-node.dto';
import { NodeType } from '../../node/types';

export class CommandData {
  @IsEnum(NodeType)
  @ValidateIf((o) => !o.ref)
  type: NodeType;

  @IsString()
  @ValidateIf((o) => !o.ref)
  data?: string;

  @IsString()
  @ValidateIf((o) => !o.data)
  ref?: string;

  toCreateNodeDto(): CreateNodeDto {
    return {
      type: this.type,
      data: this.data,
    };
  }
}

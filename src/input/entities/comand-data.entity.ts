import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, ValidateIf } from 'class-validator';

import { CreateNodeDto } from '../../node/create-node.dto';
import { NodeType } from '../../node/types';

export class CommandData {
  @IsEnum(NodeType)
  @ValidateIf((o) => !o.ref)
  @ApiProperty()
  type: NodeType;

  @IsString()
  @ValidateIf((o) => !o.ref)
  @ApiProperty()
  data?: string;

  @IsString()
  @ValidateIf((o) => !o.data)
  @ApiProperty()
  ref?: string;

  toCreateNodeDto(): CreateNodeDto {
    return {
      type: this.type,
      data: this.data,
    };
  }
}

import { IDeleteResponse, INode, Resolution } from '@argens1203/swap-model';
import { Type } from 'class-transformer';
import { IsEnum, ValidateNested } from 'class-validator';

import { RefObject } from './ref-response.entity';
import { Response } from './response.entity';

export class DeleteResponse<T extends INode>
  extends Response
  implements IDeleteResponse<T>
{
  @IsEnum(Resolution)
  resolution: Resolution;

  @ValidateNested()
  @Type(() => RefObject)
  data: {
    ref: T['ref'];
  };
}

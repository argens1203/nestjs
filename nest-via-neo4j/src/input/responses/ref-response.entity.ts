import { INode } from '@argens1203/swap-model';
import { IsString } from 'class-validator';

// FIXME: probably doesn't work
export class RefObject<T extends INode> {
  @IsString()
  ref: T['ref'];
}

import { RequestRef, IResponse, NodeType } from '@argens1203/swap-model';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class Response implements IResponse {
  @IsBoolean()
  success: boolean;

  @IsString()
  @IsOptional()
  ref?: RequestRef;

  @IsEnum(NodeType)
  nodeType: NodeType;
}

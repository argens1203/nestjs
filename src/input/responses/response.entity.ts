import { RequestRef, IResponse } from '@argens1203/swap-model';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class Response implements IResponse {
  @IsBoolean()
  success: boolean;

  @IsString()
  @IsOptional()
  ref?: RequestRef;
}

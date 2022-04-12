import { Module } from '@nestjs/common';

import { NodeModule } from '../node';

import { InputController } from './input.controller';
import { InputService } from './input.service';

@Module({
  controllers: [InputController],
  imports: [NodeModule],
  providers: [InputService],
})
export class InputModule {}

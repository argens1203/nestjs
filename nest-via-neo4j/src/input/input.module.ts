import { Module } from '@nestjs/common';

import { NodeModule } from '../node';

import { NodeCommandHandler } from './handlers';
import { InputController } from './input.controller';
import { InputService } from './input.service';

@Module({
  controllers: [InputController],
  imports: [NodeModule],
  providers: [InputService, NodeCommandHandler],
})
export class InputModule {}

import { Body, Controller, ParseArrayPipe, Post } from '@nestjs/common';

import { EntityNode } from '../node';

import { Command } from './commands';
import { InputService } from './input.service';

@Controller('command')
export class InputController {
  constructor(private readonly inputService: InputService) {}

  @Post()
  async command(
    @Body(
      new ParseArrayPipe({
        items: Command,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    commands: Command<EntityNode>[],
  ): Promise<any> {
    const res = await this.inputService.handleCommands(commands);
    console.log(res);
    return res;
  }
}

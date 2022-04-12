import { Body, Controller, ParseArrayPipe, Post } from '@nestjs/common';

import { Command } from './command.entity';
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
    commands: Command[],
  ): Promise<any> {
    return await this.inputService.handleCommands(commands);
  }
}

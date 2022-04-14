import { Body, Controller, ParseArrayPipe, Post } from '@nestjs/common';

import { Command } from './entities';
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
    const res = await this.inputService.handleCommands(commands);
    console.log(res);
    return res;
  }
}

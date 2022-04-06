import { Module } from '@nestjs/common';
import { NodeModule } from 'src/node';
import { SketchController } from './sketch.controller';
import { SketchService } from './sketch.service';

@Module({
  controllers: [SketchController],
  imports: [NodeModule],
  providers: [SketchService],
})
export class SketchModule {}

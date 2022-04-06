import { PickType } from '@nestjs/swagger';
import { NodeEntity } from 'src/node/node.entity';

export class CreateSketchDto extends PickType(NodeEntity, ['data']) {}

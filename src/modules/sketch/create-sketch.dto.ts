import { PickType } from '@nestjs/swagger';

import { NodeEntity } from '../../node/node.entity';

export class CreateSketchDto extends PickType(NodeEntity, ['data']) {}

import { PickType } from '@nestjs/swagger';

import { EntityNode } from '../../node/entity-node';

export class CreateSketchDto extends PickType(EntityNode, ['data']) {}

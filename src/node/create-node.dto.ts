import { OmitType } from '@nestjs/swagger';

import { EntityNode } from './entity-node';

export class CreateNodeDto extends OmitType(EntityNode, ['ref']) {
  constructor(input: Partial<CreateNodeDto> = {}) {
    super(input);
    Object.assign(this, input);
  }
}

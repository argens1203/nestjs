import { OmitType } from '@nestjs/swagger';

import { NodeEntity } from './node.entity';

export class CreateNodeDto extends OmitType(NodeEntity, ['ref']) {
  constructor(input: Partial<CreateNodeDto> = {}) {
    super(input);
    Object.assign(this, input);
  }
}

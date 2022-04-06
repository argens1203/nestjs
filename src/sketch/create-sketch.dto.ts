import { OmitType } from '@nestjs/swagger';
import { NodeEntity } from 'src/node/node.entity';

export class CreateSketchDto extends OmitType(NodeEntity, ['ref', 'type']) {}

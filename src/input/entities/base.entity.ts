import { EntityType, IEntity } from '@argens1203/swap-model';

export abstract class Entity implements IEntity {
  entityType: EntityType;

  ref: any;
}

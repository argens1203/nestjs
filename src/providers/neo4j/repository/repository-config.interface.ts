export interface RepositoryConfig {
  type: string;
  key: string;
}

export type RepositoryConfigInput = Pick<RepositoryConfig, 'type'>;

export const DefaultConfig: Omit<RepositoryConfig, 'type'> = {
  key: 'ref',
};

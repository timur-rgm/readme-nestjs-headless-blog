export type EntityIdType = string;

export interface Entity<T extends EntityIdType> {
  id?: T;
  convertToObject(): Record<string, unknown>;
}

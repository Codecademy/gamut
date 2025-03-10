export type DistributiveOmit<T, K extends keyof Entity> = T extends Entity
  ? Omit<T, K>
  : never;

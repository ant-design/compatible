export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const tuple = <T extends string[]>(...args: T) => args;

export const createOptionStore = <T extends Record<string, any>>(
  options: T
): { [K in keyof T]: T[K] } => {
  return Object.keys(options).reduce(
    (store, key) => ({ ...store, [key]: [] }),
    {} as { [K in keyof T]: T[K] }
  );
};

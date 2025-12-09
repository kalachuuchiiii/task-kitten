export const getChangesInValue = <T extends object>(
  oldValues: T,
  newValues: T
) => {
  const keys = Object.keys(oldValues);
  let changes: Record<string, T[keyof T][]> = {};

  for (const key of keys) {
    const oldVal = oldValues[key as keyof T];
    const newVal = newValues[key as keyof T];
    if (oldVal === newVal) continue;

    changes[key] = [oldVal, newVal];
    continue;
  }
};

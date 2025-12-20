export const toDate =
  ({ excludeTime }: { excludeTime: boolean } = { excludeTime: false}) =>
  (val: string | Date) => {
    const value =
      typeof val === "string"
        ? new Date(val)
        : val instanceof Date
        ? val
        : undefined;
       
    if (!value || Number.isNaN(value.getTime())) {
      return undefined;
    }
    
    if (excludeTime) {
      value.setHours(0, 0, 0, 0);
    }
    
    return value;
  };

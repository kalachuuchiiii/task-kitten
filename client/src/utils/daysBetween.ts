export const daysBetween = (start: Date, end: Date) => {
  return Math.max(1, Math.floor(
    (new Date(end).getTime() - new Date(start).getTime()) / 86400000
  ))
};

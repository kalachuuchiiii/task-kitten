export const regexSelelector = (type: "email" | "all" | "alphanumeric" = 'all') => {
  const regexMap: Record<typeof type, RegExp> = {
    alphanumeric: /^[a-zA-Z0-9]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    all: /.*/
  };

  return regexMap[type];
};

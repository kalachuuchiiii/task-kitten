
  export const isAlphanumeric = (text: string): boolean => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(text);
  }
export const isEmail = (text: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(text);
}

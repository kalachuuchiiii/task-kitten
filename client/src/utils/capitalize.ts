

export const capitalize = (str: string) => {
  const firstLetter = str[0].toUpperCase();
  const rest = str.substring(1, str.length)
  return`${firstLetter}${rest}`.replace('_', ' ')
}
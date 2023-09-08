export const sanitizeJsonInput = (input: string): string => {
  let sanitized = input.replace(/,\s*([\]}])/g, "$1");
  return sanitized;
};

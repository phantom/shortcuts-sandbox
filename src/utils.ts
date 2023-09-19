export const sanitizeJsonInput = (input: string): string => {
  let sanitized = input.replace(/,\s*([\]}])/g, "$1");

  // Add missing quotes around property names
  sanitized = sanitized.replace(/([{,]\s*)([a-zA-Z0-9_$]+)(\s*:)/g, '$1"$2"$3');

  return sanitized;
};

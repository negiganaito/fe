export function testID(value, require = true) {
  return require && value != null
    ? {
        'data-testid': value,
      }
    : undefined;
}

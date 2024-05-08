export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function clampStyle(value, min, max) {
  const parsedValue = parseInt(value, 10);
  return parsedValue === '' || isNaN(parsedValue)
    ? value
    : `${clamp(parsedValue, min, max)}px`;
}

export function convertScale(value, scale1, scale2) {
  if (!scale1 || !scale2) {
    return 0;
  }

  return (value * scale2) / scale1;
}

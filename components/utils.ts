export function calculateIncrease(startingValue: number, finalValue: number) {
  if (startingValue === 0) return finalValue;
  const value = ((finalValue - startingValue) / startingValue) * 100;
  return Math.round(value * 10) / 10;
}

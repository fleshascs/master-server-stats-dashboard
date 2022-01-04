export function calculateIncrease(startingValue: number, finalValue: number) {
  const value = ((finalValue - startingValue) / startingValue) * 100;
  return Math.round(value * 10) / 10;
}

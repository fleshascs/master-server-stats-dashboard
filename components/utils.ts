export function calculateIncrease(startingValue: number, finalValue: number) {
  startingValue += 1;
  finalValue += 1;
  const value = ((finalValue - startingValue) / startingValue) * 100;
  return Math.round(value * 10) / 10;
}

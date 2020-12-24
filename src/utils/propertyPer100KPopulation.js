export default function propertyPer100kPopulation(a, b) {
  if (b === 0) {
    return 0;
  }
  return ((a / b) * 100000).toFixed(1);
}

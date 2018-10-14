if (x instanceof A || x instanceof B) {
  'Aish or Bish';
} else if (x === 3) {
  3;
} else if (x > 4) {
  4;
} else if (x <= 5) {
  5;
} else if (x !== 6) {
  6;
} else if (x.isMethod()) {
  "is method";
} else if (isPredicate(x) || x === 3) {
  "isPredicate or 3";
}
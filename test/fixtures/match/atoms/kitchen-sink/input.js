match x:
  | instanceof A, instanceof B: 'Aish or Bish'
  | == 3: 3
  | > 4: 4
  | <= 5: 5
  | != 6: 6
  | .isMethod(): "is method"
  | ~isPredicate(), 3: "isPredicate or 3"

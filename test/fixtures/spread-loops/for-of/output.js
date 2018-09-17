f((() => {
  const _arr = [];

  for (const x of fizzBuzzGen()) _arr.push(x);

  return _arr;
})());
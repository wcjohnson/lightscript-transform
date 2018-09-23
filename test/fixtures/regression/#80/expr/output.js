f((() => {
  try {
    return a;
  } catch (_err2) {
    try {
      return b;
    } catch (_err) {
      return c;
    }
  }
})());
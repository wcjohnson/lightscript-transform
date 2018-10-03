function f() {
  try {
    return something();
  } catch (_err) {
    return _err;
  }
}
async function fn() {
  try {
    return await fetch();
  } catch (_err) {
    return _err;
  }
}
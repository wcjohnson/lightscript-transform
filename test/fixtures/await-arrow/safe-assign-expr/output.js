async function fn() {
  let x;

  try {
    x = await fetch();
  } catch (_err) {
    x = _err;
  }

  return x + 1;
}
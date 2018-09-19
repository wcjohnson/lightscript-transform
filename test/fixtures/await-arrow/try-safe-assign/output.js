async function fn() {
  let _val;

  try {
    _val = await fetch();
  } catch (_err) {
    _val = _err;
  }

  const x = _val;
  return x + 1;
}
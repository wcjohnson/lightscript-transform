async function f() {
  let _val, _err;

  try {
    _val = await g();
  } catch (_err2) {
    _err = _err2;
  }

  const [result, err] = [_val, _err];
  return [result, err];
}
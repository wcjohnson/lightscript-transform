async function f() {
  let result, err;

  try {
    result = await g();
  } catch (_err) {
    err = _err;
  }

  if (result) return result;
}
async function f() {
  let result, err;

  try {
    [result, err] = [await g(), void 0];
  } catch (_err) {
    [result, err] = [void 0, _err];
  }

  if (result) return result;
}
async function fn() {
  let x;

  if (isError(x = await (async () => {
    try {
      return await fetch();
    } catch (_err) {
      return _err;
    }
  })())) {
    return null;
  }

  return x;
}

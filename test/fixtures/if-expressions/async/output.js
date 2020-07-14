async function f() {
  const x = y ? await (async () => {
    const z = await g();
    return z;
  })() : void 0;
  return x;
}
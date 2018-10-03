function f() {
  try {
    return something();
  } catch (_err) {
    return _err;
  }
}

let _val;

try {
  _val = a();
} catch (_err3) {
  try {
    _val = b();
  } catch (_err2) {
    _val = _err2;
  }
}

const x = _val;
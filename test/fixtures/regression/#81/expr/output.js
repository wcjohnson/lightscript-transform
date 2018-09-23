let _val;

try {
  _val = a;
} catch (_err2) {
  try {
    _val = b;
  } catch (_err) {
    _val = _err;
  }
}

const x = _val;
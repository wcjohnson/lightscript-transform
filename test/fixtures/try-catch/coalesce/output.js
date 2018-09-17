import _isMatch from "@lightscript/runtime/isMatch";

const x = (_it => {
  if (_isMatch(Result, _it)) {
    const result = _it;
    return result;
  } else if (_isMatch(RetriableError, _it)) {
    return retry(15);
  } else if (_isMatch(Error, _it)) {
    const err = _it;
    throw err;
  }
})((() => {
  try {
    return f();
  } catch (_err) {
    return _err;
  }
})());
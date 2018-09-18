const _hasProps = require("@lightscript/runtime/hasProps");

const _hasLength = require("@lightscript/runtime/hasLength");

if (_hasProps(x, "a", "aa") && _hasLength(x.aa, 2) && _hasProps(x.aa[1])) {
  const {
    a,
    aa: [b, {
      c = 1
    }, ...d]
  } = x;
  d.concat(a + b + c);
}
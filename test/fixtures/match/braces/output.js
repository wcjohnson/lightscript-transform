const _hasProps = require("@lightscript/runtime/hasProps");

if (x === 1) {
  true;
} else if (test(x) && _hasProps(x, "x")) {
  const {
    x
  } = x;
  ({
    x
  });
} else {
  false;
}
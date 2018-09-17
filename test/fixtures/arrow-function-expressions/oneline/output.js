(function () {
  return 1;
});

(function () {
  return 1;
});

() => {
  for (let _i = 0, _keys = Object.keys(obj), _len = _keys.length; _i < _len; _i++) {
    const k = _keys[_i];
    f(k);
  }
};

() => thrownew Error();

(() => thrownew Error())();

const f = () => thrownew Error();

;
f();

(function () {
  return 1;
});

func();

() => {
  for (let _i2 = 0, _keys2 = Object.keys(obj), _len2 = _keys2.length; _i2 < _len2; _i2++) {
    const k = _keys2[_i2];
    f(k);
  }
};

func();
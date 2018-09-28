let _val;

try {
  class C extends D {
    f() {
      return 1;
    }

  }

  _val = C;
} catch (err) {
  _val = class {
    g() {
      return 1;
    }

  };
}

const x = _val;
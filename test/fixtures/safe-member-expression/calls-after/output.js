var _ref, _ref2, _ref3;

a?.b();
a?.b()?.c().d.e();
a?.b().c?.d().e.f();
(_ref = a?.b) != null ? c(_ref) : void 0;
(_ref2 = (_ref3 = a?.b) != null ? c(_ref3) : void 0?.d) != null ? e(_ref2) : void 0;
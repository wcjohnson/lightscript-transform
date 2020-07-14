class A {
  constructor() {
    this.f = this.f.bind(this);
  }

  *f() {
    yield this;
  }

}
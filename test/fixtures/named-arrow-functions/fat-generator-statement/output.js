function* fn() {
  yield this;
}

fn = fn.bind(this)
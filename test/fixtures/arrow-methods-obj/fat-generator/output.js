const o = {
  f: function* () {
    yield this;
  }.bind(this)
};
const o = {
  f: function* () {
    return yield this;
  }.bind(this)
};
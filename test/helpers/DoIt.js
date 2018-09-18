'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _vm = require('vm');

var _vm2 = _interopRequireDefault(_vm);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _TestRunner = require('./TestRunner');

var _TestFilter = require('./TestFilter');

var _core = require('@babel/core');

var _lib = require('../../lib');

var _lib2 = _interopRequireDefault(_lib);

var _jestDiff = require('jest-diff');

var _jestDiff2 = _interopRequireDefault(_jestDiff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testContext = _vm2.default.createContext({
  assert: _assert2.default
});
testContext.global = testContext;

function runExecCode(code) {
  const filename = "exec.js";
  const dirname = ".";
  const mod = { id: filename, exports: {} };
  const req = function (x) {
    return require(x);
  };const src = `(function(exports, require, module, __filename, __dirname, opts) {${code}\n});`;
  return _vm2.default.runInContext(src, testContext)(mod.exports, req, mod, filename, dirname, {});
}function fixPlugins(opts) {
  if (opts.plugins) {
    for (let _arr = opts.plugins, i = 0, _len = _arr.length; i < _len; i++) {
      const e = _arr[i];
      if (e === "@lightscript/transform") {
        opts.plugins[i] = _lib2.default;
      } else if (Array.isArray(e) && e[0] === "@lightscript/transform") {
        opts.plugins[i][0] = _lib2.default;
      }
    }
  }
}let CompilerTestOptions = class CompilerTestOptions extends _TestRunner.TestOptions {
  inherits(other) {
    if (!other) return;
    for (let _i = 0, _keys = Object.keys(other), _len2 = _keys.length; _i < _len2; _i++) {
      const k = _keys[_i];const v = other[k];
      if (k === 'throws') {
        null;
      } else {
        this[k] = v;
      }
    }
  }
};
let CompilerTestable = class CompilerTestable extends _TestRunner.Testable {
  loadTest() {
    this.loadTestData();
    this.enqueueTest();
  }readTestOptions() {
    const optionsData = this.readLocalArtifact("options.json", false);
    const options = optionsData ? JSON.parse(optionsData) : {};
    // Allow test options to be overridden
    const overrideData = this.readLocalArtifact("options.override.json", false);
    if (overrideData) {
      Object.assign(options, JSON.parse(overrideData));
    }return options;
  }loadTestData() {
    if (this.name && this.name[0] === '.') {
      this.disabled = true;
      return;
    }const options = this.readTestOptions();
    if (options) this.options.assign(options);
    fixPlugins(this.options);
    //console.log("Test options:", this.title, this.options)

    this.actual = this.readLocalArtifact("input", ['.js', '.lsc']);
    this.expected = this.readLocalArtifact("output", ['.override.js', '.js']);
    this.exec = this.readLocalArtifact("exec", ['.js', '.lsc']);

    // Use parent input if no child input.
    if (!this.actual && this.parent && this.parent.actual) {
      if (!this.expected) this.expected = this.parent.expected;
      this.actual = this.parent.actual;
    }
  }enqueueTest() {
    if (this.disabled) {
      if (typeof it !== 'undefined') {
        it.skip(this.title, () => this.runTest());
      } else {
        console.log("Skipped test:", this.title);
      }
    } else if (this.actual) {
      if (typeof it !== 'undefined') {
        it(this.title, () => this.runTest());
      } else {
        console.log("Ran test:", this.title);
      }
    } else if (this.exec) {
      if (typeof it !== 'undefined') {
        it(this.title, () => this.runExecTest());
      }
    } else {
      // console.log("skipping (no input)", this.title)
      return;
    }
  }throwAnnotatedError(err) {
    // Unnecessary because jest is good
    // err.message = this.title + ": " + err.message
    throw err;
  }runExecTest() {
    if (this.exec) {
      let execCode = this.exec;
      try {
        ({ code: execCode } = (0, _core.transformSync)(this.exec, this.options));
        runExecCode(execCode);
      } catch (err) {
        this.throwAnnotatedError(new Error(`Exec '${execCode}' failed: ${err}`));
      }
    }
  }runTest() {
    this.runExecTest();
    let code, map, realOpts;
    try {
      if (this.options.throws) {
        realOpts = Object.assign({}, this.options);
        delete realOpts.throws;
      } else {
        realOpts = this.options;
      }({ code, map } = (0, _core.transformSync)(this.actual, realOpts));
    } catch (err) {
      if (this.options.throws) {
        if (err.message.indexOf(this.options.throws) > -1) {
          return;
        } else if (process.env.SAVE_THROWS) {
          this.saveThrows(err);
          this.throwAnnotatedError(err);
        } else if (process.env.DUPLICATE_ON_FAILURE) {
          this.saveErrorOverride(this.options.throws);
          this.throwAnnotatedError(err);
        } else if (process.env.OVERRIDE_ON_FAILURE) {
          this.saveErrorOverride(err.message);
          this.throwAnnotatedError(err);
        } else {
          err.message = `Expected error message: '${this.options.throws}'. Got error message: '${err.message}'`;
          this.throwAnnotatedError(err);
        }
      } else if (!this.expected && process.env.SAVE_THROWS) {
        this.saveThrows(err);
      }this.throwAnnotatedError(err);
    }

    if (this.options.throws) {
      this.throwAnnotatedError(new Error(`Expected error message '${this.options.throws}' but no error was thrown.`));
    }code = code.trim();

    if ((!this.expected || process.env.FORCE_SAVE) && !this.options.throws && process.env.SAVE_EXPECTED) {
      this.saveExpected(code, "output.js");
      return;
    }if (this.options.throws) {
      this.throwAnnotatedError(new Error("Expected error message: " + this.options.throws + ". But test succeeded."));
    } else {
      if (this.expected) {
        if (code !== this.expected) {
          this.mismatchExpected(this.expected, code);
        } else {
          return undefined;
        }
      } // Test succeeded
      else {
          this.throwAnnotatedError(new Error("Empty expected output -- use SAVE_EXPECTED=1 to create expected output."));
        }
    }
  }mismatchExpected(expected, received) {
    const diffString = (0, _jestDiff2.default)(expected, received, { expand: false });
    if (process.env.OVERRIDE_ON_FAILURE || process.env.SAVE_OVERRIDE) {
      this.saveExpected(received, "output.override.js");
      return;
    } else if (process.env.DUPLICATE_ON_FAILURE) {
      this.saveExpected(expected, "output.override.js");
    } else if (process.env.UPDATE_EXPECTED) {
      this.saveExpected(received, "output.js");
      return;
    }return this.throwAnnotatedError(new Error("Mismatch against expected output: " + diffString));
  }saveExpected(expected, filename) {
    this.saveLocalArtifact(filename, expected);
  }saveErrorOverride(throws) {
    return this.saveLocalArtifact("options.override.json", JSON.stringify({ throws }));
  }saveThrows(err) {
    const opts = this.readTestOptions() || {};
    opts.throws = err.message;
    this.saveLocalArtifact("options.json", JSON.stringify(opts, null, "  "));
  }
};
const run = new _TestRunner.TestRun();
run.getTestableConstructor = function getTestableConstructor() {
  return CompilerTestable;
};run.getOptionsConstructor = function getOptionsConstructor() {
  return CompilerTestOptions;
};run.extensions = ['.js', '.lsc', '.lsx'];

const filter = new _TestFilter.TestFilter();
if (process.env.ONLY) {
  filter.only(process.env.ONLY);
}const rootTestable = new CompilerTestable(run, null, filter);
rootTestable.setTestPath(_path2.default.join(__dirname, '../fixtures'));
rootTestable.readTestDirectory();
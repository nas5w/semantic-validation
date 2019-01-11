function shouldContain(validator, addRule) {
  validator.prototype.shouldContain = function(text, caseSensitive = true) {
    let test = function(input) {
      if (!caseSensitive) {
        return input.toLowerCase().includes(text.toLowerCase());
      }

      return input.includes(text);
    };

    addRule(this, test, `should contain ${text}`);
    return this;
  };
}

module.exports = shouldContain;

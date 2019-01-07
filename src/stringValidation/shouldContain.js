const shouldContain = function(text, caseSensitive = true) {
  let test = function(input) {
    if (!caseSensitive) {
      return input.toLowerCase().includes(text.toLowerCase());
    }

    return input.includes(text);
  };

  return this.addRule(test, `should contain ${text}`);
};

module.exports = shouldContain;

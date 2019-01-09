function shouldContain(SemanticValidator, addRule) {
  /**
   * Add a rule that the selected property should contain some text
   * @param {string} text the text that the specified property string should contain
   * @param {boolean} [caseSensitive = true] whether or not the text match should be case sensitive
   * @returns {Object} the validator object
   */
  SemanticValidator.prototype.shouldContain = function(
    text,
    caseSensitive = true
  ) {
    let test = function(input) {
      if (!caseSensitive) {
        return input.toLowerCase().includes(text.toLowerCase());
      }

      return input.includes(text);
    };

    addRule(test, `should contain ${text}`);
    return this;
  };
}

module.exports = shouldContain;

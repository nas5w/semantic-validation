'use strict';

const SemanticValidator = (() => {
  const tests = [require('./stringValidation/shouldContain')];

  const addRule = (validator, test, message) => {
    validator.validationRules.push({
      prop: validator.currentProp,
      message: `${validator.currentProp} ${message}`,
      test
    });
  };

  function SemanticValidator() {
    this.errors = [];
    this.validationRules = [];
    this.currentProp = null;
  }

  // Core methods
  SemanticValidator.prototype.selectProp = function(prop) {
    this.currentProp = prop;
    return this;
  };

  SemanticValidator.prototype.message = function(errorMessage) {
    this.validationRules[
      this.validationRules.length - 1
    ].message = errorMessage;
    return this;
  };

  SemanticValidator.prototype.validate = function(obj) {
    this.validationRules.forEach(rule => {
      if (!rule.test(obj[rule.prop])) {
        this.errors.push(rule.message);
      }
    });

    return {
      valid: !this.errors.length,
      errors: this.errors
    };
  };

  tests.forEach(test => {
    test(SemanticValidator, addRule);
  });

  return SemanticValidator;
})();

module.exports = SemanticValidator;

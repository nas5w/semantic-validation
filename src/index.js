'use strict';

const tests = [require('./stringValidation/shouldContain')];

const SemanticValidator = (function() {
  let errors;
  let validationRules;
  let currentProp;

  function addRule(test, message) {
    validationRules.push({
      prop: currentProp,
      message: `${currentProp} ${message}`,
      test
    });
  }

  function SemanticValidator() {
    errors = [];
    validationRules = [];
    currentProp = null;
  }

  tests.forEach(test => {
    test(SemanticValidator, addRule);
  });

  SemanticValidator.prototype.selectProp = function(prop) {
    currentProp = prop;
    return this;
  };

  SemanticValidator.prototype.message = function(errorMessage) {
    validationRules[validationRules.length - 1].message = errorMessage;
    return this;
  };

  SemanticValidator.prototype.validate = function(obj) {
    validationRules.forEach(rule => {
      if (!rule.test(obj[rule.prop])) {
        errors.push(rule.message);
      }
    });

    return {
      valid: !errors.length,
      errors: errors
    };
  };

  return SemanticValidator;
})();

module.exports = SemanticValidator;

'use strict';

const shouldContain = require('./stringValidation/shouldContain');

const SemanticValidator = (function() {
  let errors = [];
  let validationRules = [];
  let currentProp = null;

  function SemanticValidator() {
    this.shouldContain = shouldContain.bind(this);
  }

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

  SemanticValidator.prototype.addRule = function(test, message) {
    validationRules.push({
      prop: currentProp,
      message: `${currentProp} ${message}`,
      test
    });

    return this;
  };

  return SemanticValidator;
})();

module.exports = SemanticValidator;

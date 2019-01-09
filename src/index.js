'use strict';

const tests = [require('./stringValidation/shouldContain')];

let errors;
let validationRules;
let currentProp;

const SemanticValidator = (function() {
  function addRule(test, message) {
    validationRules.push({
      prop: currentProp,
      message: `${currentProp} ${message}`,
      test
    });
  }

  /**
   * Create a new validator object
   * @returns {Object} the validator object
   */
  function SemanticValidator() {
    errors = [];
    validationRules = [];
    currentProp = null;
  }

  tests.forEach(test => {
    test(SemanticValidator, addRule);
  });

  /**
   * Select a property that should be validated
   * @param {string} prop the name of the property to which validation should be added
   * @returns {Object} the validator object
   */
  SemanticValidator.prototype.selectProp = function(prop) {
    currentProp = prop;
    return this;
  };

  /**
   * Add a custom error message to the last validation rule
   * @param {string} errorMessage a custom error message
   * @returns {Object} the validator object
   */
  SemanticValidator.prototype.message = function(errorMessage) {
    validationRules[validationRules.length - 1].message = errorMessage;
    return this;
  };

  /**
   * Validate an object based on previously-provided rules
   * @param {Object} obj the object to be validated
   * @returns {Object} an object with a boolean `valid` property and an `errors` array of error messages
   */
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

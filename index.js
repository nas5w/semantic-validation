'use strict';

function SemanticValidator() {
  this.valid = false;
  this.errors = [];
  this.validationRules = [];
  this.currentProp = null;
}

SemanticValidator.prototype.addRule = function(prop) {
  this.currentProp = prop;
  return this;
};

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
  this.validationRules.push({
    prop: this.currentProp,
    message: `${this.currentProp} should contain ${text}`,
    test
  });
  return this;
};

SemanticValidator.prototype.message = function(errorMessage) {
  this.validationRules[this.validationRules.length - 1].message = errorMessage;
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

module.exports = SemanticValidator;

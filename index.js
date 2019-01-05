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
  let groupedRules = [];
  this.validationRules.forEach((rule, index) => {
    if (this.validationRules[index - 1] && this.validationRules[index - 1].or) {
      groupedRules[groupedRules.length - 1].push(rule);
    } else {
      groupedRules.push([rule]);
    }
  });

  groupedRules.forEach(groupedRule => {
    let valid = false;
    for (let i = 0; i < groupedRule.length; i++) {
      if (groupedRule[i].test(obj[groupedRule[i].prop])) {
        valid = true;
        break;
      }
    }

    if (!valid) {
      this.errors.push(groupedRule[groupedRule.length - 1].message);
    }
  });

  return {
    valid: !this.errors.length,
    errors: this.errors
  };
};

SemanticValidator.prototype.or = function() {
  this.validationRules[this.validationRules.length - 1].or = true;
  return this;
};

module.exports = SemanticValidator;

# Semantic Validation

[![Build Status](https://travis-ci.com/nas5w/semantic-validation.svg?branch=master)](https://travis-ci.com/nas5w/semantic-validation) [![Codecov Status](https://codecov.io/gh/nas5w/semantic-validation/branch/master/graph/badge.svg)](https://codecov.io/gh/nas5w/semantic-validation/branch/master)

This package enables the user to implement human-readable validation logic for javascript objects on the front or back end of an application.

**This is a work in progress and should not be used in production**

## Example Use

```javascript
// Create fake object to validate
const formObject = {
  email: 'name@email.com'
};

// Create new instance of the semantic validator
const validator = new SemanticValidator();

// Add rules and custom error messages
validator
  .selectProp('email')
  .shouldContain('@email.com')
  .message('You must register using a email address.');

// Validate the faked object
const result = validator.validate(formObject);

// Take action based on validation results
if (result.valid) {
  console.log('The object is valid!');
} else {
  console.log(result.errors);
}
```

const SemanticValidator = require('../index');

const formObject = {
  email: 'bloggs@email.com'
};

test('Both or matches should be valid', () => {
  const validator = new SemanticValidator();

  validator
    .addRule('email')
      .shouldContain('@email.com')
      .or().shouldContain('bloggs');

  expect(validator.validate(formObject).valid).toBe(true);
});

test('One or match should be valid', () => {
  const validator = new SemanticValidator();

  validator
    .addRule('email')
      .shouldContain('@gmail.com')
      .or().shouldContain('bloggs');

  expect(validator.validate(formObject).valid).toBe(true);
});

test('No or matches should be invalid', () => {
  const validator = new SemanticValidator();

  validator
    .addRule('email')
      .shouldContain('@gmail.com')
      .or().shouldContain('jimmy');

  expect(validator.validate(formObject).valid).toBe(false);
});
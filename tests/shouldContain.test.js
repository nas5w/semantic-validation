const SemanticValidator = require('../index');

const formObject = {
  email: 'user@email.com'
};

test('Matching contains should be valid', () => {
  const validator = new SemanticValidator();

  validator.addRule('email').shouldContain('@email.com');

  expect(validator.validate(formObject).valid).toBe(true);
});

test('Non-matching contains should invalid', () => {
  const validator = new SemanticValidator();

  validator.addRule('email').shouldContain('@gmail.com');

  expect(validator.validate(formObject).valid).toBe(false);
});

test('Non-matching contains due to casing should invalid', () => {
  const validator = new SemanticValidator();

  validator.addRule('email').shouldContain('@Email.com');

  expect(validator.validate(formObject).valid).toBe(false);
});

test('Matching contains due to case insensitivity should valid', () => {
  const validator = new SemanticValidator();

  validator
    .addRule('email')
    .shouldContain('@Email.com', (caseSensitive = false));

  expect(validator.validate(formObject).valid).toBe(true);
});

test('Matching contains should have no error messages', () => {
  const validator = new SemanticValidator();

  validator.addRule('email').shouldContain('@email.com');

  expect(validator.validate(formObject).errors.length).toBe(0);
});

test('Non-matching contains should have one error message', () => {
  const validator = new SemanticValidator();

  validator.addRule('email').shouldContain('@gmail.com');

  expect(validator.validate(formObject).errors.length).toBe(1);
});

test('Non-matching contains should show custom error message', () => {
  const validator = new SemanticValidator();
  const customMessage = 'You must use an email.com domain';

  validator
    .addRule('email')
    .shouldContain('@gmail.com')
    .message(customMessage);

  expect(validator.validate(formObject).errors[0]).toBe(customMessage);
});

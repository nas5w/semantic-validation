const SemanticValidator = require('./src/index');

let formObject = {
  email: 'name@email.com'
};

let validator = new SemanticValidator();

validator
  .selectProp('email')
  .shouldContain('@gmail.com')
  .message('You must register using a gmail address.')
  .shouldContain('name');

let result = validator.validate(formObject);

if (result.valid) {
  console.log('The object is valid!');
} else {
  console.log(result.errors);
}

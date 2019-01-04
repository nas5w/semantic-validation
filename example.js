const SemanticValidator = require('./index');

let formObject = {
  email: 'name@email.com'
};

let validator = new SemanticValidator();

validator
  .addRule('email')
  .shouldContain('@email.com')
  .message('You must register using a gmail address.');

let result = validator.validate(formObject);

if (result.valid) {
  console.log('The object is valid!');
} else {
  console.log(result.errors);
}

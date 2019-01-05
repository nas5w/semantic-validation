const SemanticValidator = require('./index');

let formObject = {
  username: 'joebloggs',
  email: 'bloggs@email.com'
};

let validator = new SemanticValidator();

validator
  .addRule('username')
    .shouldContain('joe')
    .or().shouldContain('nick')
    .message('You must named joe or nick.')
  .addRule('email')
    .shouldContain('.com')
    .message('You must register using a .com address.');

let result = validator.validate(formObject);

if (result.valid) {
  console.log('The object is valid!');
} else {
  console.log(result.errors);
}

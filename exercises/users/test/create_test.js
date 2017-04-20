const assert = require('assert');
const User = require('../src/user.js');


describe("Creating records", () => {
  it('saves a user', (done) => {
    const joe = new User({name: "Joe"});
    joe.save()
    .then(() => {
        //has joe been saved successfully?
        console.log(`Joe is new, true or false??? ::: ${joe.isNew}`);
        assert(!joe.isNew);
        done();
    });

  });

  

});
const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
    it('requires a user name', (done) => {
        const user = new User({name: undefined});
        const validationResult = user.validateSync();
        const errorMessage = validationResult.errors.name.message;
        assert(errorMessage === 'Name is required.');
        done();
    });

    it('Validating length of name is > 2', (done) => {
        const user = new User({name: "Bo"});
        const validationResult = user.validateSync();
        assert(validationResult.errors.name.message === "Name must be longer than 2 characters.");
        done();
    });

    it('disallows invalid records from being saved', (done) => {
        const user = new User({name: 'Al'});
        user.save()
        .catch((validationResult) => {
            const errorMessage = validationResult.errors.name.message;
            assert(errorMessage === 'Name must be longer than 2 characters.');
            done();
        })
    })


});
'use strict';

const assert = require('assert');
const User = require('../src/user.js');

describe('Updating records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe', postCount: 0});
        joe.save()
            .then(() => done());
    });

    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                done();
            });
    }

    it('instance set and save', (done) => {
        console.log(joe);
        joe.set('name', 'Alex');
        console.log(joe);
        assertName(joe.save(), done);
    });



    it('model instance - updating a record with update', (done) => {
        assertName(joe.update({ name: 'Alex' }), done);
        
    });

    it('a model class can update', (done) => {
        assertName(
            User.update({name: 'Joe'}, {name: 'Alex'}), done
        );
    });

    it('a model class can update one record', (done) => {
        assertName(User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}), done);
    });

    it('A model class can find a record with an id and update', (done) => {
        assertName(User.findByIdAndUpdate(joe._id, {name: 'Alex'}), done);
    });

    it('a user can have their post count incremented by one', (done) => {
       User.update({name: 'Joe'}, {$inc: {postCount: 1}})
         .then(() => {
             User.findOne({name: 'Joe' })
             .then((user) => {
                 assert(user.postCount === 1);
                 done();
             })
         });
    });

});

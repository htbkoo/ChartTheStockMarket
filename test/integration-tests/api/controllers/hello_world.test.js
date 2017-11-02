let should = require('should');
let request = require('supertest');
let server = require('../../../../app');

describe('api', function () {
    describe('controllers', function () {
        describe('hello_world', function () {
            describe('GET /hello', function () {
                it('should return a default string', function () {
                    return request(server)
                        .get('/hello')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .then(res => {
                            res.body.should.eql('Hello, stranger!');
                        });
                });

                it('should accept a name parameter', function () {
                    request(server)
                        .get('/hello')
                        .query({name: 'Scott'})
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .then(res => {
                            res.body.should.eql('Hello, Scott!');
                        });
                });
            });
        });
    });
});

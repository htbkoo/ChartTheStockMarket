let chai = require('chai');
let request = require('supertest');
let server = require('../../../../app');

describe('api', function () {
    describe('controllers', function () {
        describe('stocks', function () {
            describe('GET /stocks', function () {
                it('should return an empty array', function () {
                    return request(server)
                        .get('/stocks')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .then(res =>
                            chai.expect(res.body).to.be.an('array').that.is.empty
                        );
                });
            });
        });
    });
});
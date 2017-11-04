let request = require('supertest');
let chai = require("chai");

let server = require('../../app');


describe('routes', function () {
    describe("index", function () {
        describe('GET /', function () {
            it('should return a html response', function () {
                return request(server)
                    .get('/')
                    .set('Accept', 'text/html')
                    .expect(200)
                    .expect('Content-Type', /html/)
                    .expect(/<!DOCTYPE html>/)
                    .then(res =>
                        chai.expect(res.text).to.have.string("<!DOCTYPE html>")
                    )
            });
        });
    });
});

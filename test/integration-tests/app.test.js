let server = require('../../app');

let request = require('supertest');

describe('routes', function () {
    describe("index", function () {
        describe('GET /', function () {
            it('should return a default string', function () {
                return request(server)
                    .get('/')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .expect('Content-Type', /html/)
            });
        });
    });
});

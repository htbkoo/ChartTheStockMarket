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
                    .expect(/<title>Chart the Stock Market<\/title>/)
            });
        });

        describe('GET /docs', function () {
            it('should return swagger docs for GET /docs/', function () {
                return request(server)
                    .get('/docs/')
                    .set('Accept', 'text/html')
                    .expect(200)
                    .expect('Content-Type', /html/)
                    .expect(/<title>Swagger UI<\/title>/);
            });

            it('should redirect to swagger docs for GET /docs', function () {
                return request(server)
                    .get('/docs')
                    .set('Accept', 'text/html')
                    .expect(301)
                    .expect('Content-Type', /html/)
                    .expect(/Redirecting to <a href="\/docs\/">\/docs\/<\/a>/);
            });
        });

        describe('GET /stocks', function () {
            it('should return [] for GET /stocks at initial state', function () {
                return request(server)
                    .get('/stocks')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .expect('Content-Type', /application\/json/)
                    .expect([]);
            });
        });

        describe('POST /stocks/add/{id}', function () {
            it('should return {added: true} for POST /stocks/add/{id} at initial state', function () {
                return request(server)
                    .post('/stocks/add/someId')
                    .set('Content-Type', 'application/json')
                    .expect(200)
                    .expect('Content-Type', /application\/json/)
                    .expect({added: true});
            });
        });
    });
});

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
    });
});

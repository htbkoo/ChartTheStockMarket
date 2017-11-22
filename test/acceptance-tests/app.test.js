let request = require('supertest');
let chai = require("chai");
let server;
describe('routes', function () {
    beforeEach(function () {
        delete require.cache[require.resolve('../../app')];
        require.cache = {};
        server = require('../../app');
    });

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

            it('should return [stock...] for GET /stocks after adding stocks', function () {
                let underlyingId = "someId";

                return addStock(underlyingId)
                    .then(res =>
                        request(server)
                            .get('/stocks')
                            .set('Accept', 'application/json')
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
                            .expect([{underlyingId}])
                    )
            });
        });

        describe('POST /stocks/add/{id}', function () {
            // TODO: to enable this test after resolving the multiple tests global state problem
            xit('should return {added: true} for POST /stocks/add/{id} at initial state', function () {
                return addStock("someId")
                    .expect(200)
                    .expect('Content-Type', /application\/json/)
                    .expect({added: true});
            });
        });
    });

    function addStock(id) {
        return request(server)
            .post(`/stocks/add/${id}`)
            .set('Content-Type', 'application/json');
    }
});

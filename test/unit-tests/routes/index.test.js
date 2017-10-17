import chai from "chai";

import index from "../../../routes/index";

let request = require('supertest');
let server = require('../../../app');

describe('routes', function () {
    describe("index", function () {
        describe('GET /', function () {
            it('should return a default string', function () {
                return request(server)
                    .get('/')
                    .set('Accept', 'application/json')
                    .expect(302)
                    .expect('Location', /index.html/)
                    .then(res => {
                        // Reference: https://stackoverflow.com/a/12291849
                        chai.expect(res.header['location']).to.have.string("index.html");
                    });
            });
        });
    });
});

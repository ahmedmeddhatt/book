const chai = require('chai');
// const should = chai.should();
// const expect = chai.expect();
// const assert = chai.assert();


const request = require('supertest');
const app = require('../server');

describe('GET /books', function() {
  it('Return List Of Books', function() {
    return request(app)
      .get('/api/v1/book')
      .expect(200)
    //   .expect('Content-Type',/json/)
      .expect((res) => {
        console.log('List Of Books: ', JSON.stringify(res));
      })
  })
})
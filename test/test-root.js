/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);

describe('GET /', () => {
  it('should return 200(success) status', (done) => {
    chai.request(app).get('/').end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
});
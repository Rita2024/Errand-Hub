/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { after } from 'mocha';
import app from '../server';

chai.use(chaiHttp);
let token = '';
describe('POST /api/v1/auth/signup', () => {
  it('should return 200 - Success', (done) => {
    chai.request(app).post('/api/v1/auth/login').send({ email: 'niomwungeri@gmail.com', password: '123' }).end((err, res) => {
      res.body.should.have.status(200);
      token = res.body.token;
      done();
    });
  });
  it('should return 400 - The credentials you provided is incorrect', (done) => {
    chai.request(app).post('/api/v1/auth/login').send({ email: 'niomwungeri@gmail.com', password: '123revc' }).end((err, res) => {
      res.body.should.have.status(400);
      res.body.should.have.property('message').equal('The credentials you provided is incorrect');
      done();
    });
  });
  it('should return 400 - Email and Password are required', (done) => {
    const newUser = {
      email: '',
      firstName: 'admin',
      lastName: 'admin',
      password: '123',
      username: '',
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.have.property('message').equal('Email and Password are required');
        done();
      });
  });
  it('should return 409 - Check Unique', (done) => {
    const newUser = {
      email: 'errandhub21@gmail.com',
      firstName: 'admin',
      lastName: 'admin',
      password: '123',
      username: 'admin',
    };
    chai.request(app).post('/api/v1/auth/signup').set('x-access-token', token).send(newUser)
      .set('x-access-token', token)
      .end((err, res) => {
        res.body.should.have.property('message');
        res.body.should.have.status(409);
        done();
      });
  });
});

after('should return 204 - User found', (done) => {
  chai.request(app).delete('/api/v1/users/delete').set('x-access-token', token)
    .end((err, res) => {
      chai.expect(res.statusCode).to.be.equal(204);
      done();
    });
});
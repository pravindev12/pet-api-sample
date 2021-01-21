const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('functional - pet', () => {
  it('should fail to create a pet without a name', async () => {
    const res = await request(app).post('/pets').send({
      age: 2,
      colour: 'black',
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"name" is required');
  });

  it('should create a pet', async () => {
    const pet = {
      name: 'Tommy',
      age: 2,
      colour: 'black',
    };
    const res = await request(app).post('/pets').send(pet);
    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(pet.name);
    expect(res.body.age).to.equal(pet.age);
    expect(res.body.colour).to.equal(pet.colour);
  });

  it('should get all pet list', async () => {
    const res = await request(app).get('/pets');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
const request = require('supertest');

describe('GET /plants', () => {

  it('should return a JSON array', async done => {
    await request(strapi.server)
      .get('/plants')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        const data = JSON.parse(response.text);
        expect(data).toBeInstanceOf(Array);
      });
    done();
  });

  it('should return a list of plants', async done => {
    await request(strapi.server)
      .get('/plants')
      .then(response => {
        const data = JSON.parse(response.text);
        expect(data).toEqual(expect.arrayContaining([
          expect.objectContaining({
            species: expect.any(String),
            description: expect.any(String)
          })
        ]));
      });
    done();
  });

});

describe('GET /plants/{id}', () => {

  it('should return a JSON object', async done => {
    await request(strapi.server)
      .get('/plants/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        const data = JSON.parse(response.text);
        expect(data).toBeInstanceOf(Object);
      });
    done();
  });

  it('should return a single plant', async done => {
    await request(strapi.server)
      .get('/plants/1')
      .then(response => {
        const data = JSON.parse(response.text);
        expect(data).toEqual(expect.objectContaining({
            species: expect.any(String),
            description: expect.any(String)
          })
        );
      });
    done();
  });

});
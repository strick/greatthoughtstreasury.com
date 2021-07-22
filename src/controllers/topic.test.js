const request = require('supertest');
const app = require('../app');
const db = require('../db');

describe('Topic controller requests', () => {

    it('should return topic listing page', async () => {
      const res = await request(app)
        .get('/topics')
        .expect(200)
        .expect(function(res){        
            if(!res.text.includes("<h1>Topic Listing</h1>")) throw new Error("Topic Listing heading missing");        
      });
    });

    it('should return 404 on malform topic', async () => {

      // Malform address
      await request(app)
      .get('/topics/single/dafsdfsdk3333')
      .expect(404);
    });

    it('should return a 200 success on a single topic', async () => {

      await request(app)
      .get('/topics/cheerfulness')
      .expect(200)
    });

  /* This is broken */
  /*
  it('should return 404 on correct format topic that doesnt exist', async () => {

      await request(app)
      .get('/topics/single/60aaa8757036d21c9f76ac82')
      .expect(404);
  });
*/
});

beforeAll(() => {
  return  db.connect(app);
});


afterAll(async done => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close()
  //done()
  await new Promise(resolve => setTimeout(() =>  resolve(), 500)); // avoid jest open handle error
  done()


});
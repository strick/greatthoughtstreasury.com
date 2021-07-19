const request = require('supertest');
const app = require('../app');
const db = require('../db');

describe('Search controller requests', () => {

    it('should return a 404 on an empty search', async () => {
      const res = await request(app)
        .get('/search')
        .expect(404);
    });

    it('should return a author if only first name is provided', async () => {
      const res = await request(app)
        .post('/search')
        .send({q: "abaye"})
        .expect(200)
        .expect(function(res){        
            if(!res.text.includes("Abaye NULL")) throw new Error("First name not found");     
        });
    })

    it('should return a author if only last name is provided', async () => {
      const res = await request(app)
      .post('/search')
      .send({q: "Feltham"})
      .expect(200)
      .expect(function(res){        
          if(!res.text.includes("Owen Feltham")) throw new Error("Last name not found");     
      });
    })

    it('should return search results on a search', async () => {
      const res = await request(app)
        .post('/search')
        .send({q: "iron man"})
        .expect(200)
        .expect(function(res){        
            if(!res.text.includes("iron man")) throw new Error("Search results not listed");     
        });
    });
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
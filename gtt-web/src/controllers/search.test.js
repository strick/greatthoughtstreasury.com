const request = require('supertest');
const app = require('../app');

describe('Search controller requests', () => {

    it('should return a 404 on an empty search', async () => {
      const res = await request(app)
        .get('/search')
        .expect(404);
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

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
  })
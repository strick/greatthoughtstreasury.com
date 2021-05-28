const request = require('supertest');
const app = require('../app');

describe('Quote controller requests', () => {

    it('should return quote listing page', async () => {
      const res = await request(app)
        .get('/quotes')
        .expect(200)
        .expect(function(res){        
            if(!res.text.includes("<h1>Quotes Listing</h1>")) throw new Error("Quote Listing heading missing");        
      });
    });

});

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
  })
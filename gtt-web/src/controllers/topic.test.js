const request = require('supertest');
const app = require('../app');

describe('Topic controller requests', () => {

    it('should return topic listing page', async () => {
      const res = await request(app)
        .get('/topics')
        .expect(200)
        .expect(function(res){        
            if(!res.text.includes("<h1>Topic Listing</h1>")) throw new Error("Topic Listing heading missing");        
      });
    });

});

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
  })
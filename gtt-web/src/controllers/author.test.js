const request = require('supertest');
const app = require('../app');

describe('Author controller requests', () => {
    it('should return author listing page', async () => {
      const res = await request(app)
        .get('/authors')
        .expect(200)
        .expect(function(res){        
            if(!res.text.includes("<h1>Author Listing</h1>")) throw new Error("Author Listing heading missing");        
      });
    });

    // ToDo - MOCK this database so you can supply the value and confirm the page gives it back
    it('should return one author when existing id supplied', async () => {
        await request(app)
        .get('/authors/single/60a2a8757036d21c9f76d024')
        .expect(200)
        .expect(function(res){
            if(!res.text.includes("John O’Donohue")) throw new Error("Expected to find the author");
        });
    });

    it('should return 404 on undefined author', async () => {
        await request(app)
        .get('/authors/single/dafsdfsdk3333')
        .expect(404);
    })
});

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
  })
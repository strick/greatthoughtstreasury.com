const request = require('supertest');
const app = require('../app');
const db = require('../db');

describe('Quote controller requests', () => {

    it('should return quote listing page', async () => {
      const res = await request(app)
        .get('/quotes')
        .expect(200)
        .expect(function(res){        
            if(!res.text.includes("<h1>Quotes Listing</h1>")) throw new Error("Quote Listing heading missing");        
      });
    });

   
    it('should return 404 on malform quote', async () => {

        // Malform address
        await request(app)
        .get('/quotes/single/dafsdfsdk3333')
        .expect(404);
    });

    it('should return 404 on correct format quote that doesnt exist', async () => {

        await request(app)
        .get('/quotes/single/60aaa8757036d21c9f76ac82')
        .expect(404);
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
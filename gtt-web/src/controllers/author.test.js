//
// An example of running unit tests against the "metadata" microservice using Jest.
//
//require('mongodb');
const { ExponentialRetryPolicyFilter } = require('azure-storage');
const request = require('supertest');
const app = require('../app');

describe('Author controller requests', () => {
    it('should create a return author listing apge', async () => {
      const res = await request(app)
        .get('/authors')
        .expect(200)
        .expect(function(res){        
            if(!res.text.includes("<h1>Author Listing</h1>")) throw new Error("Author Listing heading missing");        
      });
    });
});
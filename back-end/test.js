const assert = require("assert")
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');
const server = require('./server');
const expect = chai.expect;

chai.use(chaiHttp);

// a set of tests of array functions
describe("Array", function () {
  // one particular unit test
  describe("#indexOf()", function () {
    // assert what should be returned
    it("should return -1 when the value is not present", function () {
      // test that assertion
      assert.equal(-1, [1, 2, 3].indexOf(4))
    })
  })
})

// inventory API tests
describe("Inventory API", function() {
  // Test getting all items
  describe("GET /api/items", function() {
    it("should get all inventory items", function(done) {
      chai.request(app)
        .get('/api/items')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('success');
          expect(res.body).to.have.property('data').to.be.an('array');
          done();
        });
    });
  });

// inventory API tests: test getting item by ID
describe("GET /api/items/:id", function() {
  it("should get an item by id", function(done) {
    chai.request(app)
      .get('/api/items/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('success');
        expect(res.body).to.have.property('data').to.be.an('object');
        expect(res.body.data).to.have.property('id').eql('1');
        done();
      });
  });

  it("should return 404 for non-existent item", function(done) {
    chai.request(app)
      .get('/api/items/999')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body).to.have.property('message').eql('Item not found');
        done();
      });
  });
});

// inventory API tests: test creating new item
describe("POST /api/items", function() {
  it("should create a new item", function(done) {
    const newItem = {
      name: 'Yogurt',
      category: 'Dairy',
      expirationDate: '2025-04-20',
      quantity: '6 pack',
      storageLocation: 'Main shelf'
    };

    chai.request(app)
      .post('/api/items')
      .send(newItem)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('success');
        expect(res.body).to.have.property('message').eql('Item added successfully');
        expect(res.body).to.have.property('data').to.be.an('object');
        expect(res.body.data).to.have.property('name').eql('Yogurt');
        done();
      });
  });
});

// inventory API tests: test filtering items by category
describe("GET /api/items/category/:category", function() {
  it("should get items by category", function(done) {
    chai.request(app)
      .get('/api/items/category/dairy')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('success');
        expect(res.body).to.have.property('data').to.be.an('array');
        if (res.body.data.length > 0) {
          res.body.data.forEach(item => {
            expect(item.category.toLowerCase()).to.equal('dairy');
          });
        }
        done();
      });
  });
});
});


after(function() {
server.close();
});
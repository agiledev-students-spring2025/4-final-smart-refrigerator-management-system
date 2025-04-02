const assert = require("assert")
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');
const server = require('./server');
const expect = chai.expect;

chai.use(chaiHttp);

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

//Account setting API test 
describe("Account-setting API", function(){
  describe("GET /api/items/Account-Setting/:field/", function() {
    it("should get updated username", function(done){ 
      chai.request(app)
      .get('/api/items/Account-Setting/name')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name');
        //expect to match database --> next sprint
        done();
      });
    })

    it("should get updated email", function(done){ 
      chai.request(app)
      .get('/api/items/Account-Setting/email')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('email');
        //expect to match database --> next sprint
        done();
      });
    })

    it("should get updated phone", function(done){ 
      chai.request(app)
      .get('/api/items/Account-Setting/phone')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('phone');
        //expect to match database --> next sprint
        done();
      });
    })
  })

  describe("POST /api/items/Account-Setting/:field/", function(){
    it("should update user's name", function(done){
      chai.request(app)
      .post("/api/items/Account-Setting/name")
      .send({value : "John Doe"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('name');
        expect(res.body.name).to.equal('John Doe');
        done();
      })
    })
  })

})


after(function() {
server.close();
});
const errorNotFound = require('../../middlewares/error.notFound');
const chai = require("chai");
const should = chai.should();
// import sinon
const sinon = require("sinon");

describe("URLDoesNotExist", function() {
  it ("should return an error message upon a bad URL", function() {

    const test = {
      status: 404
    }

    const testObj = {
      status: 404,
      body: '<h1>Sorry, this URL does not exist.</h1>'
    }

    errorNotFound(test);
    test.body.should.eql(testObj.body);
  })
})
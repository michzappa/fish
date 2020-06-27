let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
let expect = chai.expect;
chai.use(chaiHttp);

let rooms = require("../public/database");

describe("App", function () {
  describe("/rooms?name=ireland", function () {
    it("responds with status 200", function (done) {
      chai
        .request(app)
        .post("/rooms?name=ireland")
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

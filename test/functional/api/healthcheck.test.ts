import * as chai from "chai";
import axios from "axios";

// ignore self signed certs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const httpTimeout = 60000;
const frontendURL = process.env.TEST_URL || "http://localhost:1337";

describe("GET /", () => {

  it("should return 200 @smoke", async () => {
    const response = await axios.get(frontendURL + "/");

    chai.expect(response.status).equals(200);
  });

}).timeout(httpTimeout);

describe("GET /health", () => {

  it("should return status OK @smoke", async () => {
    const response = await axios.get(frontendURL + "/health");

    chai.expect(response.status).equals(200);
    chai.expect(response.data).to.have.property("api");
    chai.expect(response.data.api).equals("ok");
  });

}).timeout(httpTimeout);

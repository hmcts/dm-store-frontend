import * as chai from "chai";
import * as sinon from "sinon";
import {ServiceAuthProviderClient} from "../../../src/api/auth/service-auth-provider-client";
import {config} from "../../../src/api/config";
import Axios from "axios";

describe("ServiceAuthProviderClient", () => {

  it("get a token", async () => {
    const mockResponse = { data: "token"};
    const http = Axios.create();
    const fake = sinon.fake.resolves(mockResponse);

    sinon.replace(http, "post", fake);

    const client = new ServiceAuthProviderClient(
      http,
      config.s2s.microservice,
      config.s2s.secret
    );

    const token = await client.getToken();

    chai.expect(token).to.equal("Bearer token");
  });

});

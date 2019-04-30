import * as chai from "chai";
import * as request from "supertest";
import {Service} from "../../../src/api/service";
import * as express from "express";
import {StatusController} from "../../../src/api/status-controller";

describe("GET /status", () => {
  const service = new Service(
    express(),
    { init: () => {}, getToken: () => "token" } as any,
    new StatusController()
  );

  let server;

  before(async () => {
    server = await service.start();
  });

  after(() => {
    server.close();
  });

  it("should response with json", async () => {
    const response = await request(server).get("/health");

    chai.expect(response.status).equals(200);
    chai.expect(response.body.api).equals("ok");
  });

});

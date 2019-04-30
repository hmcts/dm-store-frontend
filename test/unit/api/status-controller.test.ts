import { expect } from "chai";
import { spy } from "sinon";
import { StatusController } from "../../../src/api/status-controller";

describe("StatusController", () => {

  it("should respond", () => {

    const sendSpy = spy();
    const req = {} as any;
    const res = { send: sendSpy } as any;
    const controller = new StatusController();

    controller.getStatus(req, res);

    expect(sendSpy.calledOnce).to.equal(true);
  });

});

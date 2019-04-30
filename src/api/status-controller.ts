import * as pkjson from "../../package.json";
import { Request, Response } from "express";

/**
 * Handles requests for the /status endpoint
 */
export class StatusController {

  /**
   * GET /status
   */
  public getStatus(req: Request, res: Response): void {
    res.send({
      "api": "ok",
      "version": pkjson.version,
      "env": process.env
    });
  }

}

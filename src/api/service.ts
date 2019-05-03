import * as path from "path";
import {config} from "./config";
import {logger} from "./logger";
import {Application} from "express";
import * as express from "express";
import {ClientRequest, Server} from "http";
import * as proxy from "http-proxy-middleware";
import {TokenRepository} from "./auth/token-repository";
import {StatusController} from "./status-controller";

/**
 * Wrapper that boots express with auth headers and static folder
 */
export class Service {

  constructor(
    private readonly app: Application,
    private readonly serviceAuthRepository: TokenRepository,
    private readonly statusController: StatusController
  ) {}

  /**
   * Start the service and return the running server
   */
  public async start(): Promise<Server> {
    const frontendRoot = path.join(__dirname, "..", "frontend");

    this.app.use(express.static(frontendRoot));
    this.app.use("/health", this.statusController.getStatus);

    await this.serviceAuthRepository.init();

    logger.info("s2sToken: " + this.serviceAuthRepository.getToken());


    const dmStoreProxy = config.proxies.dmStore;
    this.app.use(proxy(dmStoreProxy.endpoints, {
      target: dmStoreProxy.target,
      onProxyReq: (req: ClientRequest) => {
        req.setHeader("user-roles", "caseworker");
        req.setHeader("user-id", "dmstoreuser@hmcts.net");
        req.setHeader("ServiceAuthorization", this.serviceAuthRepository.getToken());
      },
      secure: false,
      changeOrigin: true
    }));

    logger.info("Listening on port " + config.port);

    return this.app.listen(config.port);
  }
}

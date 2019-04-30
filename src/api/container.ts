import {Service} from "./service";
import * as express from "express";
import {ServiceAuthProviderClient} from "./auth/service-auth-provider-client";
import Axios from "axios";
import {config} from "./config";
import {StatusController} from "./status-controller";
import { TokenClient, TokenRepository } from "./auth/token-repository";

/**
 * Dependency container
 */
export class Container {

  public getService(): Service {
    return new Service(
      express(),
      this.getTokenRepository(this.getServiceAuthProviderClient()),
      new StatusController()
    );
  }

  private getServiceAuthProviderClient(): ServiceAuthProviderClient {
    return new ServiceAuthProviderClient(
      Axios.create({
        baseURL: config.s2s.url,
        headers: {
          "Content-Type": "application/json"
        }
      }),
      config.s2s.microservice,
      config.s2s.secret
    );
  }

  private getTokenRepository(client: TokenClient): TokenRepository {
    return new TokenRepository(client, config.tokenRefreshTime);
  }
}

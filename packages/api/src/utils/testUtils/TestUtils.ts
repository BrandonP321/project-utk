import request, { Response } from "supertest";
import { app } from "../../app";
import {
  APIErrResponse,
  APIErrorsMap,
} from "@project-utk/shared/src/api/routes";

type TResponse<T> = Omit<Response, "body"> & { body: T };

export type TAgent = ReturnType<typeof TestUtils.agent>;

export class TestUtils {
  static agent = () => request.agent(app);

  static waitForServerToStart = async () =>
    new Promise((resolve) => setTimeout(resolve, 4000));

  static request<Req extends {}, Res extends {}>(
    path: string,
    req: Req,
    agent?: TAgent
  ): Promise<TResponse<Partial<Res>>> {
    return (agent ?? request(app)).post(path).send(req);
  }

  static getRequestFunc<
    Req extends {},
    Res extends {},
    Errors extends APIErrorsMap<string>
  >(path: string) {
    return (req: Req, agent?: TAgent) =>
      this.request<Req, Res & APIErrResponse<Errors>>(path, req, agent);
  }
}

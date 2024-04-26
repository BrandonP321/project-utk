import request, { Response } from "supertest";
import { app } from "../../app";
import {
  APIErrResponse,
  APIErrorsMap,
  DefaultAPIErrors,
} from "@project-utk/shared/src/api/routes";

type TResponse<T> = Omit<Response, "body"> & { body: T };

export type TAgent = ReturnType<typeof TestUtils.agent>;

export class TestUtils {
  static nonexistentUUID = "00000000-0000-0000-0000-000000000000";

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

  static itShouldRejectInvalidInput = (apiCall: () => Promise<any>) => {
    return it("should reject invalid input", async () => {
      const res = await apiCall();

      expect(res.body.errCode).toBe(DefaultAPIErrors.INVALID_INPUT.code);
    });
  };

  static itShouldRequireAuth = (
    apiCall: () => Promise<any>,
    setAgent: (a: TAgent) => void
  ) => {
    return it("should require authentication", async () => {
      setAgent(TestUtils.agent());
      const res = await apiCall();

      expect(res.body.errCode).toBe(DefaultAPIErrors.UNAUTHENTICATED.code);
    });
  };

  static itShouldReturn404 = (apiCall: () => Promise<any>) => {
    return it("should return a 404 if resource does not exist", async () => {
      const res = await apiCall();

      expect(res.status).toBe(404);
    });
  };
}

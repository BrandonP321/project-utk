import request, { Response } from "supertest";
import { app } from "../../server";
import {
  APIErrResponse,
  APIErrorsMap,
} from "@project-utk/shared/src/api/routes";
import Vendor from "../../models/vendor/Vendor";
import { noop } from "lodash";

type TResponse<T> = Omit<Response, "body"> & { body: T };

export class TestUtils {
  static validPassword = "Password123!";
  static invalidPassword = "password";
  static invalidEmail = "testemail.com";

  /** Only pass in a lowercase ID with words separate by periods */
  static getTestEmail(id: string) {
    return `utktest.${id}@example.com`;
  }

  static async deleteTestVendor(email: string) {
    try {
      return await Vendor.destroy({ where: { email } });
    } catch (err) {
      noop();
    }
  }

  static waitForServerToStart = async () =>
    new Promise((resolve) => setTimeout(resolve, 4000));

  static request<Req extends {}, Res extends {}>(
    path: string,
    req: Req
  ): Promise<TResponse<Partial<Res>>> {
    return request(app).post(path).send(req);
  }

  static getRequestFunc<
    Req extends {},
    Res extends {},
    Errors extends APIErrorsMap<string>
  >(path: string) {
    return (req: Req) =>
      this.request<Req, Res & APIErrResponse<Errors>>(path, req);
  }
}

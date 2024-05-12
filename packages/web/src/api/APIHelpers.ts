import {
  APIErrResponse,
  APIErrorsMap,
  DefaultAPIErrors,
} from "@project-utk/shared/src/api/routes";
import { URLUtils } from "@project-utk/shared/src/utils/URLUtils";
import axios, { AxiosError } from "axios";
import axiosRetry from "axios-retry";
import { RouteHelper } from "../utils/RouteHelper";
import store from "../store/configureStore";
import { Actions } from "../features";
import { webConfig } from "../config";

export type ReqParams<Req, Res, Errors extends APIErrorsMap<string>> = {
  onSuccess?: (res: Res, req: Req) => any | Promise<any>;
  onFailure?: (err: APIErrResponse<Errors>) => any | Promise<any>;
  onFinally?: () => any | Promise<any>;
};

type ReqOptions = {
  displayError?: boolean;
  redirectOnUnauthenticated?: boolean;
  retries?: number;
  successMsg?: string;
};

export type APIRequest<Req, Res, Errors extends APIErrorsMap<string>> = (
  req: Req,
  params?: ReqParams<Req, Res, Errors>,
) => Promise<void>;

export class APIHelpers {
  protected static apiDomain = "http://localhost:8000";

  protected static req<Req, Res, Errors extends APIErrorsMap<string>>(
    path: string,
    options: ReqOptions = {},
  ): APIRequest<Req, Res, Errors> {
    return async (req, params) => {
      const { onFailure, onSuccess, onFinally } = params ?? {};
      const {
        displayError = true,
        redirectOnUnauthenticated = true,
        retries = webConfig.api.defaultMaxRetries,
        successMsg,
      } = options;

      axiosRetry(axios, {
        retries,
        retryDelay: axiosRetry.exponentialDelay,
        retryCondition: (err) => {
          const statusCode = err.response?.status ?? 500;

          return JSON.stringify(statusCode).startsWith("5");
        },
      });

      // Add leading '/' to path if not present
      if (!path.startsWith("/")) {
        path = `/${path}`;
      }

      try {
        const res = await axios.post<Res>(`${this.apiDomain}${path}`, req, {
          withCredentials: true,
        });

        if (successMsg) {
          store.dispatch(Actions.Notifications.addSuccess({ msg: successMsg }));
        }

        await onSuccess?.(res.data, req);
      } catch (err) {
        const error = err as AxiosError<APIErrResponse<Errors>>;
        const networkError = DefaultAPIErrors.NETWORK_ERROR.apiResponse;
        const errorResponse = error.response?.data ?? networkError;

        if (
          error.response?.data?.errCode ===
            DefaultAPIErrors.UNAUTHENTICATED.code &&
          redirectOnUnauthenticated
        ) {
          this.redirectToVendorLogin();
        } else if (displayError) {
          store.dispatch(
            Actions.Notifications.addError({ msg: errorResponse.msg }),
          );
        }

        await onFailure?.(errorResponse);
      }

      await onFinally?.();
    };
  }

  public static redirectToVendorLogin() {
    const currentPath = URLUtils.url().pathWithQueryAndHash;

    window.location.href = RouteHelper.VendorLogin({
      searchParams: { redirectTo: currentPath },
    });
  }
}

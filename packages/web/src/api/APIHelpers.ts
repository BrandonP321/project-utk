import {
  APIErrResponse,
  APIErrorsMap,
  DefaultAPIErrors,
} from "@project-utk/shared/src/api/routes";
import { URLUtils } from "@project-utk/shared/src/utils/URLUtils";
import axios, { AxiosError } from "axios";
import { RouteHelper } from "../utils/RouteHelper";
import store from "../store/configureStore";
import { Actions } from "../features";

type ReqParams<Res, Errors extends APIErrorsMap<string>> = {
  onSuccess?: (res: Res) => any;
  onFailure?: (err: APIErrResponse<Errors>) => any;
};

export class APIHelpers {
  protected static apiDomain = "http://localhost:8000";

  protected static req<Req, Res, Errors extends APIErrorsMap<string>>(
    path: string,
    options: { displayError?: boolean } = {}
  ) {
    return async (req: Req, params?: ReqParams<Res, Errors>) => {
      const { onFailure, onSuccess } = params ?? {};
      const { displayError = true } = options;

      // Add leading '/' to path if not present
      if (!path.startsWith("/")) {
        path = `/${path}`;
      }

      try {
        const res = await axios.post<Res>(`${this.apiDomain}${path}`, req, {
          withCredentials: true,
        });

        onSuccess?.(res.data);
      } catch (err) {
        const error = err as AxiosError<APIErrResponse<Errors>>;
        const networkError = DefaultAPIErrors.NETWORK_ERROR.apiResponse;
        const errorResponse = error.response?.data ?? networkError;

        if (
          error.response?.data?.errCode ===
          DefaultAPIErrors.UNAUTHENTICATED.code
        ) {
          return this.handleUnauthenticated();
        }

        if (displayError) {
          store.dispatch(
            Actions.Notifications.addError({ msg: errorResponse.msg })
          );
        }

        onFailure?.(errorResponse);
      }
    };
  }

  private static handleUnauthenticated() {
    const currentPath = URLUtils.url().pathWithQueryAndHash;

    window.location.href = RouteHelper.VendorLogin({
      searchParams: { redirectTo: currentPath },
    });
  }
}

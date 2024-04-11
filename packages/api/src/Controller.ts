import { APIError } from "@project-utk/shared/src/api/errors/APIError";
import {
  APIErrorsMap,
  DefaultAPIErrors,
} from "@project-utk/shared/src/api/routes/routeErrors";
import { Response, Request, NextFunction } from "express";

type ErrorMethods<Errors extends APIErrorsMap<string>> = {
  [key in keyof Errors]: (msg?: string, err?: any) => APIError<string>;
};

type HandlerCallback<ReqBody, ResBody, Locals extends object> = (
  req: Request<{}, ResBody, ReqBody, {}, {}>,
  res: Response<ResBody, Locals>,
  next: NextFunction
) => Promise<any>;

type HandlerCallbackWithErrors<
  ReqBody,
  ResBody,
  Locals extends object,
  Errors extends APIErrorsMap<string>
> = (
  req: Request<{}, ResBody, ReqBody, {}, {}>,
  res: Response<ResBody, Locals>,
  error: ErrorMethods<Errors>,
  next: NextFunction
) => Promise<any>;

export class Controller<
  ReqBody,
  ResBody,
  Locals extends {},
  Errors extends APIErrorsMap<string>
> {
  public errors: Errors;

  constructor(errors: Errors) {
    this.errors = errors;
  }

  public handler(
    cb: HandlerCallbackWithErrors<ReqBody, ResBody, Locals, Errors>
  ): HandlerCallback<ReqBody, ResBody, Locals> {
    return async (req, res, next) => {
      const errors = Controller.getErrorMethods(this.errors);

      try {
        // Execute controller callback
        await cb(req, res, errors, next);
      } catch (err) {
        const fallbackErrors = Controller.getErrorMethods(DefaultAPIErrors);

        // Fallback to default error map if error is not an APIError
        const error =
          err instanceof APIError
            ? err
            : fallbackErrors.INTERNAL_SERVER_ERROR(undefined, err);

        // Send error response
        return res
          .status(error.statusCode)
          .json(error.apiResponse as ResBody)
          .end();
      }
    };
  }

  private static getErrorMethods<E extends APIErrorsMap<string>>(errors: E) {
    const errorMethods = {} as ErrorMethods<typeof errors>;

    for (const errCode in errors) {
      const error = errors[errCode];

      errorMethods[errCode] = (msg, err) => {
        Controller.logError(err);

        return error.getErrorWithNewMsg(msg ?? error.msg);
      };
    }

    return errorMethods;
  }

  public static logError(err: any) {
    // TODO: Add enhanced logging
    console.error(err);
  }
}

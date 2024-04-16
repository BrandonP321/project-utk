import { APIError } from "@project-utk/shared/src/api/errors/APIError";
import {
  APIErrorsMap,
  DefaultAPIErrors,
} from "@project-utk/shared/src/api/routes/routeErrors";
import { Response, Request, NextFunction } from "express";

type ErrorMethods<Errors extends APIErrorsMap<string>> = {
  [key in keyof Errors]: (msg?: string, err?: any) => APIError<string>;
};

type CustomNextFunction<T> = (locals: T) => void;

type HandlerCallback<ReqBody, ResBody, Locals extends object> = (
  req: Request<{}, ResBody, ReqBody, {}, {}>,
  res: Response<ResBody, Locals>,
  next: NextFunction
) => Promise<any>;

type HandlerCallbackWithErrors<
  ReqBody,
  ResBody,
  IncomingLocals extends object,
  OutgoingLocals extends object,
  Errors extends APIErrorsMap<string>
> = (
  req: Request<{}, ResBody, ReqBody, {}, {}>,
  res: Response<ResBody, IncomingLocals>,
  error: ErrorMethods<Errors>,
  next: CustomNextFunction<OutgoingLocals>
) => Promise<any>;

export class Controller<
  ReqBody,
  ResBody,
  /** Res locals are current function can access */
  IncomingLocals extends {},
  /** Res locals that will be passed on to the next function */
  OutgoingLocals extends {},
  Errors extends APIErrorsMap<string>
> {
  public errors: Errors;

  constructor(errors: Errors) {
    this.errors = errors;
  }

  public handler(
    cb: HandlerCallbackWithErrors<
      ReqBody,
      ResBody,
      IncomingLocals,
      OutgoingLocals,
      Errors
    >
  ): HandlerCallback<ReqBody, ResBody, IncomingLocals> {
    return async (req, res, next) => {
      const errors = Controller.getErrorMethods(this.errors);

      function customNext(locals: OutgoingLocals) {
        res.locals = { ...res.locals, ...locals };
        next();
      }

      try {
        // Execute controller callback
        await cb(req, res, errors, customNext);
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
        err && Controller.logError(err);

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

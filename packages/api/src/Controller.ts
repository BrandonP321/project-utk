import {
  APIErrResponse,
  APIErrors,
  DefaultAPIErrors,
} from "@project-utk/shared/src/api/routes/routeErrors";
import { Response, Request, NextFunction } from "express";

type ErrorMethods<Errors extends APIErrors> = {
  [key in keyof Errors]: (msg?: string, err?: any) => Response;
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
  Errors extends APIErrors
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
  Errors extends APIErrors
> {
  public errors: Errors;

  constructor(errors: Errors) {
    this.errors = errors;
  }

  public handler(
    cb: HandlerCallbackWithErrors<ReqBody, ResBody, Locals, Errors>
  ): HandlerCallback<ReqBody, ResBody, Locals> {
    return async (req, res, next) => {
      const errors = this.getErrorMethods(res);

      try {
        await cb(req, res, errors, next);
      } catch (err) {
        return (
          errors as ErrorMethods<typeof DefaultAPIErrors>
        ).InternalServerError(undefined, err as any);
      }
    };
  }

  private getErrorMethods(res: Response) {
    const errorMethods = {} as ErrorMethods<Errors>;

    for (const errCode in this.errors) {
      const error = this.errors[errCode];

      errorMethods[errCode] = (msg, err) => {
        Controller.logError(err);

        const resJSON: APIErrResponse<Errors> = {
          errCode,
          msg: msg ?? error.msg,
        };

        return res.status(error.statusCode).json(resJSON).end();
      };
    }

    return errorMethods;
  }

  public static logError(err: any) {
    // TODO: Add enhanced logging
    console.error(err);
  }
}

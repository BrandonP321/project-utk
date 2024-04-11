import { APIErrResponse, APIErrorsMap } from "../routes/routeErrors";

type APIErrorParams<E extends string> = {
  code: E;
  msg: string;
  statusCode: number;
};

export class APIError<E extends string> {
  private _statusCode: number;
  private _code: E;
  private _msg: string;

  public get code(): E {
    return this._code;
  }

  public get msg(): string {
    return this._msg;
  }

  public get statusCode(): number {
    return this._statusCode;
  }

  public get apiResponse(): APIErrResponse<APIErrorsMap<E>> {
    return { errCode: this.code, msg: this.msg };
  }

  constructor({ code, msg, statusCode }: APIErrorParams<E>) {
    this._code = code;
    this._msg = msg;
    this._statusCode = statusCode;
  }

  public getErrorWithNewMsg(msg: string) {
    return new APIError({
      code: this.code,
      msg,
      statusCode: this.statusCode,
    });
  }
}

export type APIErrResponse<Errors extends APIErrors> = {
  errCode: keyof Errors;
  msg: string;
};

type APIError = {
  msg: string;
  statusCode: number;
};

export type APIErrors = {
  [key: string]: APIError;
};

function getTypedDefaultAPIErrors<ErrCodes extends APIErrors>(
  errors: ErrCodes
) {
  return errors;
}

export const DefaultAPIErrors = getTypedDefaultAPIErrors({
  InternalServerError: {
    msg: "Internal server error",
    statusCode: 500,
  },
});

export function getTypedErrors<ErrCodes extends APIErrors>(errors: ErrCodes) {
  return {
    ...DefaultAPIErrors,
    ...errors,
  };
}

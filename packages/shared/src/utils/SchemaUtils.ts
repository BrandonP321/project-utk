import * as yup from "yup";
import { APIError } from "../api/errors/APIError";
import { DefaultAPIErrors } from "../api/routes/routeErrors";

export class SchemaUtils {
  static async validateInput<T extends {}>(
    input: T,
    schema: yup.ObjectSchema<T>
  ) {
    try {
      await schema.validate(input);
    } catch (err) {
      const validationErr = err as yup.ValidationError;

      throw DefaultAPIErrors.INVALID_INPUT.getErrorWithNewMsg(
        validationErr?.errors?.[0]
      );
    }
  }

  static getValidationFunc<T extends {}>(schema: yup.ObjectSchema<T>) {
    return (input: T) => {
      return SchemaUtils.validateInput(input, schema);
    };
  }
}

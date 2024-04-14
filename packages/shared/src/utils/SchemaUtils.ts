import * as yup from "yup";
import { DefaultAPIErrors } from "../api/routes/routeErrors";
import { ObjectUtils } from "./ObjectUtils";

export class SchemaUtils {
  static async validateInput<T extends {}>(
    input: T,
    schema: yup.ObjectSchema<T>
  ) {
    try {
      return await schema.validate(input);
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

  static getValidationAndFilterFunc<T extends {}>(schema: yup.ObjectSchema<T>) {
    return async (input: T) => {
      const validatedInput = await SchemaUtils.validateInput(input, schema);

      const allowedProperties = Object.keys(schema.describe().fields);

      return ObjectUtils.filterProps(
        validatedInput,
        allowedProperties as (keyof typeof validatedInput)[]
      );
    };
  }
}

import { ValueOf } from "@project-utk/shared/src/utils";

export type FormikSubmit<T extends {}> = (values: T) => Promise<any>;

export class FormikUtils {
  static enumToTextInputInitialValues<T extends Record<string, string>>(
    enumType: T
  ) {
    const initialValues = {} as Record<ValueOf<T>, string>;
    for (const key in enumType) {
      initialValues[enumType[key]] = "";
    }

    return initialValues;
  }
}

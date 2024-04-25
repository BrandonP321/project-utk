import * as yup from "yup";

export function addGenericYupExtensions() {
  yup.addMethod(
    yup.string,
    "optionallyRequired",
    function (required = false, msg: string) {
      let schema = this;

      if (required) {
        schema = schema.required(msg);
      }

      return schema;
    }
  );
}

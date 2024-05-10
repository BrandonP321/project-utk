import { TypedOmit } from "@project-utk/shared/src/utils";
import TextInput from "../TextInput/TextInput";
import { useState } from "react";
import { faEyeSlash, faEye } from "@fortawesome/pro-solid-svg-icons";
import FormField from "../FormField/FormField";
import { RouteHelper } from "../../utils/RouteHelper";

namespace PasswordInput {
  export type Props<F> = TypedOmit<TextInput.Props<F>, "type"> & {};
}

function PasswordInput<F>(props: PasswordInput.Props<F>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextInput
      type={showPassword ? "text" : "password"}
      rightIcon={showPassword ? faEyeSlash : faEye}
      onRightIconClick={() => setShowPassword(!showPassword)}
      {...props}
    />
  );
}

namespace PasswordInput {
  export const FormFieldHelpLink: FormField.HelpLinkProps = {
    text: "Forgot password?",
    to: RouteHelper.RequestVendorPasswordReset(),
  };
}

export default PasswordInput;

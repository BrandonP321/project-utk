import { TypedOmit } from "@project-utk/shared/src/utils";
import TextInput from "../TextInput/TextInput";

namespace PasswordInput {
  export type Props<F> = TypedOmit<TextInput.Props<F>, "type"> & {};
}

function PasswordInput<F>(props: PasswordInput.Props<F>) {
  return <TextInput type="password" {...props} />;
}

export default PasswordInput;

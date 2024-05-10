import { SpaceBetween } from "../SpaceBetween/SpaceBetween";
import styles from "./FormFieldsSpace.module.scss";

namespace FormFieldsSpacer {
  export type Props = SpaceBetween.Props & {};
}

function FormFieldsSpacer(props: FormFieldsSpacer.Props) {
  return <SpaceBetween size="m" vertical stretch stretchChildren {...props} />;
}

export default FormFieldsSpacer;

import { SpaceBetween } from "../SpaceBetween/SpaceBetween";
import styles from "./FormActions.module.scss";

namespace FormActions {
  export type Props = SpaceBetween.Props & {};
}

function FormActions(props: FormActions.Props) {
  return <SpaceBetween size="m" justify="end" stretch {...props} />;
}

export default FormActions;

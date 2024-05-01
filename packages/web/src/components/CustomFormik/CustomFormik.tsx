import { Formik, FormikConfig } from "formik";
import CustomFormikProvider from "./CustomFormikContext";

namespace CustomFormik {
  export type Props<Values extends {}> = FormikConfig<Values>;
}

function CustomFormik<Values extends {}>({
  validateOnBlur = false,
  validateOnChange = false,
  enableReinitialize = true,
  children,
  ...rest
}: CustomFormik.Props<Values>) {
  return (
    <CustomFormikProvider>
      <Formik
        {...rest}
        {...{ validateOnChange, validateOnBlur, enableReinitialize }}
      >
        <>{children}</>
      </Formik>
    </CustomFormikProvider>
  );
}

export default CustomFormik;

import { Formik, FormikConfig } from "formik";

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
    <Formik
      {...rest}
      {...{ validateOnChange, validateOnBlur, enableReinitialize }}
    >
      <>{children}</>
    </Formik>
  );
}

export default CustomFormik;

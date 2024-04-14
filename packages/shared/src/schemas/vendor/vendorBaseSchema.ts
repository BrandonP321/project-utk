import * as yup from "yup";

export const vendorBaseSchema = yup.object().shape({
  email: yup.string().customEmail().requiredWithEmailMsg(),
  password: yup.string().password(),
  name: yup.string().requiredWithNameMsg().name(),
});

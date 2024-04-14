import * as yup from "yup";
import { PasswordUtils } from "../../utils/PasswordUtils";

const nameRegex = /^[a-zA-Z-' ]+$/;
const passwordLengthErrMsg = `Password must be ${PasswordUtils.minLength} to ${PasswordUtils.maxLength} characters long`;

export function addAuthYupExtensions() {
  yup.addMethod(yup.string, "customEmail", function () {
    return this.email("Email format is invalid").transform((email) =>
      email.toLowerCase().trim()
    );
  });

  yup.addMethod(yup.string, "requiredWithEmailMsg", function () {
    return this.required("Email is required");
  });

  yup.addMethod(yup.string, "name", function () {
    return this.matches(nameRegex, "Invalid characters in name")
      .trim("Name cannot start or end with a space")
      .min(2, "Name is too short")
      .max(50, "Name is too long");
  });

  yup.addMethod(yup.string, "requiredWithNameMsg", function () {
    return this.required("Name is required");
  });

  yup.addMethod(yup.string, "requiredWithPasswordMsg", function () {
    return this.required("Password is required");
  });

  yup.addMethod(yup.string, "password", function () {
    return this.requiredWithPasswordMsg()
      .min(PasswordUtils.minLength, passwordLengthErrMsg)
      .max(PasswordUtils.maxLength, passwordLengthErrMsg)
      .matches(
        PasswordUtils.uppercaseRegex,
        "Password must contain at least one uppercase letter"
      )
      .matches(
        PasswordUtils.lowercaseRegex,
        "Password must contain at least one lowercase letter"
      )
      .matches(
        PasswordUtils.numberRegex,
        "Password must contain at least one number"
      )
      .matches(
        PasswordUtils.specialCharacterRegex,
        `Password must contain at least one of the following special characters: ${PasswordUtils.allowedSpecialCharacters.join(
          ", "
        )}`
      )
      .matches(
        PasswordUtils.noControlCharactersRegex,
        "Password cannot contain non-printable characters or unusual symbols"
      );
  });
}

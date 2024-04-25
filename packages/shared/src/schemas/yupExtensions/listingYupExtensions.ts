import * as yup from "yup";

const listingNameRegex = /^[a-zA-Z-' ]+$/;

export function addListingYupExtensions() {
  yup.addMethod(yup.string, "listingName", function (required = false) {
    return this.matches(listingNameRegex, "Invalid characters in name")
      .trim("Name cannot start or end with a space")
      .min(2, "Name is too short")
      .max(100, "Name is too long")
      .optionallyRequired(required, "Name is required");
  });
}

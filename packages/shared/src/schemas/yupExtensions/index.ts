import { addAuthYupExtensions } from "./authYupExtensions";
import { addGenericYupExtensions } from "./genericYupExtensions";
import { addListingYupExtensions } from "./listingYupExtensions";

export function addYupExtensions() {
  addGenericYupExtensions();
  addAuthYupExtensions();
  addListingYupExtensions();
}

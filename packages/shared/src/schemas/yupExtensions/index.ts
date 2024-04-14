import { addAuthYupExtensions } from "./authYupExtensions";
import { addGenericYupExtensions } from "./genericYupExtensions";

export function addYupExtensions() {
  addGenericYupExtensions();
  addAuthYupExtensions();
}

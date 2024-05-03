import { RequestVendorEmailUpdate } from "@project-utk/shared/src/api/routes/vendor/RequestVendorEmailUpdate";
import { Controller } from "../../utils";
import { AuthVendorLocals, VendorJWTLocals } from "../../middleware";

const controller = new Controller<
  RequestVendorEmailUpdate.ReqBody,
  RequestVendorEmailUpdate.ResBody,
  VendorJWTLocals & AuthVendorLocals,
  {},
  typeof RequestVendorEmailUpdate.Errors
>(RequestVendorEmailUpdate.Errors);

export const RequestVendorEmailUpdateController = controller.handler(
  async (req, res, errors) => {},
);

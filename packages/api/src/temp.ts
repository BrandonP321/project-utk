import { LoginVendor } from "@project-utk/shared/src/api/routes/vendor/LoginVendor";
import { Controller } from "./Controller";

const controller = new Controller<
  LoginVendor.ReqBody,
  LoginVendor.ResBody,
  {},
  typeof LoginVendor.Errors
>(LoginVendor.Errors);

export const tempController = controller.handler(async (req, res, errors) => {
  console.log(req.body.email);

  // Error handling example
  // return errors.InternalServerError();

  return res.json({}).end();
});

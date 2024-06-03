import nodemailer from "nodemailer";
import { EnvVars } from "./EnvVars";

export class NodeMailerUtils {
  static getEmail = () => EnvVars.EMAIL_VERIFICATION_EMAIL;
  static getPassword = () => EnvVars.EMAIL_VERIFICATION_PASSWORD;

  static transporter = () =>
    nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: NodeMailerUtils.getEmail(),
        pass: NodeMailerUtils.getPassword(),
      },
    });
}

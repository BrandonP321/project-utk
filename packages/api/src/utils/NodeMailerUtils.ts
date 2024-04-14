import nodemailer from "nodemailer";

export class NodeMailerUtils {
  static email = process.env.EMAIL_VERIFICATION_EMAIL!;
  static password = process.env.EMAIL_VERIFICATION_PASSWORD!;

  static transporter = () =>
    nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: NodeMailerUtils.email,
        pass: NodeMailerUtils.password,
      },
    });
}

import { APIStage, RDS_DB_STAGE } from "@project-utk/shared/src/@types/stage";
import { SecretsManagerUtils } from "../clients/aws/secretsManager";

const SecretEnvVarsList = [
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
  "EMAIL_VERIFICATION_SECRET",
  "EMAIL_VERIFICATION_EMAIL",
  "EMAIL_VERIFICATION_PASSWORD",
  "EMAIL_UPDATE_SECRET",
] as const;

type SecretEnvVarKey = (typeof SecretEnvVarsList)[number];

/**
 * This class loads all secret environment variables
 * from AWS Secrets Manager and makes them available.
 */
class EnvVarsInternal implements Record<SecretEnvVarKey, string> {
  readonly ACCESS_TOKEN_SECRET!: string;
  readonly REFRESH_TOKEN_SECRET!: string;

  readonly EMAIL_VERIFICATION_SECRET!: string;
  readonly EMAIL_VERIFICATION_EMAIL!: string;
  readonly EMAIL_VERIFICATION_PASSWORD!: string;

  readonly EMAIL_UPDATE_SECRET!: string;

  readonly STAGE: APIStage = process.env.STAGE as APIStage;
  readonly RDS_DB_STAGE = process.env.RDS_DB_STAGE as RDS_DB_STAGE;
  private readonly ENV_VARS_SECRET_ID = process.env.ENV_VARS_SECRET_ID!;

  loadEnvVars(onEnvVarsLoaded: () => void) {
    console.log("Loading secrets...");

    SecretsManagerUtils.getParsedSecretValue<Record<SecretEnvVarKey, string>>(
      this.ENV_VARS_SECRET_ID,
    ).then((secret) => {
      console.log("Secrets loaded");

      SecretEnvVarsList.forEach((key) => {
        const value = secret[key];

        if (!value) {
          throw new Error(`No value found for environment variable:  ${key}`);
        }

        Object.assign(this, { [key]: value });
      });

      onEnvVarsLoaded();
    });
  }
}

export const EnvVars = new EnvVarsInternal();

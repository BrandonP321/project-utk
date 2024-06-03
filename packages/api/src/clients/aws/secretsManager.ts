import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

export const secretsManagerClient = new SecretsManagerClient({});

export class SecretsManagerUtils {
  static async getSecretValue(secretId: string) {
    const command = new GetSecretValueCommand({ SecretId: secretId });
    return secretsManagerClient.send(command);
  }

  static async getParsedSecretValue<T>(secretId: string) {
    const { SecretString } = await this.getSecretValue(secretId);

    if (!SecretString) throw new Error("SecretString is empty");

    return JSON.parse(SecretString) as T;
  }

  static async getDBCredentials() {
    type DBSecret = {
      username: string;
      password: string;
    };

    return await SecretsManagerUtils.getParsedSecretValue<DBSecret>(
      process.env.RDS_DB_SECRET_ID!,
    );
  }
}

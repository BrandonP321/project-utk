import { Stage } from "../@types/stage";

export class EnvUtils {
  private static _webStageEnvVar = "REACT_APP_STAGE";
  private static _apiStageEnvVar = "STAGE";

  static stage = (process.env[EnvUtils._webStageEnvVar] ||
    process.env[EnvUtils._apiStageEnvVar]) as Stage;

  static isLocal = EnvUtils.stage === Stage.Local;
  static isTest = EnvUtils.stage === Stage.Test;

  static setStageToTest() {
    process.env.STAGE = Stage.Test;
  }
}

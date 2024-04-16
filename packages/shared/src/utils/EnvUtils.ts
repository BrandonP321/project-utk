import { Stage } from "../@types/stage";

export class EnvUtils {
  static stage = process.env.STAGE as Stage;

  static isLocal = EnvUtils.stage === Stage.Local;
  static isTest = EnvUtils.stage === Stage.Test;

  static setStageToTest() {
    process.env.STAGE = Stage.Test;
  }
}

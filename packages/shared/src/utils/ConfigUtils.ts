import { Stage } from "../@types/stage";
import { EnvUtils } from "./EnvUtils";

type AllowedConfigValueTypes = string | number | boolean;
type ConfigValueOverrides<V extends AllowedConfigValueTypes> = {
  [K in Stage]?: V;
};

export class ConfigUtils {
  static getConfigValue<V extends AllowedConfigValueTypes>(
    defaultValue: V,
    overrides?: ConfigValueOverrides<V | string>
  ) {
    const stage = EnvUtils.stage;
    const overrideValueRaw = overrides?.[stage];
    const hasOverrideValue = overrideValueRaw !== undefined;
    const overrideNeedsParsing =
      typeof defaultValue !== "string" && typeof overrideValueRaw === "string";

    let finalValue = defaultValue;

    if (hasOverrideValue && overrideNeedsParsing) {
      try {
        finalValue = JSON.parse(overrideValueRaw);
      } catch (error) {
        throw new Error(
          `Failed to parse config value for stage "${stage}": ${overrideValueRaw}`
        );
      }

      if (typeof finalValue !== typeof defaultValue) {
        throw new Error(
          `Config value for stage "${stage}" must be of type ${typeof defaultValue}`
        );
      }
    } else if (hasOverrideValue) {
      finalValue = overrideValueRaw as V;
    }

    return finalValue;
  }
}

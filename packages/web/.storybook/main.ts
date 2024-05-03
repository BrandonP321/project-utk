import type { StorybookConfig } from "@storybook/react-webpack5";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

import { join, dirname } from "path";
import { Configuration, RuleSetRule } from "webpack";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/preset-create-react-app"),
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-interactions"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["..\\public"],

  webpackFinal: async (config: Configuration) => {
    // Using tsconfig paths plugin to resolve paths as per tsconfig
    config.resolve!.plugins = config.resolve?.plugins || [];
    config.resolve!.plugins.push(
      new TsconfigPathsPlugin({
        extensions: config.resolve!.extensions,
      }),
    );

    // Ensure TypeScript and JavaScript files are processed by babel-loader with appropriate presets
    const absolutePath = join(__dirname, "../../shared");
    const rules = config.module!.rules as RuleSetRule[];

    // Find or create the rule for processing TypeScript and JavaScript files
    let tsJsRule = rules.find(
      (rule) => rule.test && rule.test.toString().includes("(js|jsx|ts|tsx)$"),
    );

    if (!tsJsRule) {
      tsJsRule = {
        test: /\.(ts|tsx|js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                require.resolve("@babel/preset-env"),
                require.resolve("@babel/preset-react"),
                require.resolve("@babel/preset-typescript"),
              ],
            },
          },
        ],
        include: [],
      };
      rules.push(tsJsRule);
    }

    // Ensure the loader includes TypeScript files and the shared directory
    tsJsRule.include = Array.isArray(tsJsRule.include)
      ? tsJsRule.include
      : [tsJsRule.include || ""];
    if (!tsJsRule.include.includes(absolutePath)) {
      tsJsRule.include.push(absolutePath);
    }

    return config;
  },
};
export default config;

const CracoAlias = require("craco-alias");
const path = require("path");
const fs = require("fs");
const { getLoader, loaderByName } = require("@craco/craco");

const scssPartialsDir = "./src/styles";

const scssPartials = fs
  .readdirSync(scssPartialsDir)
  .filter((file) => file.startsWith("_") && file.endsWith(".scss"))
  .map((file) => `@import "${path.join(scssPartialsDir, file)}";`)
  .join("\n");

const absolutePath = path.join(__dirname, "../shared");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./src",
        tsConfigPath: "./tsconfig.json",
      },
    },
  ],
  webpack: {
    configure: (config, { env, paths }) => {
      const { isFound, match } = getLoader(
        config,
        loaderByName("babel-loader"),
      );
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];
        // match.loader.include = include.concat(absolutePath, schonComponents);
        match.loader.include = include.concat(absolutePath);
      }

      const sassLoader = getLoader(config, loaderByName("sass-loader"));
      if (sassLoader && sassLoader.loader) {
        sassLoader.loader.options.additionalData = scssPartials;
      }

      return {
        ...config,
      };
    },
  },
};

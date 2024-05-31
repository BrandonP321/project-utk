import { build } from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";
import tsconfigPaths from "@esbuild-plugins/tsconfig-paths";
import path from "path";

build({
  entryPoints: ["src/server.ts"],
  outfile: "dist/server.js",
  bundle: true,
  minify: true,
  platform: "node",
  target: "node20",
  sourcemap: true,
  external: [],
  plugins: [
    nodeExternalsPlugin({ allowList: ["@project-utk/shared"] }),
    tsconfigPaths({ tsconfig: "tsconfig.json" }),
  ],
  alias: {
    "@project-utk/shared/*": path.resolve(__dirname, "../shared/*"),
  },
}).catch(() => process.exit(1));

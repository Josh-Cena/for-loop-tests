import * as esbuild from "esbuild";

esbuild.build({
  entryPoints: ["baseline/*.js"],
  bundle: false,
  target: "es5",
  outdir: "output-esbuild",
});

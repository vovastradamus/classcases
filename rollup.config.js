import json from "@rollup/plugin-json";

export default {
  input: "src/index.js",
  output: {
    dir: "build",
    format: "es",
  },
  plugins: [json()],
};

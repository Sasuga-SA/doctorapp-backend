import js from "@eslint/js";
import globals from "globals";
import prettierPlugin from "eslint-plugin-prettier";

import jsoncPlugin from "eslint-plugin-jsonc";
import jsoncParser from "jsonc-eslint-parser";

import { defineFlatConfig } from "eslint-define-config";

export default defineFlatConfig([
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"],
    languageOptions: {
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
      globals: { ...globals.node, ...globals.browser },
    },
    plugins: { js, prettier: prettierPlugin },
    rules: {
      ...js.configs.recommended.rules,
      "prettier/prettier": "error",
    },
  },

  {
    files: ["**/*.json", "**/*.jsonc", "**/*.json5"],
    languageOptions: { parser: jsoncParser },
    plugins: { jsonc: jsoncPlugin },
    rules: { ...jsoncPlugin.configs["recommended-with-jsonc"].rules },
  },

  {
    ignores: [
      "node_modules",
      "dist",
      "build",
      "coverage",
      "**/*.min.*",
      "*.config.js",
    ],
    linterOptions: { reportUnusedDisableDirectives: true },
  },
]);

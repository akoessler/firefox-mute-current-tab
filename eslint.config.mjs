import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [...compat.extends("eslint:recommended"), {
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
      ...globals.webextensions,
      globalThis: false,
    },

    ecmaVersion: "latest",
    sourceType: "module",
  },

  rules: {
    "no-console": 0,
    "no-unused-vars": ["warn", {
      vars: "all",
      args: "after-used",
      "argsIgnorePattern": "^_"
    }],
    indent: ["error", 2, { SwitchCase: 1 }],
    "linebreak-style": ["error", "unix"],
    semi: ["error", "always"],
    curly: "warn",
    "dot-location": ["error", "property"],
    eqeqeq: "warn",
    "no-else-return": "warn",
    "no-eval": "error",
    "no-octal": "error",
    "no-with": "error",
    radix: "error",
    "brace-style": ["warn", "1tbs"],
    camelcase: "error",
    "no-array-constructor": "error",
    "arrow-spacing": "error",
    "no-var": "error",
    "no-undef": ["warn"],
    "no-proto": ["error"],
    "prefer-arrow-callback": ["warn"],
    "prefer-spread": ["warn"],
  },
}];

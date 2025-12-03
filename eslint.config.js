import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // 사용하지 않는 변수 경고 끄기
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",

      // React Refresh 경고 완화
      "react-refresh/only-export-components": "warn",

      // any 타입 허용
      "@typescript-eslint/no-explicit-any": "off",

      // console.log 허용
      "no-console": "off",
    },
  },
]);

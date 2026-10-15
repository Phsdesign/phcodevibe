import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// eslint-config-next 16 já exporta configs flat nativas; o FlatCompat antigo
// quebrava o `npm run lint` com "Converting circular structure to JSON".
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "tmp_skills/**",
    ".agent/**",
    ".agents/**",
    ".gemini/**",
    "S/**",
  ]),
]);

export default eslintConfig;

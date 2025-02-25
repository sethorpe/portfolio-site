import { FlatCompat } from "@eslint/eslintrc";
import babelParser from "@babel/eslint-parser"; // ✅ Correctly import Babel parser

const compat = new FlatCompat();

// ✅ Assign the config to a variable before exporting
const eslintConfig = [
  ...compat.extends("next/core-web-vitals"), // ✅ Next.js' recommended ESLint config
  {
    ignores: [".next/", "node_modules/", "public/"], // ✅ Ensure ESLint ignores build files
    languageOptions: {
      parser: babelParser, // ✅ Use imported Babel parser (Not a string)
      parserOptions: {
        requireConfigFile: false, // ✅ Prevents ESLint from looking for Babel config files
        babelOptions: {
          presets: ["next/babel"], // ✅ Ensures Next.js settings are respected
        },
      },
    },
  },
];

export default eslintConfig; // ✅ Now correctly assigned before exporting

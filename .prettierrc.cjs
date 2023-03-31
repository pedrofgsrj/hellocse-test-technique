module.exports = {
  plugins: [require("prettier-plugin-tailwindcss")],
  tailwindConfig: "./tailwind.config.js",
  trailingComma: "none",
  tabWidth: 2,
  printWidth: 120,
  semi: true,
  singleQuote: false,
  arrowParens: "always",
  bracketSpacing: true,
  endOfLine: "auto",
  overrides: [
    {
      files: ".prettierrc",
      options: { parser: "json" }
    }
  ]
};

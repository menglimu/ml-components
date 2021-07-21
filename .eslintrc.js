module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {},
  extends: ["./node_modules/@ml/lint/.eslintrc.js"],
  // overrides: [
  //   {
  //     files: ['*.ts', '*.tsx'],
  //     rules: {
  //       // The core 'no-unused-vars' rules (in the eslint:recommeded ruleset)
  //       // does not work with type definitions
  //       // 'no-unused-vars': 0,
  //       'no-undef': 0
  //     }
  //   }
  // ]
};

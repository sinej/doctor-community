module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier", // eslint-config-prettier: eslint에서 prettier와 겹치는 포매팅룰 삭제
    ],
    plugins: ["@typescript-eslint"],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "prefer-const": "off", // is never reassigned. Use 'const' instead 문구 제거
        "@typescript-eslint/no-explicit-any": "off", // Unexpected any. Specify a different type 문구 제거
        "@typescript-eslint/explicit-module-boundary-types": "off", // React, { ReactElement } from "react" 설정 안함
        "@typescript-eslint/no-unused-vars": "off", // 사용하지 않는 프로퍼티 경고 문구 제거
    },
    parserOptions: {
        parser: "@typescript-eslint/parser", // TS를 ESLint 인식할 수 있는 형태 EStree로 변환
    },
};
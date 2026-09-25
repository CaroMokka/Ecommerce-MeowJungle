import { pathsToModuleNameMapper } from "ts-jest";
import tsconfig from "./tsconfig.json";

interface TsConfig {
  compilerOptions: {
    paths: Record<string, string[]>;
  };
}

const typedTsconfig = tsconfig as TsConfig;

export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(typedTsconfig.compilerOptions?.paths || {}, {
      prefix: '<rootDir>/',
    }),
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coverageDirectory: "coverage",
  coverageReporters: ["text-summary", "json-summary", "lcov"],
  coverageThreshold: {
    global: {
      statements: 35,
      branches: 40,
      functions: 35,
      lines: 35,
    },
  },
};

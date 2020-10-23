/**
 * Basic karma configuration shared between headless and browserstack
 * environments
 */

import { config as dotenv } from "dotenv";
dotenv();

export const frameworks = ["mocha", "karma-typescript"];

export const preprocessors = {
  "**/*.ts": ["karma-typescript"],
};

export const karmaTypescriptConfig = {
  compilerOptions: {
    target: "ES3",
  },
};

export const files = [{ pattern: "test/null-test.ts" }];

export const reporters = ["dots", "karma-typescript"];

export const singleRun = true;

export const basePath = "../";

export const concurrency = 1;

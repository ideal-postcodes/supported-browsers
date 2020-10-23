import "core-js/stable";
import "regenerator-runtime/runtime";
import {
  legacyMobile,
  legacyDesktop,
  config as sauceConfig,
} from  "../lib";
import * as defaults from "./config";

const customLaunchers = { ...legacyMobile, ...legacyDesktop };

module.exports = (config: any): void =>
  config.set({
    ...sauceConfig({ testName: "Supported Browsers", defaults }),
    browsers: Object.keys(customLaunchers),
    customLaunchers,
  });

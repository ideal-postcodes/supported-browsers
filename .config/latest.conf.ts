import "core-js/stable";
import "regenerator-runtime/runtime";
import {
  latestMobile,
  latestDesktop,
  config as sauceConfig,
} from "../lib";
import * as defaults from "./config";

const customLaunchers = { ...latestDesktop, ...latestMobile };

console.log(customLaunchers);

const browserDisconnectTimeout = 10000;

const browserDisconnectTolerance = 1;

const browserNoActivityTimeout = 4*60*10000;

const captureTimeout = 4*60*10000;

module.exports = (config: any): void =>
  config.set({
    ...sauceConfig({ testName: "Supported Browsers", defaults }),
    browsers: Object.keys(customLaunchers),
    customLaunchers,
    browserDisconnectTimeout,
    browserDisconnectTolerance,
    browserNoActivityTimeout,
    captureTimeout
});

export type SupportMatrix = Record<string, Browser>;

export interface Browser {
  // Browser (e.g. IE, Chrome)
  browserName: string;
  // Browser version number and? bit version (e.g. 74x64)
  version?: string;
  // Operating system and version (e.g. Windows 10)
  platform?: string;
  // Mobile device (e.g. iPhone 4s)
  deviceName?: string;
  // Mobile platform version (e.g. 9.0)
  platformVersion?: string;
  // Mobile platform name (e.g. Android)
  platformName?: string;
  // Mobile device orientation (e.g landscape)
  deviceOrientation?: string;
  // Our addition
  desktop?: boolean;
  mobile?: boolean;
  legacy?: boolean;
  latest?: boolean;
}

/**
 * Export supported browsers
 */
export const browsers: SupportMatrix = {
  // Latest Desktop
  chrome: {
    browserName: "Chrome",
    version: "77x64",
    platform: "Windows 10",
    desktop: true,
    latest: true,
  },
  firefox: {
    browserName: "Firefox",
    version: "69x64",
    platform: "Windows 10",
    desktop: true,
    latest: true,
  },
  safari: {
    browserName: "Safari",
    version: "12",
    platform: "Mac OSX 10.14",
    desktop: true,
    latest: true,
  },
  edge: {
    browserName: "MicrosoftEdge",
    version: "18",
    platform: "Windows 10",
    desktop: true,
    latest: true,
  },

  // Legacy Desktop
  ie: {
    browserName: "Internet Explorer",
    version: "11",
    platform: "Windows 10",
    desktop: true,
    legacy: true,
  },
  "chrome-legacy": {
    browserName: "Chrome",
    version: "43",
    platform: "Windows 10",
    desktop: true,
    legacy: true,
  },
  "firefox-legacy": {
    browserName: "Firefox",
    version: "48",
    platform: "Windows 10",
    desktop: true,
    legacy: true,
  },

  // Latest Mobile
  "android-latest": {
    browserName: "Chrome",
    deviceName: "Pixel 3",
    platformVersion: "9.0",
    platformName: "Android",
    deviceOrientation: "portrait",
    mobile: true,
    legacy: true,
  },
  "ios-latest": {
    browserName: "Safari",
    deviceName: "iPad 6th Generation Simulator",
    platformVersion: "12.0",
    platformName: "iOS",
    deviceOrientation: "landscape",
    mobile: true,
    legacy: true,
  },

  // Legacy Mobile
  "android-legacy": {
    browserName: "Chrome",
    deviceName: "Nexus 6",
    platformVersion: "5.0",
    platformName: "Android",
    deviceOrientation: "portrait",
    mobile: true,
    legacy: true,
  },
  "ios-legacy": {
    browserName: "Safari",
    deviceName: "iPhone 6s Plus Simulator",
    platformVersion: "9.3",
    platformName: "iOS",
    deviceOrientation: "portrait",
    mobile: true,
    legacy: true,
  },
};

export type CbtLauncher = DesktopLauncher | MobileLauncher;

interface BuildInfo {
  name: string;
  build: string;
}

interface DesktopLauncher extends BuildInfo {
  browserName: string;
  base: "CrossBrowserTesting";
  screenResolution: string;
  version: string;
  platform: string;
}

interface MobileLauncher extends BuildInfo {
  browserName: string;
  base: "CrossBrowserTesting";
  deviceName: string;
  platformVersion: string;
  platformName: string;
  deviceOrientation: string;
}

const base = "CrossBrowserTesting";
const screenResolution = "1366x768";

interface ToCbtLaunchers {
  (matrix: SupportMatrix, buildInfo: BuildInfo): Record<string, CbtLauncher>;
}

/**
 * Returns a map of custom CBT launchers compatible with karma-cbt-launcher
 * given a browser support matrix and build information
 */
export const toCbtLaunchers: ToCbtLaunchers = (matrix, buildInfo) => {
  const launchers: Record<string, CbtLauncher> = {};
  Object.entries(matrix).forEach(([key, browser]) => {
    if (browser.mobile) {
      launchers[key] = {
        base,
        ...buildInfo,
        browserName: browser.browserName,
        deviceName: browser.deviceName || "",
        platformVersion: browser.platformVersion || "",
        platformName: browser.platformName || "",
        deviceOrientation: browser.deviceOrientation || "",
      };
    } else {
      launchers[key] = {
        base,
        screenResolution,
        ...buildInfo,
        browserName: browser.browserName,
        version: browser.version || "",
        platform: browser.platform || "",
      };
    }
  });
  return launchers;
};

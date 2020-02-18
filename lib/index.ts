export type SupportMatrix = Record<string, Browser>;

export type Browser = MobileBrowser | DesktopBrowser;

interface DesktopBrowser {
  base: "SauceLabs";
  // Browser (e.g. IE, Chrome)
  browserName: string;
  // Browser version number and? bit version (e.g. 74x64)
  version: string;
  // Operating system and version (e.g. Windows 10)
  platform?: string;
}

interface MobileBrowser {
  base: "SauceLabs";
  // Browser (e.g. IE, Chrome)
  browserName: string;
  // Browser version number and? bit version (e.g. 74x64)
  version: string;
  // Operating system and version (e.g. Windows 10)
  platform?: string;
  // Mobile device (e.g. iPhone 4s)
  deviceName: string;
  // Portrait or landscape
  deviceOrientation: string;
}

const base = "SauceLabs";

export const latestDesktop: SupportMatrix = {
  chrome: {
    base,
    browserName: "chrome",
    version: "latest",
  },
  firefox: {
    base,
    browserName: "firefox",
    version: "latest",
  },
  safari: {
    base,
    browserName: "safari",
    version: "latest",
  },
  edge: {
    base,
    browserName: "microsoftedge",
    version: "latest",
  },
};

export const legacyDesktop: SupportMatrix = {
  ie: {
    base,
    browserName: "internet explorer",
    version: "11",
    platform: "Windows 8.1",
  },
  "chrome-legacy": {
    base,
    browserName: "chrome",
    version: "43.0",
    platform: "Windows 10",
  },
  "firefox-legacy": {
    base,
    browserName: "firefox",
    version: "48.0",
    platform: "Windows 10",
  },
};

export const latestMobile: SupportMatrix = {
  "ios-latest": {
    base,
    deviceOrientation: "portrait",
    deviceName: "iPhone X Simulator",
    browserName: "Safari",
    version: "13.0",
    platform: "iOS",
  },
  "android-latest": {
    base,
    deviceName: "Android GoogleAPI Emulator",
    deviceOrientation: "portrait",
    browserName: "Chrome",
    version: "5.1",
    platform: "Android",
  },
};

export const legacyMobile: SupportMatrix = {
  "android-legacy": {
    base,
    browserName: "Browser",
    deviceName: "Android GoogleAPI Emulator",
    deviceOrientation: "portrait",
    version: "5.1",
    platform: "Android",
  },
  "ios-legacy": {
    base,
    browserName: "Safari",
    deviceName: "iPhone SE Simulator",
    deviceOrientation: "portrait",
    version: "10.3",
    platform: "iOS",
  },
};

/**
 * Export supported browsers
 */
export const browsers: SupportMatrix = {
  ...latestDesktop,
  ...legacyDesktop,
  ...latestMobile,
  ...legacyMobile,
};

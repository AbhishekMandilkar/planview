import type { ElectrobunConfig } from "electrobun";

const webBuildDir = "../web/dist";

export default {
  app: {
    name: "Planbase",
    identifier: "dev.planbase.app",
    version: "0.0.1",
  },
  runtime: {
    exitOnLastWindowClosed: true,
  },
  build: {
    bun: {
      entrypoint: "src/bun/index.ts",
    },
    copy: {
      [webBuildDir]: "views/mainview",
    },
    watchIgnore: [`${webBuildDir}/**`],
    mac: {
      bundleCEF: true,
      defaultRenderer: "cef",
      icons: "icon.iconset",
    },
    linux: {
      bundleCEF: true,
      defaultRenderer: "cef",
      icon: "assets/icon.png",
    },
    win: {
      bundleCEF: true,
      defaultRenderer: "cef",
      icon: "assets/icon.png",
    },
  },
} satisfies ElectrobunConfig;

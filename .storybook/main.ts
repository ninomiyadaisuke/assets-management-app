const path = require("path");

import type { StorybookConfig } from "@storybook/nextjs";
import type { Configuration } from "webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-controls",
    "@storybook/addon-actions",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  webpackFinal: async (config, { configType }) => {
    const webpackConfig = config as Configuration;
    if (!webpackConfig.resolve) {
      webpackConfig.resolve = {};
    }
    if (!webpackConfig.resolve.alias) {
      webpackConfig.resolve.alias = {};
    }
    webpackConfig.resolve.alias["@"] = path.resolve(__dirname, "../src");
    return webpackConfig;
  },
};

export default config;

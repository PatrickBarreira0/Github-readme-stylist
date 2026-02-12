import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["@github-readme-stylist/core"],

  outputFileTracingRoot: path.join(__dirname, "../../"),

  outputFileTracingIncludes: {
    "/**/*": ["node_modules/figlet/fonts/*.flf"],
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.flf$/,
      type: 'asset/source',
    });
    // ... keep existing webpack config ...
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.jsx': ['.tsx', '.jsx'],
    };
    config.resolve.extensions = [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      ...(config.resolve.extensions || []),
    ];
    return config;
  },
};

export default nextConfig;
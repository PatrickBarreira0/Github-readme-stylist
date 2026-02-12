import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@github-readme-stylist/core"],
  webpack: (config) => {
    config.module.rules.push({
      test: /.flf$/,
      type: 'asset/source',
    });

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
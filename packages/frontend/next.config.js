/** @type {import('next').NextConfig} */
const prefixPath = process.env.PREFIX_PATH;

const nextConfig = {
  output: "export",
  trailingSlash: true,
  assetPrefix: prefixPath,
  basePath: prefixPath,
};

module.exports = nextConfig;

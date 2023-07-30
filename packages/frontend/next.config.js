/** @type {import('next').NextConfig} */
// GithubPagesに公開する時、絶対パス指定だと静的ファイルが読み込めないのでレポジトリ名を設定
// TODO: ローカルでビルドしても/boyakiのprefix付くから直しといて
const prefixPath = process.env.NODE_ENV === "production" ? "/boyaki" : "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  assetPrefix: prefixPath,
  basePath: prefixPath,
};

module.exports = nextConfig;

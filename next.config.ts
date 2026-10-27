import path from "path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Serverə yalnız .next/standalone (server.js + lazım olan paketlər) göndərilir
  output: "standalone",
  // Kök qovluq səhv təyin olunmasın (server.js birbaşa .next/standalone/ içində olsun)
  outputFileTracingRoot: path.join(__dirname),

  // Source maps konfiqurasiyası
  productionBrowserSourceMaps: false,
};

export default withNextIntl(nextConfig);

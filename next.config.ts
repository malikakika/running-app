import nextPwa from "next-pwa";
import { join } from "path";

const withPwa = nextPwa({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", 
});

const nextConfig = withPwa({
  compiler: {
    styledComponents: true,
  },
  output: "standalone", 
});

export default nextConfig;

// next.config.mjs
import nextPwa from 'next-pwa';

const withPwa = nextPwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const nextConfig = withPwa({
  compiler: {
    styledComponents: true,
  },
});

export default nextConfig;

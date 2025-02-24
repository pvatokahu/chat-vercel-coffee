// import withBundleAnalyzer from '@next/bundle-analyzer';
import './src/libs/Env';

// const bundleAnalyzer = withBundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
// });

/** @type {import('next').NextConfig} */
export default
  // bundleAnalyzer(
    {
      eslint: {
        dirs: ['.'],
        ignoreDuringBuilds: true
      },
      poweredByHeader: false,
      reactStrictMode: true,
      serverExternalPackages : ['require-in-the-middle', 'import-in-the-middle', 'openai', 'llamaindex', 'langchain', '@langchain/core','@langchain/openai', '@langchain'],
    }
  // );


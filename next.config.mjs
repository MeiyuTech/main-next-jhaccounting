import createNextIntlPlugin from "next-intl/plugin";
import createMDX from '@next/mdx'

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
});

export default withNextIntl(withMDX(nextConfig));
